import { AbiCoder } from "@ethersproject/abi";
import { ethers } from "hardhat";
import { BytesLike, Signer, Wallet } from "ethers";
import { revertToSnapshot, takeSnapshot } from "./helpers/utils";
import { OracleSolver, OracleSolver__factory } from "../typechain-types";

export let accounts: Signer[];
export let deployer: Signer;
export let minter: Signer;
export let userTwo: Signer;
export let userThree: Signer;
export let governance: Signer;
export let deployerAddress: string;
export let userAddress: string;
export let minterAddress: string;
export let otherAddress: string;
export let userThreeAddress: string;
export let governanceAddress: string;
export let testWallet: Wallet;
export let abiCoder: AbiCoder;

export let oracleSolver: OracleSolver;
export let osFactory: OracleSolver__factory;

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function makeStartCleanEach(name: string, tests: () => void) {
  describe(name, () => {
    beforeEach(async function () {
      await takeSnapshot();
    });
    tests();
    afterEach(async function () {
      await revertToSnapshot();
    });
  });
}

before(async function () {
  abiCoder = ethers.utils.defaultAbiCoder;
  //testWallet = new ethers.Wallet(FAKE_PRIVATEKEY).connect(ethers.provider)
  accounts = await ethers.getSigners();
  deployer = accounts[0];
  userTwo = accounts[1];
  userThree = accounts[2];

  deployerAddress = await deployer.getAddress();
  userAddress = await userTwo.getAddress();

  // deploy contracts
  oracleSolver = await new OracleSolver__factory(deployer).deploy();
});
