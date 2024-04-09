// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema } from "@latticexyz/store/src/Schema.sol";
import { EncodedLengths, EncodedLengthsLib } from "@latticexyz/store/src/EncodedLengths.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

struct BattleRaidResultData {
  uint256[] resourcesAtStart;
  uint256[] resourcesAtEnd;
}

library BattleRaidResult {
  // Hex below is the result of `WorldResourceIdLib.encode({ namespace: "Primodium", name: "BattleRaidResult", typeId: RESOURCE_OFFCHAIN_TABLE });`
  ResourceId constant _tableId = ResourceId.wrap(0x6f745072696d6f6469756d0000000000426174746c6552616964526573756c74);

  FieldLayout constant _fieldLayout =
    FieldLayout.wrap(0x0000000200000000000000000000000000000000000000000000000000000000);

  // Hex-encoded key schema of (bytes32, bytes32)
  Schema constant _keySchema = Schema.wrap(0x004002005f5f0000000000000000000000000000000000000000000000000000);
  // Hex-encoded value schema of (uint256[], uint256[])
  Schema constant _valueSchema = Schema.wrap(0x0000000281810000000000000000000000000000000000000000000000000000);

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](2);
    keyNames[0] = "battleEntity";
    keyNames[1] = "participantEntity";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](2);
    fieldNames[0] = "resourcesAtStart";
    fieldNames[1] = "resourcesAtEnd";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Set the full data using individual values.
   */
  function set(
    bytes32 battleEntity,
    bytes32 participantEntity,
    uint256[] memory resourcesAtStart,
    uint256[] memory resourcesAtEnd
  ) internal {
    bytes memory _staticData;
    EncodedLengths _encodedLengths = encodeLengths(resourcesAtStart, resourcesAtEnd);
    bytes memory _dynamicData = encodeDynamic(resourcesAtStart, resourcesAtEnd);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using individual values.
   */
  function _set(
    bytes32 battleEntity,
    bytes32 participantEntity,
    uint256[] memory resourcesAtStart,
    uint256[] memory resourcesAtEnd
  ) internal {
    bytes memory _staticData;
    EncodedLengths _encodedLengths = encodeLengths(resourcesAtStart, resourcesAtEnd);
    bytes memory _dynamicData = encodeDynamic(resourcesAtStart, resourcesAtEnd);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreCore.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData, _fieldLayout);
  }

  /**
   * @notice Set the full data using the data struct.
   */
  function set(bytes32 battleEntity, bytes32 participantEntity, BattleRaidResultData memory _table) internal {
    bytes memory _staticData;
    EncodedLengths _encodedLengths = encodeLengths(_table.resourcesAtStart, _table.resourcesAtEnd);
    bytes memory _dynamicData = encodeDynamic(_table.resourcesAtStart, _table.resourcesAtEnd);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using the data struct.
   */
  function _set(bytes32 battleEntity, bytes32 participantEntity, BattleRaidResultData memory _table) internal {
    bytes memory _staticData;
    EncodedLengths _encodedLengths = encodeLengths(_table.resourcesAtStart, _table.resourcesAtEnd);
    bytes memory _dynamicData = encodeDynamic(_table.resourcesAtStart, _table.resourcesAtEnd);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreCore.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData, _fieldLayout);
  }

  /**
   * @notice Decode the tightly packed blob of dynamic data using the encoded lengths.
   */
  function decodeDynamic(
    EncodedLengths _encodedLengths,
    bytes memory _blob
  ) internal pure returns (uint256[] memory resourcesAtStart, uint256[] memory resourcesAtEnd) {
    uint256 _start;
    uint256 _end;
    unchecked {
      _end = _encodedLengths.atIndex(0);
    }
    resourcesAtStart = (SliceLib.getSubslice(_blob, _start, _end).decodeArray_uint256());

    _start = _end;
    unchecked {
      _end += _encodedLengths.atIndex(1);
    }
    resourcesAtEnd = (SliceLib.getSubslice(_blob, _start, _end).decodeArray_uint256());
  }

  /**
   * @notice Decode the tightly packed blobs using this table's field layout.
   *
   * @param _encodedLengths Encoded lengths of dynamic fields.
   * @param _dynamicData Tightly packed dynamic fields.
   */
  function decode(
    bytes memory,
    EncodedLengths _encodedLengths,
    bytes memory _dynamicData
  ) internal pure returns (BattleRaidResultData memory _table) {
    (_table.resourcesAtStart, _table.resourcesAtEnd) = decodeDynamic(_encodedLengths, _dynamicData);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(bytes32 battleEntity, bytes32 participantEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(bytes32 battleEntity, bytes32 participantEntity) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack dynamic data lengths using this table's schema.
   * @return _encodedLengths The lengths of the dynamic fields (packed into a single bytes32 value).
   */
  function encodeLengths(
    uint256[] memory resourcesAtStart,
    uint256[] memory resourcesAtEnd
  ) internal pure returns (EncodedLengths _encodedLengths) {
    // Lengths are effectively checked during copy by 2**40 bytes exceeding gas limits
    unchecked {
      _encodedLengths = EncodedLengthsLib.pack(resourcesAtStart.length * 32, resourcesAtEnd.length * 32);
    }
  }

  /**
   * @notice Tightly pack dynamic (variable length) data using this table's schema.
   * @return The dynamic data, encoded into a sequence of bytes.
   */
  function encodeDynamic(
    uint256[] memory resourcesAtStart,
    uint256[] memory resourcesAtEnd
  ) internal pure returns (bytes memory) {
    return abi.encodePacked(EncodeArray.encode((resourcesAtStart)), EncodeArray.encode((resourcesAtEnd)));
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dynamic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(
    uint256[] memory resourcesAtStart,
    uint256[] memory resourcesAtEnd
  ) internal pure returns (bytes memory, EncodedLengths, bytes memory) {
    bytes memory _staticData;
    EncodedLengths _encodedLengths = encodeLengths(resourcesAtStart, resourcesAtEnd);
    bytes memory _dynamicData = encodeDynamic(resourcesAtStart, resourcesAtEnd);

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(bytes32 battleEntity, bytes32 participantEntity) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = battleEntity;
    _keyTuple[1] = participantEntity;

    return _keyTuple;
  }
}
