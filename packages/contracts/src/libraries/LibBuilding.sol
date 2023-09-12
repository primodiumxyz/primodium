// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// tables
import { P_Asteroid, P_AsteroidData, Spawned, DimensionsData, Dimensions, PositionData, P_RequiredTile, Level, BuildingType, Position, LastClaimedAt, Children, OwnedBy, P_Blueprint, Children } from "codegen/Tables.sol";

// libraries
import { LibEncode } from "libraries/LibEncode.sol";

// types
import { BuildingKey, BuildingTileKey, ExpansionKey } from "src/Keys.sol";
import { Bounds } from "src/PrimodiumTypes.sol";
import { EBuilding } from "codegen/Types.sol";

library LibBuilding {
  function canBuildOnTile(EBuilding buildingType, PositionData memory coord)
    internal
    view
    returns (bool)
  {
    return true;
    // P_RequiredTile.get(buildingType) == LibTerrain.getResourceByPositionData(world, coord);
  }

  function build(
    bytes32 playerEntity,
    EBuilding buildingType,
    PositionData memory coord
  ) internal {
    bytes32 buildingEntity = LibEncode.getHash(BuildingKey, coord);
    uint32 level = 1;

    Spawned.set(buildingEntity, true);
    BuildingType.set(buildingEntity, uint8(buildingType));
    Level.set(buildingEntity, level);
    Position.set(buildingEntity, coord);
    LastClaimedAt.set(buildingEntity, block.number);

    placeBuildingTiles(playerEntity, buildingEntity, buildingType, coord);
    OwnedBy.set(buildingEntity, playerEntity);
  }

  function placeBuildingTiles(
    bytes32 playerEntity,
    bytes32 buildingEntity,
    EBuilding buildingType,
    PositionData memory position
  ) public returns (bytes memory) {
    int32[] memory blueprint = P_Blueprint.get(uint8(buildingType));
    Bounds memory bounds = getPlayerBounds(playerEntity);

    bytes32[] memory tiles = new bytes32[](blueprint.length / 2);
    for (uint32 i = 0; i < blueprint.length; i += 2) {
      PositionData memory relativeCoord = PositionData(
        blueprint[i],
        blueprint[i + 1],
        0
      );
      PositionData memory absoluteCoord = PositionData(
        position.x + relativeCoord.x,
        position.y + relativeCoord.y,
        position.parent
      );
      tiles[i / 2] = placeBuildingTile(buildingEntity, bounds, absoluteCoord);
    }
    Children.set(buildingEntity, tiles);
  }

  function placeBuildingTile(
    bytes32 buildingEntity,
    Bounds memory bounds,
    PositionData memory coord
  ) private returns (bytes32 tileEntity) {
    tileEntity = LibEncode.getHash(BuildingTileKey, coord);
    require(
      OwnedBy.get(tileEntity) == 0,
      "[BuildSystem] Cannot build tile on a non-empty coordinate"
    );
    require(
      bounds.minX <= coord.x &&
        bounds.minY <= coord.y &&
        bounds.maxX >= coord.x &&
        bounds.maxY >= coord.y,
      "[BuildSystem] Building out of bounds"
    );
    OwnedBy.set(tileEntity, buildingEntity);
    Position.set(tileEntity, coord);
  }

  function getPlayerBounds(bytes32 playerEntity)
    internal
    view
    returns (Bounds memory bounds)
  {
    uint32 playerLevel = Level.get(playerEntity);
    P_AsteroidData memory asteroidDims = P_Asteroid.get();
    DimensionsData memory range = Dimensions.get(ExpansionKey, playerLevel);
    return
      Bounds({
        maxX: (asteroidDims.xBounds + range.x) / 2 - 1,
        maxY: (asteroidDims.yBounds + range.y) / 2 - 1,
        minX: (asteroidDims.xBounds - range.x) / 2,
        minY: (asteroidDims.yBounds - range.y) / 2
      });
  }
}
