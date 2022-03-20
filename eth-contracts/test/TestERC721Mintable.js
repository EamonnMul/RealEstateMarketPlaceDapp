var ERC721MintableComplete = artifacts.require("CustomERC721Token");
const truffleAssertions = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {
    const owner = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2]; 
    const ids = [0,1,2,3,4,5,6,7,8,9,10]
    let contract;
    let token1;

    before(async function () { 
       
        contract = await ERC721MintableComplete.new("TT_ERC721MintableToken", "TT_721M",{from: owner});
       
         
    });

    describe('CORE FUNCTIONALITY', () => {

        it('Able to mint Tokens', async function() {
            try {
                for (let index = 0; index < ids.length; index++) {
                    token1 = await contract.mint(account_two, ids[index], {from: owner}); 
                }
                
            } catch (error) {
                console.log(error);
            }

            let totalSupply = await contract.totalSupply.call({from: accounts[0]});
            assert(totalSupply.toNumber(),ids.length,'Unable to mint all tokens as expected');

        })


    })

   
    describe('match erc721 spec', function () {
       
            
        it('should return total supply', async function () { 
            let totalSupply = await contract.totalSupply.call({from: accounts[0]});
            console.log('TOTAL SUPPLY: ',totalSupply.toNumber());
            let result = totalSupply >= 0;
            assert(result,true,'Invalid supply')
            
        })

        it('should get token balance', async function () { 

            let tokenBalance = await contract.balanceOf.call(account_two,{from: account_two}); 
            let result = tokenBalance.toNumber() >= 0;
            assert(result,true,'Unexpected Token Balance');
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            tokenURI = await contract.getBaseTokenURI.call({from: accounts[0]});
            
        })

        it('should transfer token from one owner to another', async function () { 

            let tokenId = 1;

            try {
                let transfer = await contract.transferFrom(account_three,account_two,tokenId,{from: owner}); 
                truffleAssertions.eventEmitted(transfer,'Transfer');
                
            } catch (error) {
                console.log
            }

           
            let newOwner = await contract.ownerOf(tokenId); 

            assert(newOwner,account_three,'Token transfer has not been successful');

            
        })
    });

    describe('have ownership properties', function () {
        
        it('should fail when minting when address is not contract owner', async function () { 
            let isError = false; 
        try {
           
            receiver = owner; 
            await contract.mint(receiver, 11, {from: account_two});
            
        } catch (error) {
            isError = true;  
        }
        assert(isError,true,'Able to mint token unexpectedly')
            
        })
        it('should return contract owner', async function () { 

            let noError = true;

            try {
                let ownerContract = await contract.viewOwner.call(); 
                assert(ownerContract,owner, 'Owner not as expected')
                
            } catch (error) {
                noError = false;
            }
            
            assert(noError,true,'Unable to retrieve Owner')
            
                
            })

    })
    

});
