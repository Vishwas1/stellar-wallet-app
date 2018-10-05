const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise')
const Stellar = require('stellar-sdk')


/* Initialize app and configure bodyParser */
const port = process.env.PORT || 4000
const app = express()

//const STELLAR_SERVER = 'https://horizon-testnet.stellar.org'
const STELLAR_SERVER = 'http://172.18.0.2:8000'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

// asking stellar sdk to use test net
const server = new Stellar.Server(STELLAR_SERVER, {allowHttp: true})
Stellar.Network.useTestNetwork()

let accounts = []

const creatingAccount = async (req,res) =>{
    try{
        console.log(`creatingAccount method got called`)
        let pair = Stellar.Keypair.random()
        let account = {
            pk : pair.publicKey(),
            sk : pair.secret()
        }
        accounts.push(account)
        res.send(account);
    }catch(err){
        res.send({"Msg" : "ERROR : " + err})
    }
    
}

const getFromFaucet = async (req,res) =>{
    try{
        console.log(`getFromFaucet method got called pk = ${req.body.pk}`)
        const pk = req.body.pk
        if(pk){
            // asking testnet to create a wallet aaccount using the public key
            console.log('Waiting for faucet to send Lumens ....')
            await rp.get({
                uri: `https://horizon-testnet.stellar.org/friendbot`,
                qs: { addr: pk },
                json: true
            })
            res.redirect(307, '/balance');
        }else{
            res.send({"Msg" : "ERROR : please provide public key!"})
        }
        
    }catch(err){
        res.send({"Msg" : "ERROR : " + err})
    }
}

const getAccounts =  async (req,res) =>{
    console.log(`getAccounts method got called`)
    res.send(accounts);
}

const getBalance = async (req, res) =>{

    try{
        console.log(`getBalance method got called pk = ${req.body.pk}`)
        const pk = req.body.pk;
        
        let balance = 0;

        // Load newly created accounts
        account = await server.loadAccount(pk)
        // check the balances
        account.balances.forEach((bal) => {
            balance = balance + bal.balance;
            console.log('Type:', bal.asset_type, ', Balance of A:', bal.balance)
        })
        res.send({"Msg" : balance})
    }catch(err){
        res.send({"Msg" : "ERROR : " + err})
    }    
}
                
const makePayment = async (req,res) => {

    const {from, to, value} =  req.body;

    console.log(`getBalance method got called`)
    console.log(`from = ${from}`)
    console.log(`To = ${to}`)
    console.log(`value = ${value}`)
    //Let get the secret of the spender
    const spender = accounts.find((acc) => {
        if(acc.pk === from) return acc;
    })

    if(spender && spender != null){
        // First, check to make sure that the destination account exists.
        // You could skip this, but if the account does not exist, you will be charged
        // the transaction fee when the transaction fails.
        server.loadAccount(to)
        .catch((err)=>{
            res.send({"Msg" : `Error : receiever ${to} not found!`})
        })
        .then(() =>{
            // lets load spender account
            return server.loadAccount(from);
        })
        .then((spenderAccount) => {
            // Start building the transaction.
            const transaction = new Stellar.TransactionBuilder(spenderAccount)
            .addOperation(Stellar.Operation.payment({
                destination: to,
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special "native" asset represents Lumens.
                asset: Stellar.Asset.native(),
                amount: value
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(Stellar.Memo.text('Test Transaction'))
            .build()

            // get the key pair for signing the transaction
            const pairA =  Stellar.Keypair.fromSecret(spender.sk);
            // Sign the transaction to prove you are actually the person sending it
            transaction.sign(pairA)
            return server.submitTransaction(transaction);
        })
        .then((result)=>{
            console.log(JSON.stringify(result, null, 2))
            res.send({"Msg" : JSON.stringify(result, null, 2)})
        })
        .catch((err)=>{
            res.send({"Msg" : `Error : Somethis went wrong : ${err}`})
        })
        
    }else{
        res.send({"Msg" : `Error : spender  ${to} not found!`})
    }
}

const getHistory = async (req, res) => {
    try{
        console.log(`getHistory method got called pk = ${req.body.pk}`)
        const from = req.body.pk;
        const accountA = await server.loadAccount(from);
        // Retrieve latest transaction
        let historyPage = await server.transactions()
        .forAccount(accountA.accountId())
        .call()
        console.log(`\n\nHistory for public key ${from} with accountID ${accountA.accountId()}:`)
        
        let hasNext = true
        let history = []
        while(hasNext) {
            if(historyPage.records.length === 0) {
                console.log("\nNo more transactions!")
                hasNext = false
            } else {
            // Print tx details and retrieve next historyPage
                console.log("\nSource account: ", historyPage.records[0].source_account)
                let txDetails = Stellar.xdr.TransactionEnvelope.fromXDR(historyPage.records[1].envelope_xdr, 'base64')
                
                txDetails._attributes.tx._attributes.operations.map(
                    operation => 
                    history.push(`Transferred amount: ${operation._attributes.body._value._attributes.amount.low} XLM`)
                )
                historyPage = await historyPage.next()
            }
        }
        res.send({"Msg" : history})
    }catch(err){
        res.send({"Msg" : "ERROR : " + err})
    }
    
}

/* CORS */
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type')
  
    // Pass to next layer of middleware
    next()
})

/* API Routes */
app.get('/newAccount', creatingAccount)
app.get('/accounts', getAccounts)
app.post('/faucet',getFromFaucet)
app.post('/balance', getBalance)
app.post('/payment', makePayment)
app.post('/transactions', getHistory)

/* Serve API */
app.listen(port, () => {
  console.log(`Stellar test app listening on port ${port}!`)
})