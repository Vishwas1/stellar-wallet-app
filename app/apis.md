## APIs

```
/* API Routes */
app.get('/newAccount', creatingAccount)
app.get('/accounts', getAccounts)
app.post('/faucet',getFromFaucet)
app.post('/balance', getBalance)
app.post('/payment', makePayment)
app.post('/transactions', getHistory)


```

### New Account

Method : GET
URL : http://localhost:4000/newAccount  
Response : 
{
    "pk": "GBVLTVGDDO3CAEZQQEDBZCTHZKXZUT7LDIGGXD7W5R2YKOQLPFMV3WLK",
    "sk": "SBYHYPWNC5ZVWPH73VHBVWF2D4PDXV4466GLL2WQNZQKHQTJJSQPGZBM"
}

### All Accounts

```
Method : GET
URL : http://localhost:4000/accounts
Response : 
[
    {
        "pk": "GCMIEBN26ACIUJVBGB3XT2ZAGIPZTG3SCV5K2FCBUY2AMYGBOOKOF4P6",
        "sk": "SB6DP7TKZW777PGOC7IATGHQ52SBS4SCSKTSNWA2VTBXJG5YERYXL3ZQ"
    },
    {
        "pk": "GCVVJY5EXBTKIG76PFZCULLIWJGAYBTHGBPQVRWZHJC7FGUJMSYVZ675",
        "sk": "SA5OOHTOTO3RSTRZ2ZZLVXHTP2AASV3P22ZP44CURJMBLTXUGVZRKWTH"
    }
]

```


### Earn money from faucet

```
Method : POST
URL : http://localhost:4000/accounts
Format : JSON
Request : 
{
	"pk" : "GCVVJY5EXBTKIG76PFZCULLIWJGAYBTHGBPQVRWZHJC7FGUJMSYVZ675"
}
Response : 
{
    "Msg": "010000.0000000"
}

```

### Get balance of an account

```
Method : POST
URL : http://localhost:4000/balance
Format : JSON
Request : 
{
	"pk" : "GCVVJY5EXBTKIG76PFZCULLIWJGAYBTHGBPQVRWZHJC7FGUJMSYVZ675"
}
Response : 
{
    "Msg": "010000.0000000"
}

```

### Make payment 

```
Method : POST
URL : http://localhost:4000/payment
Format : JSON
Request : 
{
	"from" : "GCMIEBN26ACIUJVBGB3XT2ZAGIPZTG3SCV5K2FCBUY2AMYGBOOKOF4P6",
	"to" : "GCVVJY5EXBTKIG76PFZCULLIWJGAYBTHGBPQVRWZHJC7FGUJMSYVZ675",
	"value" : "20"
}
Response : 
{
    "Msg": "{\n  \"_links\": {\n    \"transaction\": {\n      \"href\": \"http://172.18.0.2:8000/transactions/f9c2425af28995d8ba0f8751fe8a0c5c77f7388b768cfc28b1206d2a8fce346e\"\n    }\n  },\n  \"hash\": \"f9c2425af28995d8ba0f8751fe8a0c5c77f7388b768cfc28b1206d2a8fce346e\",\n  \"ledger\": 18454,\n  \"envelope_xdr\": \"AAAAAJiCBbrwBIomoTB3eesgMh+Zm3IVeq0UQaY0BmDBc5TiAAAAZAAASA8AAAABAAAAAAAAAAEAAAAQVGVzdCBUcmFuc2FjdGlvbgAAAAEAAAAAAAAAAQAAAACrVOOkuGakG/55ciotaLJMDAZnMF8Kxtk6RfKaiWSxXAAAAAAAAAAAC+vCAAAAAAAAAAABwXOU4gAAAEA6DJsf9db07hMIZ8FhYQ+o5ptErY8OaDwBBw+RopZO2xfP+dwtxKqT/ubPocWvyObAkJCGRFS2EA59rdCKEzQD\",\n  \"result_xdr\": \"AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA=\",\n  \"result_meta_xdr\": \"AAAAAQAAAAIAAAADAABIFgAAAAAAAAAAmIIFuvAEiiahMHd56yAyH5mbchV6rRRBpjQGYMFzlOIAAAAXSHbnnAAASA8AAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAABIFgAAAAAAAAAAmIIFuvAEiiahMHd56yAyH5mbchV6rRRBpjQGYMFzlOIAAAAXSHbnnAAASA8AAAABAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAABAAAAAMAAEgWAAAAAAAAAACYggW68ASKJqEwd3nrIDIfmZtyFXqtFEGmNAZgwXOU4gAAABdIduecAABIDwAAAAEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAEgWAAAAAAAAAACYggW68ASKJqEwd3nrIDIfmZtyFXqtFEGmNAZgwXOU4gAAABc8iyWcAABIDwAAAAEAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAMAAEgSAAAAAAAAAACrVOOkuGakG/55ciotaLJMDAZnMF8Kxtk6RfKaiWSxXAAAABdIdugAAABIEgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAEgWAAAAAAAAAACrVOOkuGakG/55ciotaLJMDAZnMF8Kxtk6RfKaiWSxXAAAABdUYqoAAABIEgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA==\"\n}"
}

```

### Fetch all transactions wrt account

```
Method : POST
URL : http://localhost:4000/transactions
Format : JSON
Request : 
{
	"pk" : "GDOE63FSR32DEWIYZ7FESKY2KG2EM5ZDQXZX63FXSWHGNMRGG37NJG2W"
}
Response : 
{
    "Msg": [
        "Transferred amount: 200000000 XLM"
    ]
}

```


## References
- [create accounts](https://www.stellar.org/developers/guides/get-started/create-account.html)
- [key-pair](https://stellar.github.io/js-stellar-sdk/Keypair.html)
- [friendbot-for-faucet](https://github.com/stellar/go/tree/master/services/friendbot)
- [transactions](https://www.stellar.org/developers/guides/get-started/transactions.html)
