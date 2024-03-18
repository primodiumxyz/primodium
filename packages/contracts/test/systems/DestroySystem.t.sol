// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "test/PrimodiumTest.t.sol";

contract DestroySystemTest is PrimodiumTest {
  bytes32 public playerEntity;
  bytes32 public rock;
  PositionData public position;
  int32[] public blueprint = get2x2Blueprint();

  function setUp() public override {
    super.setUp();

    spawn(creator);
    playerEntity = addressToEntity(creator);
    rock = Home.get(playerEntity);
    position = getTilePosition(rock, EBuilding.Hangar);
    vm.startPrank(creator);
  }

  function buildIronMine() private returns (bytes32) {
    removeRequirements(EBuilding.IronMine);
    return world.build(EBuilding.IronMine, position);
  }

  function testShipyardDestroy() public {
    EBuilding building = EBuilding.Shipyard;
    Dimensions.set(ExpansionKey, 1, 35, 27);
    P_RequiredResourcesData memory requiredResources = getBuildCost(building);
    provideResources(Home.get(playerEntity), requiredResources);
    vm.startPrank(creator);
    P_RequiredBaseLevel.set(P_EnumToPrototype.get(BuildingKey, uint8(EBuilding.Shipyard)), 1, 0);

    PositionData memory originalPosition = getTilePosition(Home.get(playerEntity), building);
    bytes32 buildingEntity = world.build(building, originalPosition);

    uint256 gas = gasleft();
    world.destroy(buildingEntity);
    console.log("after", gas - gasleft());
  }

  function destroy(bytes32 buildingEntity, PositionData memory _coord) public {
    int32[] memory tilePositions = TilePositions.get(buildingEntity);
    world.destroy(buildingEntity);

    assertEq(TilePositions.get(buildingEntity).length, 0);
    for (uint256 i = 0; i < tilePositions.length; i += 2) {
      int32[] memory currPosition = new int32[](2);
      currPosition[0] = tilePositions[i];
      currPosition[1] = tilePositions[i + 1];
      assertTrue(LibAsteroid.allTilesAvailable(Home.get(playerEntity), currPosition));
    }

    assertTrue(OwnedBy.get(buildingEntity) == 0, "has ownedby");
    assertTrue(BuildingType.get(buildingEntity) == 0, "has tile");
    assertTrue(Level.get(buildingEntity) == 0, "has level");
  }

  function testDestroyWithBuildingOrigin() public {
    bytes32 buildingEntity = buildIronMine();
    destroy(buildingEntity, position);
  }

  function testDestroyWithTile() public {
    bytes32 buildingEntity = buildIronMine();
    bytes32 asteroid = Home.get(playerEntity);
    position.parent = asteroid;
    destroy(buildingEntity, position);
  }

  function testDestroyWithProductionDependencies() public {
    switchPrank(address(creator));
    uint256 originalProduction = 100;
    uint256 productionReduction = 10;
    bytes32 spaceRockEntity = Home.get(playerEntity);
    ProductionRate.set(spaceRockEntity, uint8(EResource.Iron), originalProduction);
    P_RequiredDependencyData memory requiredDependenciesData = P_RequiredDependencyData(
      uint8(Iron),
      productionReduction
    );

    P_RequiredDependency.set(IronMinePrototypeId, 1, requiredDependenciesData);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    uint256 productionIncrease = P_Production.getAmounts(IronMinePrototypeId, 1)[0];
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction + productionIncrease);
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), productionReduction);

    world.destroy(ironMine);
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction);
  }

  function testDestroyInActiveWithProductionDependencies() public {
    switchPrank(address(creator));
    uint256 originalProduction = 100;
    uint256 productionReduction = 10;
    bytes32 spaceRockEntity = Home.get(playerEntity);
    ProductionRate.set(spaceRockEntity, uint8(EResource.Iron), originalProduction);
    P_RequiredDependencyData memory requiredDependenciesData = P_RequiredDependencyData(
      uint8(Iron),
      productionReduction
    );

    P_RequiredDependency.set(IronMinePrototypeId, 1, requiredDependenciesData);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    uint256 productionIncrease = P_Production.getAmounts(IronMinePrototypeId, 1)[0];
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction + productionIncrease);
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), productionReduction);
    world.toggleBuilding(ironMine);

    world.destroy(ironMine);
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction);
  }

  function testDestroyWithResourceProductionIncrease() public {
    switchPrank(address(creator));
    bytes32 spaceRockEntity = Home.get(playerEntity);
    uint256 increase = 69;
    P_ProductionData memory data = P_ProductionData(new uint8[](1), new uint256[](1));
    data.resources[0] = uint8(EResource.Iron);
    data.amounts[0] = increase;
    P_Production.set(IronMinePrototypeId, 1, data);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), increase);

    world.destroy(ironMine);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyInActiveWithResourceProductionIncrease() public {
    switchPrank(address(creator));
    bytes32 spaceRockEntity = Home.get(playerEntity);
    uint256 increase = 69;
    P_ProductionData memory data = P_ProductionData(new uint8[](1), new uint256[](1));
    data.resources[0] = uint8(EResource.Iron);
    data.amounts[0] = increase;
    P_Production.set(IronMinePrototypeId, 1, data);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), increase);
    world.toggleBuilding(ironMine);
    world.destroy(ironMine);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyWithMaxStorageIncrease() public {
    switchPrank(creator);
    bytes32 spaceRockEntity = Home.get(playerEntity);
    uint8[] memory data = new uint8[](1);
    data[0] = uint8(EResource.Iron);
    P_ListMaxResourceUpgrades.set(IronMinePrototypeId, 1, data);
    P_ByLevelMaxResourceUpgrades.set(IronMinePrototypeId, uint8(EResource.Iron), 1, 50);

    switchPrank(creator);
    MaxResourceCount.set(spaceRockEntity, uint8(EResource.Iron), 0);
    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 50);

    world.destroy(ironMine);
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyInActiveWithMaxStorageIncrease() public {
    switchPrank(creator);
    bytes32 spaceRockEntity = Home.get(playerEntity);
    uint8[] memory data = new uint8[](1);
    data[0] = uint8(EResource.Iron);
    P_ListMaxResourceUpgrades.set(IronMinePrototypeId, 1, data);
    P_ByLevelMaxResourceUpgrades.set(IronMinePrototypeId, uint8(EResource.Iron), 1, 50);

    switchPrank(creator);
    MaxResourceCount.set(spaceRockEntity, uint8(EResource.Iron), 0);
    PositionData memory ironPosition = getTilePosition(rock, EBuilding.IronMine);
    bytes32 ironMine = world.build(EBuilding.IronMine, ironPosition);
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 50);
    world.toggleBuilding(ironMine);
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 0);
    world.destroy(ironMine);
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }

  /* TODO: Add test that includes buildings with utility dependencies */
}
