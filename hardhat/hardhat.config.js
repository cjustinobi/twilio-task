require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config()
// require("@nomicfoundation/hardhat-chai-matchers");
// require("hardhat-deploy");
// require("@nomiclabs/hardhat-ethers");
// require("@typechain/hardhat");

const { SEPOLIA_PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "maticmum",
  networks: {
   maticmum: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/x3zIrHFB7HFjpRCrh8i827GH8ezaHyiU`,
      // url: `https://eth-sepolia.g.alchemy.com/v2/q7fjK5eosDfEgAmoNXHHIXMjEomWECLk`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  optimizer: {
    enabled: true,
    runs: 200,
  },
  paths: {
    artifacts: '../web/artifacts'
  },
};
