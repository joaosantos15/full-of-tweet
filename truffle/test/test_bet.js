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

  
  it('FUNCTION Create Statement', function(){
    bet = Bet.deployed().then(function(instance) {
      return instance.createStatement(user2,judge,tweetId, {from: user1, value: stake})
    })   
  })
   
  it('Check Created Statement', function(){
      return Bet.deployed().then(function(instance) {
        return instance.statementsList.call(tweetId)
      })
      .then(function(list) {
       assert.isFalse(list[5]) 
       assert.isFalse(list[6])
    })
  })

 
  it('FUNCTION confirmStatement', function(){
    return Bet.deployed().then(function(instance) {
      return instance.confirmStatement(tweetId, {from: user2, value: stake})
    })   
  })

  it('Check Confirmed Statement', function(){
    return Bet.deployed().then(function(instance) {
      return instance.statementsList.call(tweetId)
    })
    .then(function(list) {
      assert.isTrue(list[5])
      assert.isFalse(list[6])
  })
})

  it('FUNCTION judgeSettles', function(){
    return Bet.deployed().then(function(instance) {
      return instance.judgeSettles(tweetId,user2, {from: judge})
    })   
  })

  it('Check Settled Statement', function(){
    return Bet.deployed().then(function(instance) {
      return instance.statementsList.call(tweetId)
    })
    .then(function(list) {
      assert.isTrue(list[5])
      assert.isTrue(list[6])
  })
})

  
})  
