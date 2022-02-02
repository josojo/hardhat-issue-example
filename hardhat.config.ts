import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "@tenderly/hardhat-tenderly"

import dotenv from "dotenv";
import type { HttpNetworkUserConfig } from "hardhat/types";
import yargs from "yargs";


const argv = yargs
  .option("network", {
    type: "string",
    default: "hardhat",
  })
  .help(false)
  .version(false)
  .parseSync();

// Load environment variables.
dotenv.config();
const {
  INFURA_KEY,
  MNEMONIC,
  PK,
  REPORT_GAS,
  NODE_URL,
} = process.env;

const DEFAULT_MNEMONIC =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  sharedNetworkConfig.accounts = [PK];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}

if (
  ["rinkeby", "mainnet"].includes(argv.network) &&
  NODE_URL === undefined &&
  INFURA_KEY === undefined
) {
  throw new Error(
    `Could not find Infura key in env, unable to connect to network ${argv.network}`,
  );
}

if (NODE_URL !== undefined) {
  sharedNetworkConfig.url = NODE_URL;
}



export default {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    deploy: "src/deploy",
    sources: "src/contracts",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: false,
            runs: 1000000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 12.5e6,
      forking: {
        url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
        blockNumber: 14127300,
      },
    },
  },
  namedAccounts: {
    // Note: accounts defined by a number refer to the the accounts as configured
    // by the current network.
    deployer: 0,
  },
  gasReporter: {
    enabled: REPORT_GAS ? true : false,
    currency: "USD",
    gasPrice: 21,
  },
};
