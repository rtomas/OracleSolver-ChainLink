const { ethers } = require("hardhat");
import * as json from "../deployments/mumbai/OracleSolver.json";
import { OracleSolver } from "../typechain-types/contracts/OracleSolver";
import "dotenv/config";

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

// signed transaction to the contract
const getPrice = async (tokenA: string, tokenB: string) => {
  let contract = (await ethers.getContractAt("OracleSolver", json.address)) as OracleSolver;
  let provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL, 80001);

  let tx = await contract.connect(provider).getPrice(tokenA, tokenB);

  console.log(JSON.stringify(tx));
};

try {
  // BTC A USDT
  getPrice("0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05", "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49");
} catch (e) {
  console.log(e);
}
