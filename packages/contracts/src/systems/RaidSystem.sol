// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { addressToEntity, entityToAddress, getSystemResourceId } from "src/utils.sol";
import { SystemCall } from "@latticexyz/world/src/SystemCall.sol";

import { OwnedBy } from "codegen/index.sol";
import { LibRaid } from "codegen/Libraries.sol";

import { S_UpdateRockSystem } from "systems/subsystems/S_UpdateRockSystem.sol";

contract RaidSystem is PrimodiumSystem {
  /**
   * @dev Initiates a raid on a rock entity using the LibRaid library.
   * @param rockEntity The identifier of the target rock entity.
   */
  function raid(bytes32 rockEntity) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    if (OwnedBy.get(rockEntity) != 0) {
      SystemCall.callWithHooksOrRevert(
        entityToAddress(playerEntity),
        getSystemResourceId("S_UpdateRockSystem"),
        abi.encodeCall(S_UpdateRockSystem.updateRock, (playerEntity, rockEntity)),
        0
      );
    }
    LibRaid.raid(playerEntity, rockEntity);
  }
}
