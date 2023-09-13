// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IStore } from "@latticexyz/store/src/IStore.sol";
import { createPrototype } from "../../libraries/prototypes/createPrototype.sol";
import { ERock, EBuilding } from "../Types.sol";
import { P_Blueprint, P_BlueprintTableId, P_MaxLevel, P_MaxLevelTableId } from "../Tables.sol";

bytes32 constant prototypeId = "IronMine";
bytes32 constant IronMinePrototypeId = prototypeId;
uint256 constant LENGTH = 2;

function IronMineKeys() pure returns (bytes32[] memory) {
  bytes32[] memory _keyTuple = new bytes32[](1);
  _keyTuple[0] = prototypeId;

  return _keyTuple;
}

function IronMinePrototype(IStore store) {
  bytes32[] memory keys = IronMineKeys();
  bytes32[] memory tableIds = new bytes32[](LENGTH);
  bytes[] memory values = new bytes[](LENGTH);

  tableIds[0] = P_BlueprintTableId;
  tableIds[1] = P_MaxLevelTableId;

  int32[] memory p_blueprint_value = new int32[](2);
  p_blueprint_value[0] = 0;
  p_blueprint_value[1] = 0;
  values[0] = P_Blueprint.encode(p_blueprint_value);
  values[1] = P_MaxLevel.encode(5);

  createPrototype(store, keys, tableIds, values);
}
