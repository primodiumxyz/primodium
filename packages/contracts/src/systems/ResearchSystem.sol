// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { ResearchComponent, ID as ResearchComponentID } from "components/ResearchComponent.sol";
import { LastResearchedAtComponent, ID as LastResearchedAtComponentID } from "components/LastResearchedAtComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { BuildingLevelComponent, ID as BuildingComponentID } from "components/BuildingLevelComponent.sol";
import { MainBaseInitializedComponent, ID as MainBaseInitializedComponentID } from "components/MainBaseInitializedComponent.sol";

import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";

import { LibResearch } from "libraries/LibResearch.sol";
import { LibResourceCost } from "libraries/LibResourceCost.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
uint256 constant ID = uint256(keccak256("system.Research"));

contract ResearchSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function checkMainBaseLevelRequirement(
    BuildingLevelComponent buildingLevelComponent,
    MainBaseInitializedComponent mainBaseInitializedComponent,
    uint256 playerEntity,
    uint256 entity
  ) internal view returns (bool) {
    if (!buildingLevelComponent.has(entity)) return true;
    uint256 mainBuildingLevel = LibBuilding.getMainBuildingLevelforPlayer(
      buildingLevelComponent,
      mainBaseInitializedComponent,
      playerEntity
    );
    return mainBuildingLevel >= buildingLevelComponent.getValue(entity);
  }

  function execute(bytes memory args) public returns (bytes memory) {
    uint256 researchItem = abi.decode(args, (uint256));

    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));
    ResearchComponent researchComponent = ResearchComponent(getAddressById(components, ResearchComponentID));
    LastResearchedAtComponent lastResearchedAtComponent = LastResearchedAtComponent(
      getAddressById(components, LastResearchedAtComponentID)
    );
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(
      getAddressById(components, RequiredResourcesComponentID)
    );
    RequiredResearchComponent requiredResearchComponent = RequiredResearchComponent(
      getAddressById(components, RequiredResearchComponentID)
    );
    BuildingLevelComponent buildingLevelComponent = BuildingLevelComponent(
      getAddressById(components, BuildingComponentID)
    );

    require(researchComponent.has(researchItem), "[ResearchSystem] Technology not registered");

    require(
      checkMainBaseLevelRequirement(
        buildingLevelComponent,
        MainBaseInitializedComponent(getAddressById(components, MainBaseInitializedComponentID)),
        addressToEntity(msg.sender),
        researchItem
      ),
      "[ResearchSystem] MainBase level requirement not met"
    );

    require(
      LibResearch.checkResearchRequirements(
        requiredResearchComponent,
        researchComponent,
        researchItem,
        addressToEntity(msg.sender)
      ),
      "[ResearchSystem] Research requirements not met"
    );

    require(
      LibResourceCost.checkAndSpendRequiredResources(
        requiredResourcesComponent,
        itemComponent,
        researchItem,
        addressToEntity(msg.sender)
      ),
      "[ResearchSystem] Not enough resources to research"
    );
    researchComponent.set(LibEncode.hashKeyEntity(researchItem, addressToEntity(msg.sender)));
    LibResearch.setLastResearched(lastResearchedAtComponent, researchItem, addressToEntity(msg.sender));
    return abi.encode(true);
  }

  function executeTyped(uint256 researchItem) public returns (bytes memory) {
    return execute(abi.encode(researchItem));
  }
}
