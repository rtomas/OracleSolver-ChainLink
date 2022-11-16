import { expect } from "chai";
import { deployer, userTwo, deployerAddress, oracleSolver, makeStartCleanEach } from "./__setup.spec";
import { ethers } from "hardhat";

makeStartCleanEach("#Start OracleSolver Contract", function () {
  describe("Deployment OracleSolver Contract", async () => {
    it("deployer is owner", async () => {
      expect(await oracleSolver.owner()).to.equal(deployerAddress);
    });
  });
});
