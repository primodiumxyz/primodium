// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

//buildings
uint256 constant DebugSimpleBuildingNoReqsID = uint256(keccak256("block.DebugSimpleBuildingNoReqs"));
uint256 constant DebugSimpleBuildingResourceReqsID = uint256(keccak256("block.DebugSimpleBuildingResourceReqs"));
uint256 constant DebugSimpleBuildingResearchReqsID = uint256(keccak256("block.DebugSimpleBuildingResearchReqs"));
uint256 constant DebugSimpleBuildingBuildLimitReq = uint256(keccak256("block.DebugSimpleBuildingBuildLimitReq"));
uint256 constant DebugSimpleBuildingTileReqID = uint256(keccak256("block.DebugSimpleBuildingTileReq"));
uint256 constant DebugSimpleBuildingMainBaseLevelReqID = uint256(
  keccak256("block.DebugSimpleBuildingMainBaseLevelReq")
);

uint256 constant DebugSimpleBuildingUtilityResourceRequirement = uint256(
  keccak256("block.DebugSimpleBuildingUtilityResourceRequirement")
);

uint256 constant DebugSimpleBuildingWithUpgradeResourceReqsID = uint256(
  keccak256("block.DebugSimpleBuildingWithUpgradeResourceReqs")
);
uint256 constant DebugSimpleBuildingWithUpgradeResearchReqsID = uint256(
  keccak256("block.DebugSimpleBuildingWithUpgradeResearchReqs")
);

uint256 constant DebugSimpleBuilding3x3 = uint256(keccak256("block.DebugSimpleBuilding3x3"));

uint256 constant DebugSimpleBuildingRequiresTitanium = uint256(keccak256("block.DebugSimpleBuildingRequiresTitanium"));

// mines
uint256 constant DebugIronMineID = uint256(keccak256("block.DebugIronMine"));
uint256 constant DebugCopperMineID = uint256(keccak256("block.DebugCopperMine"));
uint256 constant DebugLithiumMineID = uint256(keccak256("block.DebugLithiumMine"));

uint256 constant DebugIronMineWithBuildLimitID = uint256(keccak256("block.DebugIronMineWithBuildLimit"));
uint256 constant DebugIronMineNoTileReqID = uint256(keccak256("block.DebugIronMineNoTileReq"));

//factories
uint256 constant DebugIronPlateFactoryNoMineReqID = uint256(keccak256("block.DebugIronPlateFactoryNoMineReq"));
uint256 constant DebugIronPlateFactoryID = uint256(keccak256("block.DebugIronPlateFactory"));
uint256 constant DebugAlloyFactoryID = uint256(keccak256("block.DebugAlloyFactory"));
uint256 constant DebugLithiumCopperOxideFactoryID = uint256(keccak256("block.DebugLithiumCopperOxideFactory"));

uint256 constant DebugSolarPanelID = uint256(keccak256("block.DebugSolarPanel"));

uint256 constant DebugUtilityProductionBuilding = uint256(keccak256("block.DebugUtilityProductionBuilding"));

uint256 constant DebugHousingBuilding = uint256(keccak256("block.DebugHousingBuilding"));
uint256 constant DebugUnitProductionBuilding = uint256(keccak256("block.DebugUnitProductionBuilding"));

uint256 constant DebugUnit = uint256(keccak256("block.DebugUnit"));
uint256 constant DebugUnit2 = uint256(keccak256("block.DebugUnit2"));
uint256 constant DebugUnit3 = uint256(keccak256("block.DebugUnit3"));

uint256 constant DebugUnitMiner = uint256(keccak256("unit.DebugUnitMiner"));
uint256 constant DebugUnitMiner2 = uint256(keccak256("unit.DebugUnitMiner2"));

uint256 constant DebugUnitBattle1 = uint256(keccak256("unit.DebugUnitBattle1"));
uint256 constant DebugUnitBattle2 = uint256(keccak256("unit.DebugUnitBattle2"));

//super buildings
uint256 constant DebugSuperIronMineID = uint256(keccak256("block.DebugSuperIronMine"));
uint256 constant DebugSuperIronPlateFactoryID = uint256(keccak256("block.DebugSuperIronPlateFactory"));
//technologies

uint256 constant DebugSimpleTechnologyUpgradeUnit = uint256(keccak256("block.DebugSimpleTechnologyUpgradeUnit"));
uint256 constant DebugSimpleTechnologyIncreaseHousing = uint256(
  keccak256("block.DebugSimpleTechnologyIncreaseHousing")
);

uint256 constant DebugSimpleTechnologyNoReqsID = uint256(keccak256("block.DebugSimpleTechnologyNoReqs"));
uint256 constant DebugSimpleTechnologyResourceReqsID = uint256(keccak256("block.DebugSimpleTechnologyResourceReqs"));
uint256 constant DebugSimpleTechnologyResearchReqsID = uint256(keccak256("block.DebugSimpleTechnologyResearchReqs"));
uint256 constant DebugSimpleTechnologyMainBaseLevelReqsID = uint256(
  keccak256("block.DebugSimpleTechnologyMainBaseLevelReqs")
);

uint256 constant DebugSimpleTechnologyTitaniumCostID = uint256(keccak256("block.DebugSimpleTechnologyTitaniumCost"));
uint256 constant DebugSimpleTechnologyPlatinumCostID = uint256(keccak256("block.DebugSimpleTechnologyPlatinumCost"));
uint256 constant DebugSimpleTechnologyIridiumCostID = uint256(keccak256("block.DebugSimpleTechnologyIridiumCost"));
uint256 constant DebugSimpleTechnologyKimberliteCostID = uint256(
  keccak256("block.DebugSimpleTechnologyKimberliteCost")
);

//storage building
uint256 constant DebugStorageBuildingID = uint256(keccak256("block.DebugStorageBuilding"));
uint32 constant BIGNUM = 1_294_967_295;
