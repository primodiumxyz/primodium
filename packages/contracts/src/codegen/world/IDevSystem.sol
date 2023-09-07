// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { Schema } from "@latticexyz/store/src/Schema.sol";

interface IDevSystem {
  function devSetRecord(
    bytes32 tableId,
    bytes32[] calldata key,
    bytes calldata data,
    Schema valueSchema
  ) external;

  function devSetField(
    bytes32 tableId,
    bytes32[] calldata key,
    uint8 schemaIndex,
    bytes calldata data,
    Schema valueSchema
  ) external;

  function devPushToField(
    bytes32 tableId,
    bytes32[] calldata key,
    uint8 schemaIndex,
    bytes calldata dataToPush,
    Schema valueSchema
  ) external;

  function devPopFromField(
    bytes32 tableId,
    bytes32[] calldata key,
    uint8 schemaIndex,
    uint256 byteLengthToPop,
    Schema valueSchema
  ) external;

  function devUpdateInField(
    bytes32 tableId,
    bytes32[] calldata key,
    uint8 schemaIndex,
    uint256 startByteIndex,
    bytes calldata dataToSet,
    Schema valueSchema
  ) external;

  function devDeleteRecord(
    bytes32 tableId,
    bytes32[] calldata key,
    Schema valueSchema
  ) external;
}
