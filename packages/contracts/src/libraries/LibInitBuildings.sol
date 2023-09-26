// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
// Production Buildings
import { P_BuildingDefenceComponent, ID as P_BuildingDefenceComponentID } from "components/P_BuildingDefenceComponent.sol";
import { P_RequiredResearchComponent, ID as P_RequiredResearchComponentID } from "components/P_RequiredResearchComponent.sol";
import { P_RequiredTileComponent, ID as P_RequiredTileComponentID } from "components/P_RequiredTileComponent.sol";
import { P_BlueprintComponent, ID as P_BlueprintComponentID } from "components/P_BlueprintComponent.sol";
import { P_ProductionComponent, ID as P_ProductionComponentID } from "components/P_ProductionComponent.sol";
import { P_UtilityProductionComponent, ID as P_UtilityProductionComponentID, ResourceValue } from "components/P_UtilityProductionComponent.sol";
import { P_RequiredUtilityComponent, ID as P_RequiredUtilityComponentID } from "components/P_RequiredUtilityComponent.sol";
import { P_MaxLevelComponent, ID as P_MaxLevelComponentID } from "components/P_MaxLevelComponent.sol";
import { P_MaxMovesComponent, ID as P_MaxMovesComponentID } from "components/P_MaxMovesComponent.sol";
import { P_MaxStorageComponent, ID as P_MaxStorageComponentID } from "components/P_MaxStorageComponent.sol";
import { P_ProductionDependenciesComponent, ID as P_ProductionDependenciesComponentID } from "components/P_ProductionDependenciesComponent.sol";
import { P_IsBuildingTypeComponent, ID as P_IsBuildingTypeComponentID } from "components/P_IsBuildingTypeComponent.sol";
import { P_IsUnitComponent, ID as P_IsUnitComponentID } from "components/P_IsUnitComponent.sol";
import { P_UnitProductionMultiplierComponent, ID as P_UnitProductionMultiplierComponentID } from "components/P_UnitProductionMultiplierComponent.sol";
import { P_UnitProductionTypesComponent, ID as P_UnitProductionTypesComponentID } from "components/P_UnitProductionTypesComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibSetBuildingReqs } from "../libraries/LibSetBuildingReqs.sol";
import { LibBlueprint } from "../libraries/LibBlueprint.sol";

import "../prototypes.sol";
import { ResourceValue, ResourceValues } from "../types.sol";

uint32 constant NONE = 0;

