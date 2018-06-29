var bet = artifacts.require('./Bet.sol')

module.exports = function (deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(bet)
}
