pragma solidity >=0.8.21;

import { addressToEntity } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { PositionData } from "codegen/tables/Position.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { BuildingKey } from "src/Keys.sol";
import { LibSpaceRock } from "libraries/LibSpaceRock.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";
import { ESendType, SendArgs, ERock, Arrival } from "src/Types.sol";
import { OwnedBy } from "codegen/tables/OwnedBy.sol";

contract OnReinforce_UpdateRock is SystemHook {
  constructor() {}

  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    bytes32 playerEntity = addressToEntity(msgSender);
    bytes memory functionSelelector = SliceInstance.toBytes(SliceLib.getSubslice(callData, 0, 4));
    if (keccak256(functionSelelector) != keccak256("reinforce(uint256,uint256)")) {
      return;
    }
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));
    (bytes32 rockEntity, bytes32 arrival) = abi.decode(args, (bytes32, bytes32));
    if (OwnedBy.get(rockEntity) != 0) {
      LibSpaceRock.updateRock(playerEntity, rockEntity);
    }
  }

  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {}
}