library LibInitBuildings {
  function init(IWorld world) internal {
    // main base
    initMainBase(world);

    // mines
    initIronMine(world);
    initCopperMine(world);
    initLithiumMine(world);
    initSulfurMine(world);

    // factories
    initIronPlateFactory(world);
    initAlloyFactory(world);
    initPhotovoltaicCellFactory(world);

    // special
    initStorageUnit(world);
    initSolarPanel(world);
    initGarage(world);
    initHangar(world);
    initDroneFactory(world);
    initAdvancedDroneFactory(world);
    initStarmapper(world);
  }

  function initMainBase(IWorld world) internal {
    uint256 entity = MainBaseID;
    uint32 maxLevel = 8;

    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(entity);
    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);

    // LEVEL 1
    ResourceValue[] memory resourceValues = new ResourceValue[](0);
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronPlateCraftedItemID, value: 60000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 100000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 120000 });
    resourceValues[1] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 60000 });
    requiredResources[2] = resourceValues;
    //LEVEL 4
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: AlloyCraftedItemID, value: 100000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: TitaniumResourceItemID, value: 80000 });
    requiredResources[4] = resourceValues;
    // LEVEL 6
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: PlatinumResourceItemID, value: 250000 });
    requiredResources[5] = resourceValues;

    //LEVEL 7
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IridiumResourceItemID, value: 420000 });
    requiredResources[6] = resourceValues;

    //LEVEL 8
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: KimberliteResourceItemID, value: 590000 });
    requiredResources[7] = resourceValues;

    /****************** Vessel Utility Upgrades *******************/
    uint32[] memory vesselProduction = new uint32[](maxLevel);

    // LEVEL 1
    vesselProduction[0] = 1;

    // LEVEL 2
    vesselProduction[1] = 1;

    // LEVEL 3
    vesselProduction[2] = 1;

    // LEVEL 4
    vesselProduction[3] = 1;

    // LEVEL 5
    vesselProduction[4] = 1;

    // LEVEL 6
    vesselProduction[5] = 1;

    // LEVEL 7
    vesselProduction[6] = 1;

    // LEVEL 8
    vesselProduction[7] = 1;

    /****************** Max Move *******************/
    uint32[] memory maxMoves = new uint32[](maxLevel);

    // LEVEL 1
    maxMoves[0] = 1;

    // LEVEL 2
    maxMoves[1] = 1;

    // LEVEL 3
    maxMoves[2] = 1;

    // LEVEL 4
    maxMoves[3] = 1;

    // LEVEL 5
    maxMoves[4] = 1;

    // LEVEL 6
    maxMoves[5] = 1;

    // LEVEL 7
    maxMoves[6] = 1;

    // LEVEL 8
    maxMoves[7] = 1;

    /****************** Storage Upgrades *******************/
    ResourceValue[][] memory storageUpgrades = new ResourceValue[][](maxLevel);
    // LEVEL 1
    resourceValues = new ResourceValue[](3);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 175000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 135000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 100000 });
    storageUpgrades[0] = resourceValues;

    // LEVEL 2
    resourceValues = new ResourceValue[](6);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 540000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 270000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 170000 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 100000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 144000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 27000 });
    storageUpgrades[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](7);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 1440000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 720000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 250000 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 288000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 144000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 50000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 72000 });
    storageUpgrades[2] = resourceValues;

    // LEVEL 4
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 3600000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1800000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 288000 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 720000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 360000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 108000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 180000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 100000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 40000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 25000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 10000 });
    storageUpgrades[3] = resourceValues;

    // LEVEL 5
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 5760000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 2880000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 460800 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 1152000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 576000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 300000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 300000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 300000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 300000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 200000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 100000 });
    storageUpgrades[4] = resourceValues;
    // LEVEL 6
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 8640000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 4320000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 691200 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 1728000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 864000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 600000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 600000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 600000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 600000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 600000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 250000 });
    storageUpgrades[5] = resourceValues;

    // LEVEL 7
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 17280000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 8640000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 1382000 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 3456000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 1728000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 700000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 864000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 700000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 700000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 700000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 700000 });
    storageUpgrades[6] = resourceValues;

    //LEVEL 8
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 34560000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 17280000 });
    resourceValues[2] = ResourceValue({ resource: IronPlateCraftedItemID, value: 2764000 });
    resourceValues[3] = ResourceValue({ resource: LithiumResourceItemID, value: 6912000 });
    resourceValues[4] = ResourceValue({ resource: SulfurResourceItemID, value: 3456000 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 1036800 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 1728000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 800000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 800000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 800000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 800000 });
    storageUpgrades[7] = resourceValues;

    /* ***********************Set Values ************************* */
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(entity, maxLevel);
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(entity, LibBlueprint.get3x3Blueprint());

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(entity, level);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
      LibSetBuildingReqs.setStorageUpgrades(world, buildingLevelEntity, storageUpgrades[i]);
      P_UtilityProductionComponent(world.getComponent(P_UtilityProductionComponentID)).set(
        buildingLevelEntity,
        ResourceValue(VesselUtilityResourceID, vesselProduction[i])
      );
      P_MaxMovesComponent(world.getComponent(P_MaxMovesComponentID)).set(buildingLevelEntity, maxMoves[i]);
    }
  }

  function setupMine(
    IWorld world,
    uint256 mineBuildingType,
    uint32 maxLevel,
    uint32[] memory requiredMainBaseLevels,
    ResourceValue[][] memory requiredResources,
    ResourceValues[] memory requiredUtilities,
    uint256 productionResourceType,
    uint32[] memory productionRates
  ) internal {
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(mineBuildingType);
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(mineBuildingType, maxLevel);
    P_RequiredTileComponent(world.getComponent(P_RequiredTileComponentID)).set(
      mineBuildingType,
      productionResourceType
    );
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      mineBuildingType,
      LibBlueprint.get1x1Blueprint()
    );

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(mineBuildingType, level);
      P_ProductionComponent(world.getComponent(P_ProductionComponentID)).set(
        buildingLevelEntity,
        ResourceValue({ resource: productionResourceType, value: productionRates[i] })
      );
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  /******************************** Mines ********************************** */

  function initIronMine(IWorld world) internal {
    uint256 mineBuildingType = IronMineID;
    uint32 maxLevel = 5;
    uint256 productionResourceType = IronResourceItemID;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 1;
    requiredMainBaseLevels[1] = 1;
    requiredMainBaseLevels[2] = 2;
    requiredMainBaseLevels[3] = 4;
    requiredMainBaseLevels[4] = 6;

    /****************** Production Rates *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);
    productionRates[0] = 50;
    productionRates[1] = 65;
    productionRates[2] = 80;
    productionRates[3] = 95;
    productionRates[4] = 110;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    // LEVEL 1
    ResourceValue[] memory resourceValues = new ResourceValue[](0);
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 50000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 500000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 3000000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 10000000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* ***********************Set Values ************************* */
    setupMine(
      world,
      mineBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function initCopperMine(IWorld world) internal {
    uint256 mineBuildingType = CopperMineID;
    uint256 productionResourceType = CopperResourceItemID;
    uint32 maxLevel = 5;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 1;
    requiredMainBaseLevels[1] = 2;
    requiredMainBaseLevels[2] = 4;
    requiredMainBaseLevels[3] = 6;
    requiredMainBaseLevels[4] = 8;

    /****************** Production Rates *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    productionRates[0] = 30;
    productionRates[1] = 40;
    productionRates[2] = 50;
    productionRates[3] = 60;
    productionRates[4] = 70;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    // LEVEL 1
    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 3500 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 50000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 15000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 1500000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 500000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1500000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 10000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 5000000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);
    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* ***********************Set Values ************************* */
    setupMine(
      world,
      mineBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function initLithiumMine(IWorld world) internal {
    uint256 mineBuildingType = LithiumMineID;
    uint256 productionResourceType = LithiumResourceItemID;
    uint32 maxLevel = 5;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 4;
    requiredMainBaseLevels[2] = 6;
    requiredMainBaseLevels[3] = 7;
    requiredMainBaseLevels[4] = 8;

    /****************** Production Rates *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);
    productionRates[0] = 20;
    productionRates[1] = 25;
    productionRates[2] = 30;
    productionRates[3] = 35;
    productionRates[4] = 40;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;
    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 2000000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 5000000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 7500000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 12500000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* ***********************Set Values ************************* */
    setupMine(
      world,
      mineBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function initSulfurMine(IWorld world) internal {
    uint256 mineBuildingType = SulfurMineID;
    uint256 productionResourceType = SulfurResourceItemID;
    uint32 maxLevel = 5;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 4;
    requiredMainBaseLevels[2] = 6;
    requiredMainBaseLevels[3] = 7;
    requiredMainBaseLevels[4] = 8;

    /****************** Production Rates *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);
    productionRates[0] = 10;
    productionRates[1] = 12;
    productionRates[2] = 15;
    productionRates[3] = 17;
    productionRates[4] = 20;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;
    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 250000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 1000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 150000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 2500000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 500000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1500000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 10000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 5000000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 50;

    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 75;
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 125;
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 150;
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* ***********************Set Values ************************* */
    setupMine(
      world,
      mineBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  /****************************** Factories ******************************** */

  function setupFactory(
    IWorld world,
    uint256 factoryBuildingType,
    uint32 maxLevel,
    uint32[] memory requiredMainBaseLevels,
    ResourceValue[][] memory requiredResources,
    ResourceValues[] memory requiredUtilities,
    ResourceValues[] memory requiredConnectedProductions,
    uint256 productionResourceType,
    uint32[] memory productionRates
  ) internal {
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(factoryBuildingType);
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(factoryBuildingType, maxLevel);

    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      factoryBuildingType,
      LibBlueprint.get2x2Blueprint()
    );

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(factoryBuildingType, level);
      P_ProductionComponent(world.getComponent(P_ProductionComponentID)).set(
        buildingLevelEntity,
        ResourceValue({ resource: productionResourceType, value: productionRates[i] })
      );
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      P_ProductionDependenciesComponent(world.getComponent(P_ProductionDependenciesComponentID)).set(
        buildingLevelEntity,
        requiredConnectedProductions[i]
      );
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  function initIronPlateFactory(IWorld world) internal {
    uint256 factoryBuildingType = IronPlateFactoryID;
    uint32 maxLevel = 5;
    uint256 productionResourceType = IronPlateCraftedItemID;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 1;
    requiredMainBaseLevels[1] = 2;
    requiredMainBaseLevels[2] = 3;
    requiredMainBaseLevels[3] = 4;
    requiredMainBaseLevels[4] = 5;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 45000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 10000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 200000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 75000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 2500000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 15000000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 7500000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 25000000 });
    resourceValues[1] = ResourceValue({ resource: TitaniumResourceItemID, value: 10000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory allRequiredUtilities = new ResourceValues[](maxLevel);
    ResourceValues memory requiredUtilities;
    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[0] = requiredUtilities;

    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[1] = requiredUtilities;
    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[2] = requiredUtilities;
    // LEVEL 4
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[3] = requiredUtilities;
    // LEVEL 5
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[4] = requiredUtilities;

    /****************** Required Mines *******************/
    ResourceValues[] memory allRequiredConnectedProductions = new ResourceValues[](maxLevel);
    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 35;
    allRequiredConnectedProductions[0] = requiredUtilities;
    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 45;
    allRequiredConnectedProductions[1] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 55;
    allRequiredConnectedProductions[2] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 65;
    allRequiredConnectedProductions[3] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 75;
    allRequiredConnectedProductions[4] = requiredUtilities;

    /****************** Factory Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 8;
    // LEVEL 2
    productionRates[1] = 12;
    // LEVEL 3
    productionRates[2] = 15;
    // LEVEL 4
    productionRates[3] = 17;
    // LEVEL 5
    productionRates[4] = 20;

    /* ***********************Set Values ************************* */
    setupFactory(
      world,
      factoryBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      allRequiredUtilities,
      allRequiredConnectedProductions,
      productionResourceType,
      productionRates
    );
  }

  function initAlloyFactory(IWorld world) internal {
    uint256 factoryBuildingType = AlloyFactoryID;
    uint32 maxLevel = 3;
    uint256 productionResourceType = AlloyCraftedItemID;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 3;
    requiredMainBaseLevels[1] = 6;
    requiredMainBaseLevels[2] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 50000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 250000 });
    requiredResources[1] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 12500000 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 1000000 });
    requiredResources[2] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory allRequiredUtilities = new ResourceValues[](maxLevel);
    ResourceValues memory requiredUtilities;
    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = ElectricityUtilityResourceID;
    requiredUtilities.values[0] = 100;
    allRequiredUtilities[0] = requiredUtilities;

    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = ElectricityUtilityResourceID;
    requiredUtilities.values[0] = 120;
    allRequiredUtilities[1] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](1), new uint32[](1));
    requiredUtilities.resources[0] = ElectricityUtilityResourceID;
    requiredUtilities.values[0] = 150;
    allRequiredUtilities[2] = requiredUtilities;

    /****************** Required Mines *******************/
    ResourceValues[] memory allRequiredConnectedProductions = new ResourceValues[](maxLevel);

    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 35;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 20;
    allRequiredConnectedProductions[0] = requiredUtilities;
    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 50;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 30;
    allRequiredConnectedProductions[1] = requiredUtilities;
    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = IronResourceItemID;
    requiredUtilities.values[0] = 60;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 35;
    allRequiredConnectedProductions[2] = requiredUtilities;

    /****************** Factory Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 5;
    // LEVEL 2
    productionRates[1] = 7;
    // LEVEL 3
    productionRates[2] = 9;

    /* ***********************Set Values ************************* */
    setupFactory(
      world,
      factoryBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      allRequiredUtilities,
      allRequiredConnectedProductions,
      productionResourceType,
      productionRates
    );
  }

  // lithium copper oxide
  function initPhotovoltaicCellFactory(IWorld world) internal {
    uint256 factoryBuildingType = PhotovoltaicCellFactoryID;
    uint32 maxLevel = 3;
    uint256 productionResourceType = PhotovoltaicCellCraftedItemID;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 5;
    requiredMainBaseLevels[2] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 150000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 20000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 350000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 250000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 7500000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 1000000 });
    requiredResources[2] = resourceValues;
    /****************** Required Utility Resources *******************/

    ResourceValues[] memory allRequiredUtilities = new ResourceValues[](maxLevel);
    ResourceValues memory requiredUtilities;
    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[0] = requiredUtilities;

    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[1] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](0), new uint32[](0));
    allRequiredUtilities[2] = requiredUtilities;

    /****************** Required Mines *******************/
    ResourceValues[] memory allRequiredConnectedProductions = new ResourceValues[](maxLevel);
    // LEVEL 1
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = LithiumResourceItemID;
    requiredUtilities.values[0] = 10;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 20;
    allRequiredConnectedProductions[0] = requiredUtilities;
    // LEVEL 2
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = LithiumResourceItemID;
    requiredUtilities.values[0] = 20;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 30;
    allRequiredConnectedProductions[1] = requiredUtilities;

    // LEVEL 3
    requiredUtilities = ResourceValues(new uint256[](2), new uint32[](2));
    requiredUtilities.resources[0] = LithiumResourceItemID;
    requiredUtilities.values[0] = 25;
    requiredUtilities.resources[1] = CopperResourceItemID;
    requiredUtilities.values[1] = 35;
    allRequiredConnectedProductions[2] = requiredUtilities;

    /****************** Factory Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 5;
    // LEVEL 2
    productionRates[1] = 7;
    // LEVEL 3
    productionRates[2] = 9;

    /* ***********************Set Values ************************* */
    setupFactory(
      world,
      factoryBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      allRequiredUtilities,
      allRequiredConnectedProductions,
      productionResourceType,
      productionRates
    );
  }

  /************************ Special Buildings ******************************** */
  function initStorageUnit(IWorld world) internal {
    uint256 entity = StorageUnitID;
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(entity);
    uint32 maxLevel = 4;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 4;
    requiredMainBaseLevels[2] = 6;
    requiredMainBaseLevels[3] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;
    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 500000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 1000000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1000000 });
    requiredResources[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: TitaniumResourceItemID, value: 10000 });
    requiredResources[2] = resourceValues;

    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: TitaniumResourceItemID, value: 50000 });
    resourceValues[1] = ResourceValue({ resource: KimberliteResourceItemID, value: 20000 });
    requiredResources[3] = resourceValues;

    /****************** Storage Updates *******************/
    ResourceValue[][] memory storageUpgrades = new ResourceValue[][](maxLevel);

    resourceValues = new ResourceValue[](6);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 90000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 45000 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 18000 });
    resourceValues[3] = ResourceValue({ resource: SulfurResourceItemID, value: 18000 });
    resourceValues[4] = ResourceValue({ resource: IronPlateCraftedItemID, value: 7200 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 4500 });
    storageUpgrades[0] = resourceValues;

    // LEVEL 2
    resourceValues = new ResourceValue[](9);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 360000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 180000 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 72000 });
    resourceValues[3] = ResourceValue({ resource: SulfurResourceItemID, value: 36000 });
    resourceValues[4] = ResourceValue({ resource: IronPlateCraftedItemID, value: 28800 });
    resourceValues[5] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 18000 });
    resourceValues[6] = ResourceValue({ resource: AlloyCraftedItemID, value: 10800 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 10000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 10000 });
    storageUpgrades[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 720000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 360000 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 144000 });
    resourceValues[3] = ResourceValue({ resource: SulfurResourceItemID, value: 72000 });
    resourceValues[4] = ResourceValue({ resource: IronPlateCraftedItemID, value: 57600 });
    resourceValues[5] = ResourceValue({ resource: AlloyCraftedItemID, value: 36000 });
    resourceValues[6] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 21600 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 20000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 20000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 20000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 20000 });
    storageUpgrades[2] = resourceValues;

    // LEVEL 4
    resourceValues = new ResourceValue[](11);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 1500000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 720000 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 244000 });
    resourceValues[3] = ResourceValue({ resource: SulfurResourceItemID, value: 150000 });
    resourceValues[4] = ResourceValue({ resource: IronPlateCraftedItemID, value: 100000 });
    resourceValues[5] = ResourceValue({ resource: AlloyCraftedItemID, value: 75000 });
    resourceValues[6] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 50000 });
    resourceValues[7] = ResourceValue({ resource: TitaniumResourceItemID, value: 50000 });
    resourceValues[8] = ResourceValue({ resource: PlatinumResourceItemID, value: 50000 });
    resourceValues[9] = ResourceValue({ resource: IridiumResourceItemID, value: 50000 });
    resourceValues[10] = ResourceValue({ resource: KimberliteResourceItemID, value: 50000 });
    storageUpgrades[3] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 50;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* ***********************Set Values ************************* */
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(entity, maxLevel);
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(entity, LibBlueprint.get2x2Blueprint());
    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(entity, level);
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
      LibSetBuildingReqs.setStorageUpgrades(world, buildingLevelEntity, storageUpgrades[i]);
    }
  }

  function setupUtilityBuilding(
    IWorld world,
    uint256 utilityBuildingType,
    uint32 maxLevel,
    uint32[] memory requiredMainBaseLevels,
    ResourceValue[][] memory requiredResources,
    ResourceValues[] memory requiredUtilities,
    uint256 productionResourceType,
    uint32[] memory productionRates
  ) internal {
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(utilityBuildingType);
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(utilityBuildingType, maxLevel);

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(utilityBuildingType, level);
      P_UtilityProductionComponent(world.getComponent(P_UtilityProductionComponentID)).set(
        buildingLevelEntity,
        ResourceValue({ resource: productionResourceType, value: productionRates[i] })
      );
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  function initSolarPanel(IWorld world) internal {
    uint256 utilityBuildingType = SolarPanelID;
    uint32 maxLevel = 3;
    uint256 productionResourceType = ElectricityUtilityResourceID;
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      utilityBuildingType,
      LibBlueprint.get2x2Blueprint()
    );
    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 4;
    requiredMainBaseLevels[2] = 6;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 2000 });
    resourceValues[1] = ResourceValue({ resource: IronResourceItemID, value: 40000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 400000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 500000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: PhotovoltaicCellCraftedItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1500000 });
    requiredResources[2] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /****************** Utility Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 300;
    // LEVEL 2
    productionRates[1] = 600;
    // LEVEL 3
    productionRates[2] = 800;

    /* ***********************Set Values ************************* */
    setupUtilityBuilding(
      world,
      utilityBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function initGarage(IWorld world) internal {
    uint256 utilityBuildingType = GarageID;
    uint32 maxLevel = 5;
    uint256 productionResourceType = HousingUtilityResourceID;
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      utilityBuildingType,
      LibBlueprint.get2x2Blueprint()
    );
    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 1;
    requiredMainBaseLevels[1] = 2;
    requiredMainBaseLevels[2] = 3;
    requiredMainBaseLevels[3] = 4;
    requiredMainBaseLevels[4] = 5;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 20000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 5000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 175000 });
    requiredResources[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 15000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 300000 });
    requiredResources[2] = resourceValues;

    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 150000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1000000 });
    requiredResources[3] = resourceValues;

    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: TitaniumResourceItemID, value: 15000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /****************** Utility Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 20;
    // LEVEL 2
    productionRates[1] = 30;
    // LEVEL 3
    productionRates[2] = 40;
    // LEVEL 4
    productionRates[3] = 50;
    // LEVEL 5
    productionRates[4] = 60;

    /* ***********************Set Values ************************* */
    setupUtilityBuilding(
      world,
      utilityBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function initHangar(IWorld world) internal {
    uint256 utilityBuildingType = HangarID;
    uint32 maxLevel = 5;
    uint256 productionResourceType = HousingUtilityResourceID;
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      utilityBuildingType,
      LibBlueprint.get4x4Blueprint()
    );
    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 3;
    requiredMainBaseLevels[1] = 4;
    requiredMainBaseLevels[2] = 6;
    requiredMainBaseLevels[3] = 7;
    requiredMainBaseLevels[4] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: LithiumResourceItemID, value: 150000 });
    resourceValues[1] = ResourceValue({ resource: IronResourceItemID, value: 500000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 50000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 1750000 });
    requiredResources[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 150000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 3000000 });
    requiredResources[2] = resourceValues;

    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: PlatinumResourceItemID, value: 50000 });
    requiredResources[3] = resourceValues;

    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 1000000 });
    resourceValues[1] = ResourceValue({ resource: KimberliteResourceItemID, value: 25000 });
    requiredResources[4] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 200;
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 300;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 400;
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 500;
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /****************** Utility Production *******************/
    uint32[] memory productionRates = new uint32[](maxLevel);

    // LEVEL 1
    productionRates[0] = 100;
    // LEVEL 2
    productionRates[1] = 250;
    // LEVEL 3
    productionRates[2] = 350;
    // LEVEL 4
    productionRates[3] = 500;
    // LEVEL 5
    productionRates[4] = 600;

    /* ***********************Set Values ************************* */
    setupUtilityBuilding(
      world,
      utilityBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      productionResourceType,
      productionRates
    );
  }

  function setupUnitTrainingBuilding(
    IWorld world,
    uint256 uniTrainingBuildingType,
    uint32 maxLevel,
    uint32[] memory requiredMainBaseLevels,
    ResourceValue[][] memory requiredResources,
    ResourceValues[] memory requiredUtilities,
    uint256[][] memory unitTypes,
    uint32[] memory trainingSpeedMultipliers
  ) internal {
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(uniTrainingBuildingType);
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(uniTrainingBuildingType, maxLevel);

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(uniTrainingBuildingType, level);
      P_UnitProductionMultiplierComponent(world.getComponent(P_UnitProductionMultiplierComponentID)).set(
        buildingLevelEntity,
        trainingSpeedMultipliers[i]
      );

      P_UnitProductionTypesComponent(world.getComponent(P_UnitProductionTypesComponentID)).set(
        buildingLevelEntity,
        unitTypes[i]
      );
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  function initAdvancedDroneFactory(IWorld world) internal {
    uint256 unitTrainingBuildingType = AdvancedDroneFactoryID;
    uint32 maxLevel = 6;
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      unitTrainingBuildingType,
      LibBlueprint.get3x3Blueprint()
    );
    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 2;
    requiredMainBaseLevels[1] = 3;
    requiredMainBaseLevels[2] = 4;
    requiredMainBaseLevels[3] = 5;
    requiredMainBaseLevels[4] = 6;
    requiredMainBaseLevels[5] = 7;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: LithiumResourceItemID, value: 200000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 100000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: LithiumResourceItemID, value: 500000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 1500000 });
    resourceValues[1] = ResourceValue({ resource: PlatinumResourceItemID, value: 20000 });
    requiredResources[3] = resourceValues;
    // LEVEL 5
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 5000000 });
    resourceValues[1] = ResourceValue({ resource: IridiumResourceItemID, value: 20000 });
    requiredResources[4] = resourceValues;
    // LEVEL 6
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 275000 });
    resourceValues[1] = ResourceValue({ resource: KimberliteResourceItemID, value: 10000 });
    requiredResources[5] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 150;
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 200;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);
    // LEVEL 4
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 300;
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 5
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 400;
    requiredUtilities[4] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 6
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 500;
    requiredUtilities[5] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /****************** Unit Production Multipliers *******************/
    uint32[] memory productionSpeedMultipliers = new uint32[](maxLevel);

    // LEVEL 1
    productionSpeedMultipliers[0] = 100;
    // LEVEL 2
    productionSpeedMultipliers[1] = 100;
    // LEVEL 3
    productionSpeedMultipliers[2] = 100;
    // LEVEL 4
    productionSpeedMultipliers[3] = 120;
    // LEVEL 5
    productionSpeedMultipliers[4] = 150;
    // LEVEL 6
    productionSpeedMultipliers[5] = 180;

    /****************** Unit Types Production *******************/
    uint256[][] memory allUnitTypes = new uint256[][](maxLevel);
    uint256[] memory unitTypes;
    //Level 1
    unitTypes = new uint256[](2);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    allUnitTypes[0] = unitTypes;
    //Level 2
    unitTypes = new uint256[](3);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    unitTypes[2] = AegisDrone;
    allUnitTypes[1] = unitTypes;

    //Level 3
    unitTypes = new uint256[](4);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    unitTypes[2] = AegisDrone;
    unitTypes[3] = StingerDrone;
    allUnitTypes[2] = unitTypes;
    //Level 4
    unitTypes = new uint256[](4);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    unitTypes[2] = AegisDrone;
    unitTypes[3] = StingerDrone;
    allUnitTypes[3] = unitTypes;

    //Level 5
    unitTypes = new uint256[](4);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    unitTypes[2] = AegisDrone;
    unitTypes[3] = StingerDrone;
    allUnitTypes[4] = unitTypes;

    //Level 6
    unitTypes = new uint256[](4);
    unitTypes[0] = AnvilDrone;
    unitTypes[1] = HammerDrone;
    unitTypes[2] = AegisDrone;
    unitTypes[3] = StingerDrone;
    allUnitTypes[5] = unitTypes;

    /* ***********************Set Values ************************* */
    setupUnitTrainingBuilding(
      world,
      unitTrainingBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      allUnitTypes,
      productionSpeedMultipliers
    );
  }

  function initDroneFactory(IWorld world) internal {
    uint256 unitTrainingBuildingType = DroneFactoryID;
    uint32 maxLevel = 4;
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      unitTrainingBuildingType,
      LibBlueprint.get2x2Blueprint()
    );
    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 1;
    requiredMainBaseLevels[1] = 2;
    requiredMainBaseLevels[2] = 3;
    requiredMainBaseLevels[3] = 4;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues;

    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 25000 });
    requiredResources[0] = resourceValues;
    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 50000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 250000 });
    requiredResources[1] = resourceValues;
    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 500000 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 2000000 });
    requiredResources[2] = resourceValues;
    // LEVEL 4
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 2000000 });
    resourceValues[1] = ResourceValue({ resource: TitaniumResourceItemID, value: 10000 });
    requiredResources[3] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](0);
    utilityResourceAmounts = new uint32[](0);
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 50;
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 4
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);
    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 150;
    requiredUtilities[3] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /****************** Unit Production Multipliers *******************/
    uint32[] memory productionSpeedMultipliers = new uint32[](maxLevel);

    // LEVEL 1
    productionSpeedMultipliers[0] = 100;
    // LEVEL 2
    productionSpeedMultipliers[1] = 100;
    // LEVEL 3
    productionSpeedMultipliers[2] = 120;
    // LEVEL 4
    productionSpeedMultipliers[3] = 150;

    /****************** Unit Types Production *******************/
    uint256[][] memory allUnitTypes = new uint256[][](maxLevel);
    uint256[] memory unitTypes;
    //Level 1
    unitTypes = new uint256[](1);
    unitTypes[0] = MarineUnit;
    allUnitTypes[0] = unitTypes;
    //Level 2
    unitTypes = new uint256[](2);
    unitTypes[0] = MarineUnit;
    unitTypes[1] = AdvancedMarineUnit;
    allUnitTypes[1] = unitTypes;

    //Level 3
    unitTypes = new uint256[](2);
    unitTypes[0] = MarineUnit;
    unitTypes[1] = AdvancedMarineUnit;
    allUnitTypes[2] = unitTypes;
    //Level 4
    unitTypes = new uint256[](2);
    unitTypes[0] = MarineUnit;
    unitTypes[1] = AdvancedMarineUnit;
    allUnitTypes[3] = unitTypes;

    /* ***********************Set Values ************************* */
    setupUnitTrainingBuilding(
      world,
      unitTrainingBuildingType,
      maxLevel,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      allUnitTypes,
      productionSpeedMultipliers
    );
  }

  function initStarmapper(IWorld world) internal {
    uint256 entity = StarmapperID;
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(entity);
    uint32 maxLevel = 3;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 3;
    requiredMainBaseLevels[1] = 7;
    requiredMainBaseLevels[2] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 10000 });
    requiredResources[0] = resourceValues;

    // LEVEL 2
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 125000 });
    requiredResources[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 125000 });
    resourceValues[1] = ResourceValue({ resource: KimberliteResourceItemID, value: 10000 });
    requiredResources[2] = resourceValues;

    /* -------------------------------- Max Moves ------------------------------- */
    // note: each value here must be geq its predecessor (obviously).
    uint32[] memory maxMoves = new uint32[](maxLevel);
    // LEVEL 1
    maxMoves[0] = 1;
    // LEVEL 2
    maxMoves[1] = 2;
    // LEVEL 3
    maxMoves[2] = 3;

    /* ***********************Set Values ************************* */
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(entity, maxLevel);
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(entity, LibBlueprint.get3x2Blueprint());

    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(entity, level);

      P_MaxMovesComponent(world.getComponent(P_MaxMovesComponentID)).set(buildingLevelEntity, maxMoves[i]);
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  function setupDefenciveBuilding(
    IWorld world,
    uint32 maxLevel,
    uint256 defenciveBuildingType,
    uint32[] memory requiredMainBaseLevels,
    ResourceValue[][] memory requiredResources,
    ResourceValues[] memory requiredUtilities,
    uint32[] memory defenciveValues
  ) internal {
    P_IsBuildingTypeComponent(world.getComponent(P_IsBuildingTypeComponentID)).set(defenciveBuildingType);
    P_MaxLevelComponent(world.getComponent(P_MaxLevelComponentID)).set(defenciveBuildingType, maxLevel);
    P_BlueprintComponent(world.getComponent(P_BlueprintComponentID)).set(
      defenciveBuildingType,
      LibBlueprint.get3x2Blueprint()
    );
    for (uint256 i = 0; i < maxLevel; i++) {
      uint256 level = i + 1;
      uint256 buildingLevelEntity = LibEncode.hashKeyEntity(defenciveBuildingType, level);
      P_RequiredUtilityComponent(world.getComponent(P_RequiredUtilityComponentID)).set(
        buildingLevelEntity,
        requiredUtilities[i]
      );
      P_BuildingDefenceComponent(world.getComponent(P_BuildingDefenceComponentID)).set(
        buildingLevelEntity,
        defenciveValues[i]
      );
      LevelComponent(world.getComponent(LevelComponentID)).set(buildingLevelEntity, requiredMainBaseLevels[i]);
      LibSetBuildingReqs.setResourceReqs(world, buildingLevelEntity, requiredResources[i]);
    }
  }

  function initSAMMissiles(IWorld world) internal {
    uint256 entity = SAMMissilesID;
    uint32 maxLevel = 3;

    /****************** Required Main Base Levels *******************/
    uint32[] memory requiredMainBaseLevels = new uint32[](maxLevel);
    requiredMainBaseLevels[0] = 3;
    requiredMainBaseLevels[1] = 7;
    requiredMainBaseLevels[2] = 8;

    /****************** Required Resources *******************/
    ResourceValue[][] memory requiredResources = new ResourceValue[][](maxLevel);
    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    // LEVEL 1
    resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: TitaniumResourceItemID, value: 70000 });
    requiredResources[0] = resourceValues;

    // LEVEL 2
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 2500000 });
    resourceValues[1] = ResourceValue({ resource: PlatinumResourceItemID, value: 250000 });
    requiredResources[1] = resourceValues;

    // LEVEL 3
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: SulfurResourceItemID, value: 2500000 });
    resourceValues[1] = ResourceValue({ resource: IridiumResourceItemID, value: 10000 });
    requiredResources[2] = resourceValues;

    /****************** Required Utility Resources *******************/

    ResourceValues[] memory requiredUtilities = new ResourceValues[](maxLevel);

    uint256[] memory utilityResourceIds;
    uint32[] memory utilityResourceAmounts;

    // LEVEL 1
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 100;
    requiredUtilities[0] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 2
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 150;
    requiredUtilities[1] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    // LEVEL 3
    utilityResourceIds = new uint256[](1);
    utilityResourceAmounts = new uint32[](1);
    utilityResourceIds[0] = ElectricityUtilityResourceID;
    utilityResourceAmounts[0] = 200;
    requiredUtilities[2] = ResourceValues(utilityResourceIds, utilityResourceAmounts);

    /* -------------------------------- Defence Values ------------------------------- */

    uint32[] memory defenciveValues = new uint32[](maxLevel);
    // LEVEL 1
    defenciveValues[0] = 250;
    // LEVEL 2
    defenciveValues[1] = 500;
    // LEVEL 3
    defenciveValues[2] = 900;

    /* ***********************Set Values ************************* */

    setupDefenciveBuilding(
      world,
      maxLevel,
      entity,
      requiredMainBaseLevels,
      requiredResources,
      requiredUtilities,
      defenciveValues
    );
  }
}