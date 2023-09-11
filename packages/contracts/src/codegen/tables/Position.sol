// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(
  abi.encodePacked(bytes16(""), bytes16("Position"))
);
bytes32 constant PositionTableId = _tableId;

struct PositionData {
  int32 x;
  int32 y;
  bytes32 parent;
}

library Position {
  /** Get the table's key schema */
  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](1);
    _schema[0] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's value schema */
  function getValueSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](3);
    _schema[0] = SchemaType.INT32;
    _schema[1] = SchemaType.INT32;
    _schema[2] = SchemaType.BYTES32;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's key names */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](1);
    keyNames[0] = "entity";
  }

  /** Get the table's field names */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](3);
    fieldNames[0] = "x";
    fieldNames[1] = "y";
    fieldNames[2] = "parent";
  }

  /** Register the table's key schema, value schema, key names and value names */
  function register() internal {
    StoreSwitch.registerTable(
      _tableId,
      getKeySchema(),
      getValueSchema(),
      getKeyNames(),
      getFieldNames()
    );
  }

  /** Register the table's key schema, value schema, key names and value names (using the specified store) */
  function register(IStore _store) internal {
    _store.registerTable(
      _tableId,
      getKeySchema(),
      getValueSchema(),
      getKeyNames(),
      getFieldNames()
    );
  }

  /** Get x */
  function getX(bytes32 entity) internal view returns (int32 x) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = StoreSwitch.getField(
      _tableId,
      _keyTuple,
      0,
      getValueSchema()
    );
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Get x (using the specified store) */
  function getX(IStore _store, bytes32 entity) internal view returns (int32 x) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = _store.getField(
      _tableId,
      _keyTuple,
      0,
      getValueSchema()
    );
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Set x */
  function setX(bytes32 entity, int32 x) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    StoreSwitch.setField(
      _tableId,
      _keyTuple,
      0,
      abi.encodePacked((x)),
      getValueSchema()
    );
  }

  /** Set x (using the specified store) */
  function setX(
    IStore _store,
    bytes32 entity,
    int32 x
  ) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    _store.setField(
      _tableId,
      _keyTuple,
      0,
      abi.encodePacked((x)),
      getValueSchema()
    );
  }

  /** Get y */
  function getY(bytes32 entity) internal view returns (int32 y) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = StoreSwitch.getField(
      _tableId,
      _keyTuple,
      1,
      getValueSchema()
    );
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Get y (using the specified store) */
  function getY(IStore _store, bytes32 entity) internal view returns (int32 y) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = _store.getField(
      _tableId,
      _keyTuple,
      1,
      getValueSchema()
    );
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Set y */
  function setY(bytes32 entity, int32 y) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    StoreSwitch.setField(
      _tableId,
      _keyTuple,
      1,
      abi.encodePacked((y)),
      getValueSchema()
    );
  }

  /** Set y (using the specified store) */
  function setY(
    IStore _store,
    bytes32 entity,
    int32 y
  ) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    _store.setField(
      _tableId,
      _keyTuple,
      1,
      abi.encodePacked((y)),
      getValueSchema()
    );
  }

  /** Get parent */
  function getParent(bytes32 entity) internal view returns (bytes32 parent) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = StoreSwitch.getField(
      _tableId,
      _keyTuple,
      2,
      getValueSchema()
    );
    return (Bytes.slice32(_blob, 0));
  }

  /** Get parent (using the specified store) */
  function getParent(IStore _store, bytes32 entity)
    internal
    view
    returns (bytes32 parent)
  {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = _store.getField(
      _tableId,
      _keyTuple,
      2,
      getValueSchema()
    );
    return (Bytes.slice32(_blob, 0));
  }

  /** Set parent */
  function setParent(bytes32 entity, bytes32 parent) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    StoreSwitch.setField(
      _tableId,
      _keyTuple,
      2,
      abi.encodePacked((parent)),
      getValueSchema()
    );
  }

  /** Set parent (using the specified store) */
  function setParent(
    IStore _store,
    bytes32 entity,
    bytes32 parent
  ) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    _store.setField(
      _tableId,
      _keyTuple,
      2,
      abi.encodePacked((parent)),
      getValueSchema()
    );
  }

  /** Get the full data */
  function get(bytes32 entity)
    internal
    view
    returns (PositionData memory _table)
  {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = StoreSwitch.getRecord(
      _tableId,
      _keyTuple,
      getValueSchema()
    );
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, bytes32 entity)
    internal
    view
    returns (PositionData memory _table)
  {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    bytes memory _blob = _store.getRecord(
      _tableId,
      _keyTuple,
      getValueSchema()
    );
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(
    bytes32 entity,
    int32 x,
    int32 y,
    bytes32 parent
  ) internal {
    bytes memory _data = encode(x, y, parent);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    StoreSwitch.setRecord(_tableId, _keyTuple, _data, getValueSchema());
  }

  /** Set the full data using individual values (using the specified store) */
  function set(
    IStore _store,
    bytes32 entity,
    int32 x,
    int32 y,
    bytes32 parent
  ) internal {
    bytes memory _data = encode(x, y, parent);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    _store.setRecord(_tableId, _keyTuple, _data, getValueSchema());
  }

  /** Set the full data using the data struct */
  function set(bytes32 entity, PositionData memory _table) internal {
    set(entity, _table.x, _table.y, _table.parent);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(
    IStore _store,
    bytes32 entity,
    PositionData memory _table
  ) internal {
    set(_store, entity, _table.x, _table.y, _table.parent);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob)
    internal
    pure
    returns (PositionData memory _table)
  {
    _table.x = (int32(uint32(Bytes.slice4(_blob, 0))));

    _table.y = (int32(uint32(Bytes.slice4(_blob, 4))));

    _table.parent = (Bytes.slice32(_blob, 8));
  }

  /** Tightly pack full data using this table's schema */
  function encode(
    int32 x,
    int32 y,
    bytes32 parent
  ) internal pure returns (bytes memory) {
    return abi.encodePacked(x, y, parent);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(bytes32 entity)
    internal
    pure
    returns (bytes32[] memory)
  {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    return _keyTuple;
  }

  /* Delete all data for given keys */
  function deleteRecord(bytes32 entity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    StoreSwitch.deleteRecord(_tableId, _keyTuple, getValueSchema());
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, bytes32 entity) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = entity;

    _store.deleteRecord(_tableId, _keyTuple, getValueSchema());
  }
}
