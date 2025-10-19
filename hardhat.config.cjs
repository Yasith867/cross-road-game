require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    monad: {
      url: "https://api.pimlico.io/v2/10143/rpc?apikey=pim_7s3DQ8rudZmSN52Lv1CYEh",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : []
    }
  }
};
