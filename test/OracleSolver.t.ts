import { expect } from "chai";
import { deployer, userTwo, deployerAddress, oracleSolver, makeStartCleanEach } from "./__setup.spec";
import { ethers } from "hardhat";
const tokenBTC = "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05";
const tokenETH = "0x912Aad0882e59Bdb5D7051BDe7728b1985D14C95";
const Solver = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

makeStartCleanEach("#Start OracleSolver Contract", function () {
  describe("Deployment OracleSolver Contract", async () => {
    it("deployer is owner", async () => {
      expect(await oracleSolver.owner()).to.equal(deployerAddress);
    });
  });

  describe("Add Pair Values", async () => {
    it("BTC/ETH with owner", async () => {
      expect(await oracleSolver.connect(deployer).addContract(tokenBTC, tokenETH, Solver)).to.emit(oracleSolver, "PairAdded");
    });

    it("BTC/ETH with any other user", async () => {
      await expect(oracleSolver.connect(userTwo).addContract(tokenBTC, tokenETH, Solver)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  // 1. add a contract solver with owner
  // 2.try add a contract solver with other account
});
