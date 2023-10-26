// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { WorldResourceIdInstance } from "@latticexyz/world/src/WorldResourceId.sol";
import { addressToEntity, getSystemResourceId } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { ResourceId, ResourceIdInstance } from "@latticexyz/store/src/ResourceId.sol";
import { PositionData } from "codegen/tables/Position.sol";

import { EBuilding } from "src/Types.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { ExpansionKey } from "src/Keys.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { Level } from "codegen/tables/Level.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";

/**
 * @title OnUpgradeRange_SpendResources
 * @dev This contract is a system hook that handles resource spending when a base range is expanded
 */
contract OnUpgradeRange_SpendResources is SystemHook {
  constructor() {}

  /**
   * @dev This function is called before the system's main logic is executed.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {}

  /**
   * @dev This function is called after the system's main logic is executed.
   * It spends the required resources when a building is constructed.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    bytes32 playerEntity = addressToEntity(msgSender);

    // Get the player level
    uint256 level = Level.get(playerEntity);

    // Spend the required resources for upgrading the unit
    LibResource.spendUpgradeResources(playerEntity, ExpansionKey, level);
  }
}
