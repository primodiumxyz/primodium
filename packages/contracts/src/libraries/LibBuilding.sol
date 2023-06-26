// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
// Production Buildings
import { MainBaseID, SiloID, BulletFactoryID, DebugPlatingFactoryID, MinerID } from "../prototypes/Tiles.sol";

import { BasicMinerID, PlatingFactoryID, BasicBatteryFactoryID, KineticMissileFactoryID, ProjectileLauncherID, HardenedDrillID, DenseMetalRefineryID, AdvancedBatteryFactoryID, HighTempFoundryID, PrecisionMachineryFactoryID, IridiumDrillbitFactoryID, PrecisionPneumaticDrillID, PenetratorFactoryID, PenetratingMissileFactoryID, MissileLaunchComplexID, HighEnergyLaserFactoryID, ThermobaricWarheadFactoryID, ThermobaricMissileFactoryID, KimberliteCatalystFactoryID } from "../prototypes/Tiles.sol";

import { LibDebug } from "libraries/LibDebug.sol";
import { LibMath } from "libraries/LibMath.sol";

import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { entityToAddress } from "solecs/utils.sol";

library LibBuilding {
  function checkBuildLimitConditionForBuildingId(
    BoolComponent ignoreBuildLimitComponent,
    Uint256Component buildingLimitComponent,
    Uint256Component buildingComponent,
    uint256 playerEntity,
    uint256 buildingId
  ) internal view returns (bool) {
    return
      !doesTileCountTowardsBuildingLimit(ignoreBuildLimitComponent, buildingId) ||
      checkBuildingCountNotExceedBuildLimit(buildingLimitComponent, buildingComponent, playerEntity);
  }

  function checkBuildingCountNotExceedBuildLimit(
    Uint256Component buildingLimitComponent,
    Uint256Component buildingComponent,
    uint256 playerEntity
  ) internal view returns (bool) {
    uint256 mainBuildingLevel = getMainBuildingLevelforPlayer(buildingComponent, playerEntity);
    uint256 buildCountLimit = getBuildCountLimit(buildingLimitComponent, mainBuildingLevel);
    uint256 buildingCount = getNumberOfBuildingsForPlayer(buildingLimitComponent, playerEntity);
    return buildingCount < buildCountLimit;
  }

  function getMainBuildingLevelforPlayer(
    Uint256Component buildingComponent,
    uint256 playerEntity
  ) internal view returns (uint256) {
    return buildingComponent.has(playerEntity) ? buildingComponent.getValue(playerEntity) : 0;
  }

  function getNumberOfBuildingsForPlayer(
    Uint256Component buildingLimitComponent,
    uint256 playerEntity
  ) internal view returns (uint256) {
    return LibMath.getSafeUint256Value(buildingLimitComponent, playerEntity);
  }

  function getBuildCountLimit(
    Uint256Component buildingLimitComponent,
    uint256 mainBuildingLevel
  ) internal view returns (uint256) {
    if (LibDebug.isDebug()) return 100;
    else if (buildingLimitComponent.has(mainBuildingLevel)) return buildingLimitComponent.getValue(mainBuildingLevel);
    else revert("Invalid Main Building Level");
  }

  function isMainBase(uint256 tileId) internal pure returns (bool) {
    return tileId == MainBaseID;
  }

  function doesTileCountTowardsBuildingLimit(
    BoolComponent ignoreBuildLimitComponent,
    uint256 tileId
  ) internal view returns (bool) {
    return !ignoreBuildLimitComponent.has(tileId) || !ignoreBuildLimitComponent.getValue(tileId);
  }
}
