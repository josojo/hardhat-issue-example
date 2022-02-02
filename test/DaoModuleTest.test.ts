import { MetaTransaction } from "@gnosis.pm/safe-contracts";
import { expect } from "chai";
import { Contract, Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";


describe("ChainIdTest", () => {
  let chainIdTest: Contract;
  let tester: Wallet;

  beforeEach(async () => {
    [tester] = await waffle.provider.getWallets();

    const ChainIdTest = await ethers.getContractFactory(
      "ChainIdTest",
    );
    chainIdTest = await ChainIdTest.deploy(
    );
  });

  it.only("fails on check of chainId", async () => {
    let chainIds = [];
    chainIds.push(await chainIdTest.connect(tester).getChainId());
    await chainIdTest.connect(tester).resultsInDifferentChainId(chainIds[0]);
  });
});
