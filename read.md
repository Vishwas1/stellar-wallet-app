## Quick start with Stellar

There are multiple ways, we can get started with Stellar blockchain. The easiest way is to download the docker image and connect to [stellar test network](https://testnet.steexp.com/).

**This is what I am going to do in this tutorial:**

- Setup  docker on Ubuntu machine.
- Setup the [stellar docker image](https://hub.docker.com/r/stellar/quickstart/) and run the image.
- Create a Wallet app to explore [Stellar-SDK](https://www.npmjs.com/package/stellar-sdk)
    - Setup stellar server instance using the blockchain url that we will get after running docker image
    - Create 2 new accounts
    - Get some money from [Stellar faucet](https://github.com/stellar/go/tree/master/services/friendbot) API called, FriendBot.
    - Send money from one account to another
    - Get list of transactions happened from an account

### Install Docker on Ubuntu machine

Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) doc to setup docker on Ubuntu machine if you haven't.

### Download and run Stellar image on docker

**Download the image**

`docker pull stellar/quickstart`

**Run the image**

`docker run --rm -it -p "8000:8000" --name stellar stellar/quickstart --testnet`


### Create a Wallet app to explore stellar

Checkout [app/index.js]() and [app/apis.md]() for details.

