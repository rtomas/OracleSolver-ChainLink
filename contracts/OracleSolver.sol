// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./PriceConsumerV3.sol";

/**
 * @title OracleSolver
 * @dev Given two tokens it solves address of the chainlink oracle
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract OracleSolver {
  mapping(bytes32 => address) public tokensSolver;
  mapping(bytes32 => PriceConsumerV3) public tokensPricer; //this should be private

  function addContract(
    address tokenA,
    address tokenB,
    address solver
  ) public {
    require(tokenA != tokenB, "OracleSolver: IDENTICAL_ADDRESSES");
    require(getContractAddress(tokenA, tokenB) != address(0), "OracleSolver: PAIR_EXISTS");
    (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    require(token0 != address(0), "OracleSolver: ZERO_ADDRESS");
    bytes32 tokens = keccak256(abi.encodePacked(token0, token1));
    tokensPricer[tokens] = new PriceConsumerV3(solver);
    tokensSolver[tokens] = solver;
  }

  function getContractAddress(address tokenA, address tokenB) public view returns (address) {
    require(tokenA != tokenB, "OracleSolver: IDENTICAL_ADDRESSES");
    (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    bytes32 tokens = keccak256(abi.encodePacked(token0, token1));
    return tokensSolver[tokens];
  }

  function getContract(address tokenA, address tokenB) private view returns (PriceConsumerV3) {
    require(tokenA != tokenB, "OracleSolver: IDENTICAL_ADDRESSES");
    (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    bytes32 tokens = keccak256(abi.encodePacked(token0, token1));
    return tokensPricer[tokens];
  }

  function getPrice(address tokenA, address tokenB) public view returns (int) {
    require(getContractAddress(tokenA, tokenB) != address(0), "OracleSolver: PAIR_EXISTS");
    return getContract(tokenA, tokenB).getLatestPrice();
  }
}