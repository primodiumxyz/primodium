// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { addressToEntity } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { PositionData } from "codegen/tables/Position.sol";

import { EBuilding } from "src/Types.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";

/**
 * @title OnDestroy_RemoveFromTiles
 * @dev This contract is a system hook that removes building tiles when a building is destroyed in the game world.
 */
contract OnDestroy_RemoveFromTiles is SystemHook {
  constructor() {}

  /**
   * @dev This function is called before the system's main logic is executed.
   * It does not perform any actions in this case.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    // This function does not perform any actions in this case.
  }

  /**
   * @dev This function is called after the system's main logic is executed.
   * It removes building tiles when a building is destroyed based on the provided coordinates.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system, which includes the coordinates of the destroyed building.
   */
  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    // Decode the arguments from the callData
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));
    PositionData memory coord = abi.decode(args, (PositionData));

    // Remove building tiles at the specified coordinates
    LibBuilding.removeBuildingTiles(coord);
  }
}
