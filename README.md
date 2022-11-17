# Price Consumer + ChainLink

Given two tokens it solves an address of the chainlink oracle.

# Test

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

https://mumbai.polygonscan.com/address/0x2D506af8f3499b1e49aced92B72bE8C22616ed95
