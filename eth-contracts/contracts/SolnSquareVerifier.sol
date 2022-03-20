// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './ERC721Mintable.sol';
import "./Verifier.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//interface Verifier{
   // function verifyTx( uint[2] memory  a, uint[2] memory  a_p,  uint[2][2] memory  b, uint[2] memory  b_p, uint[2] memory  c,  uint[2] memory  c_p, uint[2] memory  h, uint[2] memory  k, uint[2] memory  input ) external returns (bool r) ;
   // }


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

 contract SolnSquareVerifier is CustomERC721Token, Verifier{
    //Verifier verifierContract;


// TODO define a solutions struct that can hold an index & an address
 struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool minted; 
    }

// TODO define an array of the above struct
Solution[] private solutionsArray;

// TODO define a mapping to store unique solutions submitted

mapping (bytes32 => Solution) solutions;

 constructor(
     //address verifierAddress, 
     string memory name, 
     string memory symbol) 
        CustomERC721Token(name, symbol) 
    {
     //verifierContract = Verifier(verifierAddress);
    }


//Solution Index
 uint256 solutionNumber = 0;
// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 Index, address indexed Address);


// TODO Create a function to add the solutions to the array and emit the event

function addSolution( uint[2] memory A,  uint[2][2] memory B, uint[2] memory C,  uint[2] memory input) 
        external 
    {
        bytes32 Hash = keccak256(abi.encodePacked(A,  B, C, input));
        require(solutions[Hash].solutionAddress == address(0), "Solution exists already");
        
        bool verified = verifyTx(A,  B,  C, input);
        require(verified, "Solution could not be verified");

        solutions[Hash] = Solution(solutionNumber, msg.sender, false);
        //solutions.push(solution);
        emit SolutionAdded(solutionNumber, msg.sender);
        solutionNumber++;
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

event minted(uint256 indexed tokenId, address owner);

 function mintVerified( 
      address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input)
       public returns (bool)
    {
        
    bytes32 solutionsKey =  keccak256(abi.encodePacked(a,  b, c, input));
    require(solutions[solutionsKey].solutionAddress != address(0), "Solution does not exist");
    require(solutions[solutionsKey].minted == false, "Token already minted for this solution");
    require(solutions[solutionsKey].solutionAddress == msg.sender, "Only solution address can use it to mint a token");
    mint(to, tokenId);
    solutions[solutionsKey].minted = true;
    emit minted(tokenId, to); 
    return true; 
    }

  
 }


























