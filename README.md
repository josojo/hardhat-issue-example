### Indeterministic chaindId assembly in tests

## Issue

The chainId retrieved from the following solidity code:
```
assembly {
            id := chainid()
        }
```
Is not always returning the same result during testing contracts, if in the hardhat.config.ts file a `forking` rule is specified like this:
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


## Example
In order to duplicate, run the following commands:

```
export INFURA_KEY=<Your Key>
yarn
yarn test
```

This should print:
```
chainId is 1 <---- console.log() output
chainId is 31337 <---- console.log() output
    1) fails on check of txHash


  0 passing (2s)
  1 failing

  1) ChainIdTest
       fails on check of txHash:
     Error: VM Exception while processing transaction: reverted with reason string 'Unexpected transaction hash'
      at ChainIdTest.resultsInDifferentChainId (src/contracts/ChainIdTest.sol:26)
      at processTicksAndRejections (node:internal/process/task_queues:96:5)
      at runNextTicks (node:internal/process/task_queues:65:3)
      at listOnTimeout (node:internal/timers:526:9)
      at processTimers (node:internal/timers:500:7)
      at async HardhatNode._mineBlockWithPendingTxs (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1650:23)
      at async HardhatNode.mineBlock (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:459:16)
      at async EthModule._sendTransactionAndReturnHash (node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:1496:18)
```

As one can see the chainId changed, although the network did not change.