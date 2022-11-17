# Price Consumer + ChainLink

1. Deploy contracts
   `npx hardhat --network goerli deploy`

2. Verify contract in etherscan
   `npx hardhat verify --network goerli <contractaddress>`

3. Run tests
   `npx hardhat test`

4. Run the script to add pairs
   `npx ts-node --files scripts/addPairValues.ts`

# Price feed contracts from ChainLink

https://docs.chain.link/data-feeds/price-feeds/addresses
