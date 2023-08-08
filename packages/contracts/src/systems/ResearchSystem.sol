// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

import { HasResearchedComponent, ID as HasResearchedComponentID } from "components/HasResearchedComponent.sol";
import { P_IsTechComponent, ID as P_IsTechComponentID } from "components/P_IsTechComponent.sol";
import { P_RequiredResourcesComponent, ID as P_RequiredResourcesComponentID } from "components/P_RequiredResourcesComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";

import { LibResearch } from "libraries/LibResearch.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";

import { IOnEntitySubsystem } from "../interfaces/IOnEntitySubsystem.sol";
import { ID as SpendRequiredResourcesSystemID } from "./S_SpendRequiredResourcesSystem.sol";

uint256 constant ID = uint256(keccak256("system.Research"));

contract ResearchSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function checkMainBaseLevelRequirement(
    IWorld world,
    uint256 playerEntity,
    uint256 entity
  ) internal view returns (bool) {
    LevelComponent levelComponent = LevelComponent(getAddressById(world.components(), LevelComponentID));
    if (!levelComponent.has(entity)) return true;
    uint256 mainLevel = LibBuilding.getBaseLevel(world, playerEntity);
    return mainLevel >= levelComponent.getValue(entity);
  }

  function execute(bytes memory args) public returns (bytes memory) {
    uint256 researchItem = abi.decode(args, (uint256));

    P_IsTechComponent isTechComponent = P_IsTechComponent(getAddressById(components, P_IsTechComponentID));

    require(isTechComponent.has(researchItem), "[ResearchSystem] Technology not registered");

    require(
      checkMainBaseLevelRequirement(world, addressToEntity(msg.sender), researchItem),
      "[ResearchSystem] MainBase level requirement not met"
    );

    require(
      LibResearch.hasResearched(world, researchItem, addressToEntity(msg.sender)),
      "[ResearchSystem] Research requirements not met"
    );

    if (P_RequiredResourcesComponent(getAddressById(components, P_RequiredResourcesComponentID)).has(researchItem)) {
      require(
        LibResource.hasRequiredResources(world, researchItem, addressToEntity(msg.sender)),
        "[ResearchSystem] Not enough resources to research"
      );
      IOnEntitySubsystem(getAddressById(world.systems(), SpendRequiredResourcesSystemID)).executeTyped(
        msg.sender,
        researchItem
      );
    }

    HasResearchedComponent(getAddressById(components, HasResearchedComponentID)).set(
      LibEncode.hashKeyEntity(researchItem, addressToEntity(msg.sender))
    );
    return abi.encode(true);
  }

  function executeTyped(uint256 researchItem) public returns (bytes memory) {
    return execute(abi.encode(researchItem));
  }
}
