// migrating the appropriate contracts
//var Verifier = artifacts.require("./Verifier.sol");
//var CustomERC721Token = 
artifacts.require("./CustomERC721Token.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const SquareVerifier = require('../build/contracts/SolnSquareVerifier.json');

//below used for rinkeby deployment 
var account_one = '0x8402f907ca2b0828034493dfd0C4ee2a11Ab7590'; 
//var account_one = '0xcf98b2DC3a7F54832Ce020C073201F7533E9347E';



module.exports = async (deployer) => {
   //await deployer.deploy(Verifier);
   await deployer.deploy(SolnSquareVerifier,"TT_ERC721MintableToken", "TT_721M");
   let instance = await SolnSquareVerifier.deployed();
   for (let index = 0; index < 10; index++) {
     
      await instance.mint(account_one,index, {from: account_one});
      
   }
   let balance = await instance.balanceOf(account_one);
   console.log(balance);

};