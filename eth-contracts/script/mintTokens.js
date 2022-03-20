
var Web3 = require('web3');

const Proof1Json = require('../../zokrates/code/square/proof.json');
const SquareVerifier = require('../build/contracts/SolnSquareVerifier.json');
const abi = SquareVerifier.abi;

console.log(Web3.givenProvider);


const App = {
    web3: null,
    account: null,
    meta: null,
  
    start: async function() {
      const { web3 } = this;
  
      try {
        // get contract instance
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = starNotaryArtifact.networks[networkId];
        this.meta = new web3.eth.Contract(
          starNotaryArtifact.abi,
          deployedNetwork.address,
        );
  
        // get accounts
        const accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
      } catch (error) {
        console.error("Could not connect to contract or chain.");
      }
    },
  
  
  };



//need to create a contract instance




//async function  getAccounts() {accounts = await web3.eth.getAccounts();}


