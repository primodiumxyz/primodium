// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "test/PrimodiumTest.t.sol";

/* 
Test when buildingEntity, unit, and count are valid.
Test when buildingEntity can't produce unitPrototype.
Test when count is zero.
Test when count is very high, close to uint256 max.
Test when the required resources are not available.
Edge Cases
Test when buildingEntity or unit is an invalid value.
Test when playerEntity is an empty bytes32.
*/

contract TrainUnitsSystemTest is PrimodiumTest {
  bytes32 rock = bytes32("rock");
  bytes32 player;

  EUnit unit = EUnit(1);
  bytes32 unitPrototype = "unitPrototype";

  bytes32 building = "building";
  bytes32 buildingPrototype = "buildingPrototype";

  function setUp() public override {
    super.setUp();
    vm.startPrank(worldAddress);
    player = addressToEntity(worldAddress);
    BuildingType.set(building, buildingPrototype);
    P_EnumToPrototype.set(UnitKey, uint8(unit), unitPrototype);
    P_GameConfigData memory config = P_GameConfig.get();
    config.unitProductionRate = 100;
    P_GameConfig.set(config);
    RockType.set(rock, ERock.Asteroid);
    Home.setAsteroid(player, rock);
    OwnedBy.set(building, player);
  }

  // copied from LibUnit.t.sol
  function setupClaimUnits() public {
    Level.set(building, 1);
    LastClaimedAt.set(building, block.timestamp - 100);
    P_UnitProdMultiplier.set(building, 1, 100);
    UnitLevel.set(player, unitPrototype, 1);
    P_Unit.setTrainingTime(unitPrototype, 1, 1);

    QueueItemUnitsData memory item = QueueItemUnitsData(unitPrototype, 100);
    UnitProductionQueue.enqueue(building, item);
    UnitFactorySet.add(player, building);
  }

  function testCannotProduceUnit() public {
    vm.expectRevert(bytes("[TrainUnitsSystem] Building cannot produce unit"));
    world.trainUnits(building, unit, 1);
  }

  function testTrainUnits() public {
    P_UnitProduction.set(buildingPrototype, unitPrototype, true);
    world.trainUnits(building, unit, 1);
    QueueItemUnitsData memory data = UnitProductionQueue.peek(building);
    assertEq(toString(data.unitId), toString(unitPrototype));
    assertEq(data.quantity, 1);
  }

  function testTrainUnitsNotEnoughResources() public {
    uint8[] memory p_requiredresources_resources_level_1 = new uint8[](1);
    p_requiredresources_resources_level_1[0] = uint8(EResource.Iron);
    uint256[] memory p_requiredresources_amounts_level_1 = new uint256[](1);
    p_requiredresources_amounts_level_1[0] = 100;

    P_RequiredResources.set(
      unitPrototype,
      1,
      P_RequiredResourcesData(p_requiredresources_resources_level_1, p_requiredresources_amounts_level_1)
    );

    P_UnitProduction.set(buildingPrototype, unitPrototype, true);
    vm.expectRevert(bytes("[SpendResources] Not enough resources to spend"));
    world.trainUnits(building, unit, 1);
  }

  function testTrainUnitsUpdateAsteroid() public {
    P_UnitProduction.set(buildingPrototype, unitPrototype, true);
    RockType.set(rock, ERock.Asteroid);

    setupClaimUnits();
    Home.setAsteroid(player, rock);
    MaxResourceCount.set(player, EResource.Iron, 1000);
    ProductionRate.set(player, EResource.Iron, 10);
    LastClaimedAt.set(player, block.timestamp - 10);

    world.trainUnits(building, unit, 1);

    assertEq(ResourceCount.get(player, EResource.Iron), 100);
    assertEq(UnitCount.get(player, Home.getAsteroid(player), unitPrototype), 100);
  }
}
