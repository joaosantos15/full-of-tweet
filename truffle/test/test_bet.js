var Bet = artifacts.require('Bet');

contract('Bet', function (accounts) {

  let bet, user1, user2, judge, tweetId;
  const stake = 5000000000000000000;
  tweetId = "0x88";
  
  before("should prepare", function() {
    assert.isAtLeast(accounts.length, 8);
    user1 = accounts[0];
    user2 = accounts[1];
    judge = accounts[2];
    
  });

  
  it('Create Statement', function(){
    bet = Bet.deployed().then(function(instance) {
      return instance.createStatement(user2,judge,tweetId, {from: user1, value: stake})
    })   
  })
  

 /* 
  it('Check Balance', function(){
    var initialBalance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[5]).toNumber()
    var bet = Bet.deployed().then(function(instance) { 
    assert.equal(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[5]).toNumber(), 190);
    })
  })
  */

 
  it('Check Created Statement', function(){
      bet = Bet.deployed().then(function(instance) {
        return instance.statementsList.call(tweetId)
      })
      .then(function(list) {
      /*  console.log(judge)
        console.log(list[1])
        console.log(list);*/
        assert.equal(judge, list[2]);
       // assert.equal(list[5], true)
    })
  })

 
  it('confirmStatement', function(){
    var bet = Bet.deployed().then(function(instance) {
      return instance.confirmStatement(tweetId, {from: user2, value: stake})
    })   
  })

  it('Check Confirmed Statement', function(){
    bet = Bet.deployed().then(function(instance) {
      return instance.statementsList.call(tweetId)
    })
    .then(function(list) {
      console.log(list)
      assert.equal(list[5], true)
  })
})

  it('judgeSettles', function(){
    var bet = Bet.deployed().then(function(instance) {
      return instance.judgeSettles(tweetId,user2, {from: judge})
    })   
  })


it('should assert true', function (done) {
  var test_bet = Bet.deployed()
  assert.isTrue(true)
  done()
})

  
})  
