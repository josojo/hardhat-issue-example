// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0;

import "hardhat/console.sol";

contract ChainIdTest {
    uint256 public test = 0;

    constructor() {}

    /// @dev Returns the chain id used by this contract.
    function getChainId() public view returns (uint256) {
        uint256 id;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            id := chainid()
        }
        console.log("chainId is %s ", id);
        return id;
    }

    function resultsInDifferentChainId(uint256 previousChainId) public {
        uint256 chainId = getChainId();
        require(chainId == previousChainId, "ChainId's don't agree");
        test = 1;
    }
}
