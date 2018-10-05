# Stellar Private Network Installation #

Ways to setup up Stellar Network;


## Manually ##

Components we need :
1. Setup `stellar-core`
2. Setup `setllar-horizon`
3. Setup PostgreSQL database

## Docker ##


The stellar-quickstart package configures a local **stellar-core** and **stellar-horizon** instance backed by a local PostgreSQL connecting to the SDF Testnet. Once installed you can easily modify either the stellar-core or stellar-horizon configs to suit your needs or to connect to the SDF Pubnet for example.

```
#sudo apt-get update && sudo apt-get install stellar-quickstart # install packages
#sudo systemctl start stellar-core # start up stellar-core
#stellar-core-cmd info # check/wait until stellar-core is in synch
#sudo systemctl start stellar-horizon # start up stellar-horizon

```


- First we need to install Docker in our machine, if it is not installed. Follow this link for Ubuntu 18.04.
- To install Stellar core and Horizon, use this link and follow simple instructions.
- Pull image : `docker pull stellar/quickstart`
- Running the image : 

### Non-Persistent Mode ###
- For testNet :  `docker run --rm -it -p "8000:8000" --name stellar stellar/quickstart --testnet`
- For MainNet : `docker run --rm -it -p "8000:8000" --name stellar stellar/quickstart --pubnet`
- For StandAlone PvtNet : `docker run --rm -it -p "8000:8000" --name stellar stellar/quickstart  --standalone`

### Persistent Mode ###

```
docker run --rm -it \
    -p "8000:8000" \
    -v "/home/vishwasb/vab/projects/stellar-training/bc:/opt/stellar"  \
    --name stellar \ 
    stellar/quickstart \    
    --standalone


docker run --rm -it \
    -v "/str:/opt/stellar" \
    --name stellar \
    stellar/quickstart 
    --standalone

#Get the container ids
docker ps -a 

#Get the ip address of running container
docker inspect 6396f1acc6d2 | grep "IPAddress"

#Append 8000 port with ip : this is the port at with horizon is running
http://172.18.0.2:8000/

#Note

Port	Service	      Description
---------------------------------------
5432	postgresql	  database access port
8000	horizon	main  http port
11625	stellar-core  peer node port
11626	stellar-core  main http port


```

- `docker exec -it stellar /bin/bash`
- `supervisorctl`
```

# restart horizon
supervisor> restart horizon  

# stop stellar-core
supervisor> stop stellar-core

```

### References ###

- Blog : https://medium.com/wearetheledger/exploring-stellar-lumens-development-tutorial-78b4e1c92733 

- https://github.com/michielmulders/stellar-js-sdk    
- https://dashboard.stellar.org/ 
- https://stellar.github.io/js-stellar-sdk/TransactionBuilder.html
    - https://github.com/pitchayasak/Multiverse-Stellar/tree/f0e1dd764725e10c01b91f28750456f5014c9279/testnet


https://github.com/stellar/packages#sdf---packages 

https://github.com/stellar/js-stellar-sdk 

https://github.com/stellar/stellar-core 

- https://www.stellar.org/laboratory 

https://www.youtube.com/watch?v=X3Gj2nQZCNM&feature=youtu.be



