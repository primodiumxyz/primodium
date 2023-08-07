// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { PrimodiumSystem, IWorld, addressToEntity, getAddressById } from "./internal/PrimodiumSystem.sol";

import { ID as BuildSystemID } from "systems/BuildSystem.sol";
// components
import { MainBaseComponent, ID as MainBaseComponentID } from "components/MainBaseComponent.sol";

import { IOnTwoEntitySubsystem } from "../interfaces/IOnTwoEntitySubsystem.sol";

import { LibBuilding } from "../libraries/LibBuilding.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
uint256 constant ID = uint256(keccak256("system.CheckRequiredTile"));

contract CheckRequiredTileSystem is IOnTwoEntitySubsystem, PrimodiumSystem {
  constructor(IWorld _world, address _components) PrimodiumSystem(_world, _components) {}

  function execute(bytes memory args) public override returns (bytes memory) {
    require(
      msg.sender == getAddressById(world.systems(), BuildSystemID),
      "CheckRequiredTileSystem: Only BuildSystem can call this function"
    );

    (address playerAddress, uint256 buildingEntity, uint256 buildingType) = abi.decode(
      args,
      (address, uint256, uint256)
    );

    return abi.encode(LibBuilding.canBuildOnTile(world, buildingType, LibEncode.decodeCoordEntity(buildingEntity)));
  }

  function executeTyped(
    address playerAddress,
    uint256 buildingEntity,
    uint256 buildingType
  ) public returns (bytes memory) {
    return execute(abi.encode(playerAddress, buildingEntity, buildingType));
  }
}
