// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
// Production Buildings
import { BulletFactoryID, PlatingFactoryID, BasicBatteryFactoryID, KineticMissileFactoryID, ProjectileLauncherID, HardenedDrillID, DenseMetalRefineryID, AdvancedBatteryFactoryID, HighTempFoundryID, PrecisionMachineryFactoryID, IridiumDrillbitFactoryID, PrecisionPneumaticDrillID, PenetratorFactoryID, PenetratingMissileFactoryID, MissileLaunchComplexID, HighEnergyLaserFactoryID, ThermobaricWarheadFactoryID, ThermobaricMissileFactoryID, KimberliteCatalystFactoryID } from "../prototypes/Tiles.sol";

library LibClaim {
  function isClaimableFactory(uint256 tileId) internal pure returns (bool) {
    return
      tileId == BulletFactoryID ||
      tileId == BasicBatteryFactoryID ||
      tileId == KineticMissileFactoryID ||
      tileId == ProjectileLauncherID ||
      tileId == HardenedDrillID ||
      tileId == DenseMetalRefineryID ||
      tileId == AdvancedBatteryFactoryID ||
      tileId == HighTempFoundryID ||
      tileId == PrecisionMachineryFactoryID ||
      tileId == IridiumDrillbitFactoryID ||
      tileId == PrecisionPneumaticDrillID ||
      tileId == PenetratorFactoryID ||
      tileId == PenetratingMissileFactoryID ||
      tileId == MissileLaunchComplexID ||
      tileId == HighEnergyLaserFactoryID ||
      tileId == ThermobaricWarheadFactoryID ||
      tileId == ThermobaricMissileFactoryID ||
      tileId == KimberliteCatalystFactoryID;
  }
}
