# Indeterministic chaindId assembly in tests

## Issue

The chainId retrieved from the following solidity code:
```
assembly {
            id := chainid()
        }
```
Is not always returning the same result during test, if in the hardhat.config.ts file a `forking` rule is specified like this:
```
networks: {
    hardhat: {
      blockGasLimit: 12.5e6,
      forking: {
        url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
        blockNumber: 14127300,
      },
    },
  },
```
You might have to change to a more recent block, in order to make the example work, as infra is not "archive node"

## Example
In order to duplicate, run the following commands:

```
export INFURA_KEY=<Your Key>
yarn
yarn test
```

This should print:
``` 
ChainIdTest
chainId is 1 
chainId is 31337 
    1) fails on check of chainId


  0 passing (2s)
  1 failing

  1) ChainIdTest
       fails on check of chainId:
     Error: VM Exception while processing transaction: reverted with reason string 'ChainId's don't agree'
```

As one can see the chainId changed, although the network did not change.