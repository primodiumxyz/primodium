pragma solidity >=0.8.21;

import { addressToEntity, entityToAddress, getSystemResourceId, bytes32ToString } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { PackedCounter } from "@latticexyz/store/src/PackedCounter.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { BuildingType, BuildingTypeTableId } from "codegen/tables/BuildingType.sol";
import { Position, PositionTableId, PositionData } from "codegen/tables/Position.sol";
import { OwnedBy, OwnedByTableId } from "codegen/tables/OwnedBy.sol";
import { ReversePosition } from "codegen/tables/ReversePosition.sol";
import { Bounds } from "libraries/LibBuilding.sol";
import { OnHookChangedValue, OnHookChangedValueTableId } from "codegen/tables/OnHookChangedValue.sol";
import { ResourceIdInstance } from "@latticexyz/store/src/ResourceId.sol";
import { Home } from "codegen/tables/Home.sol";
import { EBuilding } from "src/Types.sol";
import { BuildSystem } from "systems/BuildSystem.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { BuildingKey } from "src/Keys.sol";
import { IWorld } from "codegen/world/IWorld.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { LibSpaceRock } from "libraries/LibSpaceRock.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";
import { Spawned } from "codegen/tables/Spawned.sol";
import { ESendType, SendArgs, ERock, Arrival } from "src/Types.sol";

contract OnInvade_UpdateRock is SystemHook {
  constructor() {}

  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    bytes32 playerEntity = addressToEntity(msgSender);
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));
    bytes32 rockEntity = abi.decode(args, (bytes32));
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
