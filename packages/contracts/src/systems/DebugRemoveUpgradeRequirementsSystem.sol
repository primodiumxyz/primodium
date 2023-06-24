pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibDebug } from "../libraries/LibDebug.sol";


uint256 constant ID = uint256(keccak256("system.DebugRemoveUpgradeRequirements"));

contract DebugRemoveUpgradeRequirementsSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory args) public returns (bytes memory) {
    if (!LibDebug.isDebug()) {
      revert("Not in debug mode");
    }
    (uint256 buildingId) = abi.decode(args, (uint256));
     for (uint256 i = 0; i < 100; i++) {
      removeRequiredResourcesAndTechnologyConditionsForUpgradingBuildingIdLevel(buildingId, i);
    }

  }

  function removeRequiredResourcesAndTechnologyConditionsForUpgradingBuildingIdLevel(
    uint256 buildingId, uint256 level) public returns (bytes memory) {
    if (!LibDebug.isDebug()) {
      revert("Not in debug mode");
    }

    RequiredResearchComponent requiredResearch = RequiredResearchComponent(
      getAddressById(components, RequiredResearchComponentID)
    );
    RequiredResourcesComponent requiredResources = RequiredResourcesComponent(
      getAddressById(components, RequiredResourcesComponentID)
    );
    requiredResearch.remove(LibEncode.hashFromKey(buildingId, level));
    requiredResources.remove(LibEncode.hashFromKey(buildingId, level));

  }

  function executeTyped(uint256 buildingId) public returns (bytes memory) {
    return execute(abi.encode(buildingId));
  }

}