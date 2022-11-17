import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const PRIVATE_KEY_OWNER = process.env.PRIVATE_KEY_OWNER || "";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY_OWNER],
      chainId: 5,
      gasPrice: 5000000000,
    },
    localhost: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_KEY, //ETHERSCAN_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    token: "WEI",
  },
};

export default config;
