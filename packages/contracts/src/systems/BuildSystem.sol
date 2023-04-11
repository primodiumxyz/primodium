// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";

import { LastBuiltAtComponent, ID as LastBuiltAtComponentID } from "components/LastBuiltAtComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";

import { IronResourceComponent, ID as IronResourceComponentID } from "components/IronResourceComponent.sol";

import { MainBaseID, ConveyerID, MinerID, LithiumMinerID, BulletFactoryID, SiloID } from "../prototypes/Tiles.sol";
import { BasicMinerID } from "../prototypes/Tiles.sol";
import { Coord } from "../types.sol";
import { LibBuild } from "../libraries/LibBuild.sol";

uint256 constant ID = uint256(keccak256("system.Build"));

contract BuildSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 blockType, Coord memory coord) = abi.decode(arguments, (uint256, Coord));
    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    TileComponent tileComponent = TileComponent(getAddressById(components, TileComponentID));
    OwnedByComponent ownedByComponent = OwnedByComponent(getAddressById(components, OwnedByComponentID));

    LastBuiltAtComponent lastBuiltAtComponent = LastBuiltAtComponent(
      getAddressById(components, LastBuiltAtComponentID)
    );
    LastClaimedAtComponent lastClaimedAtComponent = LastClaimedAtComponent(
      getAddressById(components, LastClaimedAtComponentID)
    );

    // Check there isn't another tile there
    uint256[] memory entitiesAtPosition = positionComponent.getEntitiesWithValue(coord);
    require(entitiesAtPosition.length == 0, "can not build at non-empty coord");

    // Build resource component (add more when needed)
    IronResourceComponent ironResourceComponent = IronResourceComponent(
      getAddressById(components, IronResourceComponentID)
    );

    // Check if the player has enough resources to build
    // debug buildings are free: MainBaseID, ConveyerID, MinerID, LithiumMinerID, BulletFactoryID, SiloID
    if (
      blockType == MainBaseID ||
      blockType == ConveyerID ||
      blockType == MinerID ||
      blockType == LithiumMinerID ||
      blockType == BulletFactoryID ||
      blockType == SiloID
    ) {
      // do nothing
    } else if (blockType == BasicMinerID) {
      LibBuild.buildBasicMiner(ironResourceComponent, addressToEntity(msg.sender));
    } else {
      revert("unknown block type");
    }

    // Randomly generate IDs instead of basing on coordinate
    uint256 blockEntity = world.getUniqueEntityId();
    positionComponent.set(blockEntity, coord);
    tileComponent.set(blockEntity, blockType);
    ownedByComponent.set(blockEntity, addressToEntity(msg.sender));
    lastBuiltAtComponent.set(blockEntity, block.number);
    lastClaimedAtComponent.set(blockEntity, block.number);

    return abi.encode(blockEntity);
  }

  function executeTyped(uint256 blockType, Coord memory coord) public returns (bytes memory) {
    return execute(abi.encode(blockType, coord));
  }
}
