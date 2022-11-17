//import { ethers } from "hardhat";
//import hre from "hardhat";
const { ethers } = require("hardhat");
import * as json from "../deployments/goerli/OracleSolver.json";
//import * as json from "../deployments/localhost/OracleSolver.json";
import { OracleSolver } from "../typechain-types/contracts/OracleSolver";
import "dotenv/config";

const PRIVATE_KEY_OWNER = process.env.PRIVATE_KEY_OWNER || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";

// signed transaction to the contract
const addContract = async (tokenA: string, tokenB: string, solver: string) => {
  let contract = (await ethers.getContractAt("OracleSolver", json.address)) as OracleSolver;
  let provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL, 5);
  //let provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545", 1337);
  let deployer = new ethers.Wallet(PRIVATE_KEY_OWNER).connect(provider);
  console.log(deployer.address + " is the deployer address");
  let tx = await contract.connect(deployer).addContract(tokenA, tokenB, solver, { gasLimit: 3033906 });
  console.log(tokenA, tokenB, solver, JSON.stringify(tx));
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
  // BTC A ETH
  addContract("0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05", "0x912Aad0882e59Bdb5D7051BDe7728b1985D14C95", "0x779877A7B0D9E8603169DdbD7836e478b4624789");
} catch (e) {
  console.log(e);
}
