// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./PriceConsumerV3.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OracleSolver
 * @dev Given two tokens it solves address of the chainlink oracle
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract OracleSolver is Ownable {
  mapping(bytes32 => PriceConsumerV3) private tokensPricer;

  error IdenticalAddress(address);
  error PairExist(address, address, address);
  error ZeroAddress(address);
  error PairNotExist(address, address);

  event PairAdded(address token0, address token1, address pricer);

  function addContract(
    address tokenA,
    address tokenB,
    address solver
  ) public onlyOwner {
    PriceConsumerV3 pc = getContractConsumer(tokenA, tokenB);
    if (address(pc) != address(0)) revert PairExist(tokenA, tokenB, solver);

    bytes32 tokens = generateTokensBytes(tokenA, tokenB);

    tokensPricer[tokens] = new PriceConsumerV3(solver);

    emit PairAdded(tokenA, tokenB, address(tokensPricer[tokens]));
  }

  function getContractConsumer(address tokenA, address tokenB) private view returns (PriceConsumerV3) {
    if (tokenA == tokenB) revert IdenticalAddress(tokenA);

    bytes32 tokens = generateTokensBytes(tokenA, tokenB);
    return tokensPricer[tokens];
  }

  function getPrice(address tokenA, address tokenB) public view returns (int256) {
    PriceConsumerV3 pc = getContractConsumer(tokenA, tokenB);
    if (address(pc) == address(0)) revert PairNotExist(tokenA, tokenB);

    return pc.getLatestPrice();
  }

  function orderAddress(address tokenA, address tokenB) private pure returns (address, address) {
    return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
  }

  function generateTokensBytes(address tokenA, address tokenB) private pure returns (bytes32) {
    (address token0, address token1) = orderAddress(tokenA, tokenB);
    if (token0 == address(0)) revert ZeroAddress(token0);

    return keccak256(abi.encodePacked(token0, token1));
  }
}
