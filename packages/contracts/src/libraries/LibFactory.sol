// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { ProductionComponent, ID as ProductionComponentID, ProductionData } from "../components/ProductionComponent.sol";
import { MineProductionComponent, ID as MineProductionComponentID } from "../components/MineProductionComponent.sol";
import { LibEncode } from "./LibEncode.sol";
import { LibMath } from "./LibMath.sol";
import { LibResourceProduction } from "./LibResourceProduction.sol";

library LibFactory {
  //checks all required conditions for a factory to be functional and updates factory is functional status

  function updateResourceProductionOnActiveChange(
    IWorld world,
    uint256 playerEntity,
    uint256 factoryLevelEntity,
    bool isFunctional
  ) internal {
    MineProductionComponent mineProductionComponent = MineProductionComponent(
      world.getComponent(MineProductionComponentID)
    );
    ProductionComponent productionComponent = ProductionComponent(world.getComponent(ProductionComponentID));
    ProductionData memory productionData = productionComponent.getValue(factoryLevelEntity);
    uint256 playerResourceEntity = LibEncode.hashKeyEntity(productionData.ResourceID, playerEntity);
    uint32 newResourceProductionRate = isFunctional
      ? LibMath.getSafeUint32Value(mineProductionComponent, playerResourceEntity) +
        productionData.ResourceProductionRate
      : LibMath.getSafeUint32Value(mineProductionComponent, playerResourceEntity) -
        productionData.ResourceProductionRate;
    LibResourceProduction.updateResourceProduction(world, playerResourceEntity, newResourceProductionRate);
  }
}
