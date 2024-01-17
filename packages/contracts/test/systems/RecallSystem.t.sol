// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "test/PrimodiumTest.t.sol";

contract RecallSystemTest is PrimodiumTest {
  bytes32 player;
  bytes32 to;
  PositionData originPosition = PositionData(0, 0, 0);
  PositionData destinationPosition = PositionData(0, 10, 0);
  bytes32 origin = "origin";
  bytes32 destination = "destination";

  bytes32 unitPrototype = "unitPrototype";
  EUnit unit = EUnit.AegisDrone;
  uint256[NUM_UNITS] unitCounts;

  P_UnitData unitData = P_UnitData({ attack: 0, defense: 0, speed: 0, cargo: 0, trainingTime: 0 });

  function setUp() public override {
    super.setUp();
    vm.startPrank(creator);
    player = addressToEntity(creator);
    to = addressToEntity(alice);
    P_EnumToPrototype.set(UnitKey, uint8(unit), unitPrototype);

    bytes32[] memory unitTypes = new bytes32[](NUM_UNITS);
    unitTypes[0] = unitPrototype;
    P_UnitPrototypes.set(unitTypes);
  }

  function testRecallUnitsFromMotherlode() public {
    setupRecall();
    Home.set(player, origin);
    world.recallStationedUnits(destination);
    assertEq(UnitCount.get(destination, unitPrototype), 0);
    assertEq(UnitCount.get(origin, unitPrototype), 70);
  }

  function setupRecall() public {
    Asteroid.setIsAsteroid(origin, true);
    Asteroid.setIsAsteroid(destination, true);
    ReversePosition.set(originPosition.x, originPosition.y, origin);
    ReversePosition.set(destinationPosition.x, destinationPosition.y, destination);
    OwnedBy.set(origin, player);
    OwnedBy.set(destination, player);
    UnitCount.set(origin, unitPrototype, 20);
    UnitCount.set(destination, unitPrototype, 50);
  }
}
