# Price Consumer + ChainLink

Given two tokens it solves an address of the chainlink oracle.

# Test

0. Install dependencies
   `yarn`

1. Deploy contracts
   `npx hardhat --network mumbai deploy`

2. Verify contract in polygonscan
   `npx hardhat verify --network mumbai <contractaddress>`

3. Run tests
   `npx hardhat test`

4. Add Pair Value to the contract
   `yarn run addContract`

5. Get Price from a Pair Value of tokens
   `yarn run getPrice`

# Price feed contracts from ChainLink

https://docs.chain.link/data-feeds/price-feeds/addresses

# Contract in Mumbai

https://mumbai.polygonscan.com/address/0x46b1e5E36dBb37Ae99Ba6008AbAa82cE758f26c5

by Gabriel González & Tomás Rawski

for Chainlink Fall 2022 Hackathon
