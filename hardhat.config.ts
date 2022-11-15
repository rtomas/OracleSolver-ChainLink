import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const PRIVATE_KEY_OWNER = process.env.PRIVATE_KEY_OWNER || "";

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
    },
  },
};

export default config;
