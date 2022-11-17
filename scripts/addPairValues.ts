//import { ethers } from "hardhat";
//import hre from "hardhat";
const { ethers } = require("hardhat");
import * as json from "../deployments/mumbai/OracleSolver.json";
//import * as json from "../deployments/localhost/OracleSolver.json";
import { OracleSolver } from "../typechain-types/contracts/OracleSolver";
import "dotenv/config";

const PRIVATE_KEY_OWNER = process.env.PRIVATE_KEY_OWNER || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

// signed transaction to the contract
const addContract = async (tokenA: string, tokenB: string, solver: string) => {
  let contract = (await ethers.getContractAt("OracleSolver", json.address)) as OracleSolver;
  let provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL, 80001);
  //let provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545", 1337);
  let deployer = new ethers.Wallet(PRIVATE_KEY_OWNER).connect(provider);
  console.log(deployer.address + " is the deployer address");
  let tx = await contract.connect(deployer).addContract(tokenA, tokenB, solver, { gasPrice: 1300000000, gasLimit: 500000 });

  console.log(JSON.stringify(tx));
  // get info from the block
  let block = await provider.getBlock(tx.blockHash);
  //console.log(block);

  tx.wait(1).then(
    (receipt) => {
      console.log("receipt", JSON.stringify(receipt));
    },
    (err) => {
      //console.log("err", err);
      console.log("err");
    }
  );
};

try {
  // BTC A USDT
  addContract("0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05", "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49", "0x007A22900a3B98143368Bd5906f8E17e9867581b");
} catch (e) {
  console.log(e);
}
