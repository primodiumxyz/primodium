pragma solidity >=0.8.21;

import { WorldResourceIdInstance } from "@latticexyz/world/src/WorldResourceId.sol";
import { addressToEntity, getSystemResourceId } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { ResourceId, ResourceIdInstance } from "@latticexyz/store/src/ResourceId.sol";
import { PositionData } from "codegen/tables/Position.sol";
import { Level } from "codegen/tables/Level.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { LibStorage } from "libraries/LibStorage.sol";
import { LibDefense } from "libraries/LibDefense.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";

/**
 * @title OnDestroy_Defense
 * @dev This contract is a system hook that handles the max storage capacity of a building when it is constructed in the game world.
 */
contract OnDestroy_Defense is SystemHook {
  constructor() {}

  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    // Decode the arguments from the callData
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));
    PositionData memory coord = abi.decode(args, (PositionData));

    // Get the building entity from the coordinates
    bytes32 buildingEntity = LibBuilding.getBuildingFromCoord(coord);

    // Convert the player's address to an entity
    bytes32 playerEntity = addressToEntity(msgSender);

    // Clear utility usage for the building
    LibDefense.clearBuildingDefenses(playerEntity, buildingEntity);
  }

  /**
   * @dev This function is called after the system's main logic is executed.
   * It increases the max storage capacity of a player's building entity.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {}
}
