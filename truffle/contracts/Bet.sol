pragma solidity ^0.4.22;


contract Bet {
  struct Statement{
    address party1;
    address party2;
    address judge;
    bytes32 tweetId;
    uint stake;
  }

  mapping (bytes32 => Statement) public statementsList;

  function createStatement(address party2, address judge, bytes32 tweetId) public payable{
    // add msg.value checks
    statementsList[tweetId] = Statement(msg.sender, party2, judge, tweetId, msg.value);
  }


}
