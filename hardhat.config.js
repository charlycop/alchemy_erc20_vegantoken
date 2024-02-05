require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts:[ `${process.env.SEPOLIA_PRIVATE_KEY}` ]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${process.env.ETHERSCAN_KEY}`
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
