var TestBet = artifacts.require('Bet')

contract('TestBet', function (accounts) {
  it('should assert true', function (done) {
    var test_bet = TestBet.deployed()
    assert.isTrue(true)
    done()
  })
})
