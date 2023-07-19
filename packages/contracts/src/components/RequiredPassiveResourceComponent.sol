// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/Component.sol";

struct RequiredPassiveResourceData {
  uint256[] ResourceIDs;
  uint256[] RequiredAmounts;
}
uint256 constant ID = uint256(keccak256("component.RequiredPassiveResource"));

contract RequiredPassiveResourceComponent is Component {
  constructor(address world) Component(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "ResourceIDs";
    values[0] = LibTypes.SchemaValue.UINT256_ARRAY;

    keys[1] = "RequiredAmounts";
    values[1] = LibTypes.SchemaValue.UINT256_ARRAY;
  }

  function set(uint256 entity, RequiredPassiveResourceData calldata value) public virtual {
    set(entity, abi.encode(value.ResourceIDs, value.RequiredAmounts));
  }

  function getValue(uint256 entity) public view virtual returns (RequiredPassiveResourceData memory) {
    (uint256[] memory resourceIDs, uint256[] memory requiredAmounts) = abi.decode(
      getRawValue(entity),
      (uint256[], uint256[])
    );
    return RequiredPassiveResourceData(resourceIDs, requiredAmounts);
  }

  function getEntitiesWithValue(
    RequiredPassiveResourceData calldata factoryMineBuildingsData
  ) public view virtual returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(factoryMineBuildingsData));
  }
}
