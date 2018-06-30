pragma solidity ^0.4.22;


contract FullOfTweet {

  struct Statement{
    address issuer;
    address judge;
    bytes32 tweetId;
    uint issuerStake;
    uint communityStake;
    uint numberOfStakedUsers;
    bool evaluated;
  }

  mapping (address => uint) public userReputation;
  mapping (bytes32 => Statement) public statementsList;
  mapping (address => Statement[]) public statementsListByJudge;

  function getStatementsForJudgeSize(address judge) public constant returns(uint256){
	
	return statementsListByJudge[judge].length;
  }

  function getStatementForJudge(address judge,uint256 index) public view returns(bytes32){
	
	return statementsListByJudge[judge][index].tweetId;
  }

  function createStatement(address judge, bytes32 tweetId) public payable returns(address, address,bytes32, uint, uint, uint, bool){
	// add msg.value checks
    
    Statement memory currStatement = Statement(msg.sender, judge, tweetId, msg.value,0,0,false);
    statementsList[tweetId] = currStatement;
    statementsListByJudge[judge].push(currStatement);

    return (currStatement.issuer, currStatement.judge, currStatement.tweetId, currStatement.issuerStake, currStatement.communityStake, 
    currStatement.numberOfStakedUsers, currStatement.evaluated);
  }

  // Add community stake
  function addStake(bytes32 tweetId) public payable{
    // check it has value
    require(msg.value > 0, "stake value can not be zero");
    // add stake to Statement
    statementsList[tweetId].communityStake += msg.value;
    // increase number of staked users
    statementsList[tweetId].numberOfStakedUsers += 1;
  }

  function settleCommunityStake(bytes32 tweetId){
    // check there is stake in the statement
    require(statementsList[tweetId].communityStake > 0);
    // transfer stake to the judge
    statementsList[tweetId].judge.transfer(statementsList[tweetId].communityStake);
  }

  function settleReputation(bytes32 tweetId){
    // check there are users staked in the Statement
    require(statementsList[tweetId].numberOfStakedUsers > 0);
    userReputation[statementsList[tweetId].issuer] += statementsList[tweetId].communityStake;
  }


  /* function judgeSettles(bytes32 tweetId, address _winner) public {
    // confirm bet is confirmed
    require(statementsList[tweetId].evaluated);
    // confirm that the winner _exists_
    require(_winner == statementsList[tweetId].party1 || _winner == statementsList[tweetId].party2);
    //confirm the judge is the one calling the function
    require(msg.sender == statementsList[tweetId].judge);
    
    // transfer the funds to the winner
    _winner.transfer(statementsList[tweetId].stake);
     */
    // add tie

    // record the winner for history purposes
    //statementsList[tweetId].winner = _winner;
    // transfer the funds to the winner
    //statementsList[tweetId].winner.transfer(statementsList[tweetId].stake);
  
  
}