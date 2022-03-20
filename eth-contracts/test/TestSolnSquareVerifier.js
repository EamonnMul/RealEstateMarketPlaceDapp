// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssertions = require('truffle-assertions');



contract('TestSolnSquareVerifier', accounts => {
    let contract;

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const Proof1Json = require('../../zokrates/code/square/proof.json');
    const Proof2Json = require('../../zokrates/code/square/proof2.json');
    const ProofFalseJson = require('../../zokrates/code/square/proofFalse.json');

    before('setup contract', async () => {
        
        contract = await SolnSquareVerifier.new("TT_ERC721MintableToken", "TT_721M");
        
    });

    describe('have a functional ownership\'s workflow', function () {

        it('should be able to add a solution', async () => {

            const {proof, inputs} = Proof1Json;


            let solution = await contract.addSolution(proof.a, proof.b, proof.c, inputs,{from: account_one});
            truffleAssertions.eventEmitted(solution,'SolutionAdded'); 

            
        });

        it('should mint token for it', async () => {
            const {proof, inputs} = Proof1Json;
            const verified = await contract.mintVerified(account_two, 1, proof.a, proof.b, proof.c, inputs, {from: account_one});
            truffleAssertions.eventEmitted(verified,'minted'); 
            
        });
        it('Should not be able to add solution for false proof', async () => {
            const {proof, inputs} = ProofFalseJson;
            let proofFalse = false;
            try {
                proofFalse  = await contract.mintVerified(account_two, 2, proof.a, proof.b, proof.c, inputs, {from: account_one});
                
            } catch (error) {
               
            }
            assert(proofFalse,false); 
        });

    });

  
})