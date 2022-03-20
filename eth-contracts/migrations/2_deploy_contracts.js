// migrating the appropriate contracts
//var Verifier = artifacts.require("./Verifier.sol");
//var CustomERC721Token = 
artifacts.require("./CustomERC721Token.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");





module.exports = async (deployer) => {
   //await deployer.deploy(Verifier);
   await deployer.deploy(SolnSquareVerifier,
    //Verifier.address,
    "TT_ERC721MintableToken", "TT_721M");
  // await deployer.deploy(CustomERC721Token, "TT_ERC721MintableToken", "TT_721M");
};