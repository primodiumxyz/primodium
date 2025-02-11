// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";

import { ColonyShipPrototypeId } from "codegen/Prototypes.sol";
import { EResource, EUnit } from "src/Types.sol";
import { UnitKey } from "src/Keys.sol";
import { LibColony } from "libraries/LibColony.sol";

import { P_GameConfig, CooldownEnd, Home, P_EnumToPrototype, ResourceCount, P_Transportables, UnitCount, ResourceCount, P_UnitPrototypes, FleetMovement, P_RequiredResources, P_RequiredResourcesData, UnitLevel, P_IsUtility, MaxColonySlots } from "codegen/index.sol";

contract TransferSystemTest is PrimodiumTest {
  bytes32 aliceHomeAsteroid;
  bytes32 aliceEntity;

  bytes32 bobHomeAsteroid;
  bytes32 bobEntity;

  uint256[] initResources = new uint256[](uint8(EResource.LENGTH));

  function setUp() public override {
    super.setUp();
    aliceEntity = addressToEntity(alice);
    aliceHomeAsteroid = spawn(alice);

    bobEntity = addressToEntity(bob);
    bobHomeAsteroid = spawn(bob);

    for (uint8 i = 0; i < uint8(EResource.LENGTH); i++) {
      initResources[i] = ResourceCount.get(aliceHomeAsteroid, i);
    }
  }

  function testTransferResourcesAndUnitsFleetToFleet() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.startPrank(alice);
    world.Pri_11__transferUnitsAndResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, unitCounts, resourceCounts);
    vm.stopPrank();

    assertEq(UnitCount.get(fleetEntity, unitPrototype), 1, "fleet unit count doesn't match");
    assertEq(UnitCount.get(secondFleetEntity, unitPrototype), 3, "asteroid unit count doesn't match");
    assertEq(ResourceCount.get(fleetEntity, uint8(EResource.Iron)), 1, "fleet resource count doesn't match");
    assertEq(ResourceCount.get(secondFleetEntity, uint8(EResource.Iron)), 3, "fleet resource count doesn't match");

    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(
      unitPrototype,
      UnitLevel.get(aliceHomeAsteroid, unitPrototype)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      if (P_IsUtility.get(requiredResources.resources[i]))
        assertEq(
          ResourceCount.get(aliceHomeAsteroid, requiredResources.resources[i]) -
            initResources[requiredResources.resources[i]],
          0,
          "no utility should be refunded when transfer is between same owner fleets"
        );
    }
    assertEq(ResourceCount.get(aliceHomeAsteroid, uint8(EResource.Iron)), 0, "asteroid resource count doesn't match");
  }

  function createColonyShipFleet(address player) private returns (bytes32 fleetEntity) {
    bytes32 playerEntity = addressToEntity(player);

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == ColonyShipPrototypeId) unitCounts[i] = 1;
    }

    bytes32 homeAsteroidEntity = Home.get(playerEntity);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(player, homeAsteroidEntity, unitCounts, resourceCounts);

    vm.prank(player);
    fleetEntity = world.Pri_11__createFleet(homeAsteroidEntity, unitCounts, resourceCounts);
  }

  function testTransferColonyShipBetweenPlayers() public {
    vm.startPrank(creator);
    LibColony.increaseMaxColonySlots(aliceEntity);
    LibColony.increaseMaxColonySlots(bobEntity);

    console.log("here2");

    bytes32 aliceFleet = createColonyShipFleet(alice);
    bytes32 bobFleet = createColonyShipFleet(bob);
    vm.stopPrank();

    vm.prank(creator);
    P_GameConfig.setWorldSpeed(100);
    vm.prank(alice);
    world.Pri_11__sendFleet(aliceFleet, bobHomeAsteroid);
    console.log("aliceFleet arrival time", FleetMovement.getArrivalTime(aliceFleet));
    vm.warp(block.timestamp + 10000000);

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == ColonyShipPrototypeId) unitCounts[i] = 1;
    }

    vm.startPrank(alice);
    vm.expectRevert("[Fleet] Receiver not enough colony slots to transfer colony ships");
    world.Pri_11__transferUnitsFromFleetToFleet(aliceFleet, bobFleet, unitCounts);

    vm.expectRevert("[Fleet] Receiver not enough colony slots to transfer colony ships");
    world.Pri_11__transferUnitsFromFleetToAsteroid(aliceFleet, bobHomeAsteroid, unitCounts);

    vm.expectRevert("[Fleet] Receiver not enough colony slots to transfer colony ships");
    world.Pri_11__transferUnitsAndResourcesFromFleetToAsteroid(aliceFleet, bobHomeAsteroid, unitCounts, resourceCounts);

    vm.expectRevert("[Fleet] Receiver not enough colony slots to transfer colony ships");
    world.Pri_11__transferUnitsAndResourcesFromFleetToFleet(aliceFleet, bobFleet, unitCounts, resourceCounts);
  }

  function testFailTransferResourcesAndUnitsFleetToFleetNotInSameOrbit() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    world.Pri_11__sendFleet(secondFleetEntity, bobHomeAsteroid);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.startPrank(alice);
    world.Pri_11__transferUnitsAndResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, unitCounts, resourceCounts);
    vm.stopPrank();
  }

  function testTransferResourcesFleetToFleet() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.startPrank(alice);
    world.Pri_11__transferResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, resourceCounts);
    vm.stopPrank();

    assertEq(UnitCount.get(fleetEntity, unitPrototype), 2, "fleet unit count doesn't match");
    assertEq(UnitCount.get(secondFleetEntity, unitPrototype), 2, "asteroid unit count doesn't match");
    assertEq(ResourceCount.get(fleetEntity, uint8(EResource.Iron)), 1, "fleet resource count doesn't match");
    assertEq(ResourceCount.get(secondFleetEntity, uint8(EResource.Iron)), 3, "fleet resource count doesn't match");

    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(
      unitPrototype,
      UnitLevel.get(aliceHomeAsteroid, unitPrototype)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      if (P_IsUtility.get(requiredResources.resources[i]))
        assertEq(
          ResourceCount.get(aliceHomeAsteroid, requiredResources.resources[i]) -
            initResources[requiredResources.resources[i]],
          0,
          "no utility should be refunded when transfer is between same owner fleets"
        );
    }
    assertEq(ResourceCount.get(aliceHomeAsteroid, uint8(EResource.Iron)), 0, "asteroid resource count doesn't match");
  }

  function testFailTransferResourcesFleetToFleetNotInSameOrbit() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    world.Pri_11__sendFleet(secondFleetEntity, bobHomeAsteroid);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 0;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.startPrank(alice);
    world.Pri_11__transferResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, resourceCounts);
    vm.stopPrank();
  }

  function testFailTransferUnitsFleetToFleetNotInSameOrbit() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    world.Pri_11__sendFleet(secondFleetEntity, bobHomeAsteroid);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 0;
    }

    vm.startPrank(alice);
    world.Pri_11__transferUnitsFromFleetToFleet(fleetEntity, secondFleetEntity, unitCounts);
    vm.stopPrank();
  }

  function testTransferResourcesAndUnitsFleetToAsteroid() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.startPrank(alice);
    world.Pri_11__transferUnitsAndResourcesFromFleetToAsteroid(
      fleetEntity,
      aliceHomeAsteroid,
      unitCounts,
      resourceCounts
    );
    vm.stopPrank();

    assertEq(UnitCount.get(fleetEntity, unitPrototype), 1, "fleet unit count doesn't match");
    assertEq(UnitCount.get(aliceHomeAsteroid, unitPrototype), 1, "asteroid unit count doesn't match");
    assertEq(ResourceCount.get(fleetEntity, uint8(EResource.Iron)), 1, "fleet resource count doesn't match");
    assertEq(ResourceCount.get(aliceHomeAsteroid, uint8(EResource.Iron)), 1, "fleet resource count doesn't match");

    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(
      unitPrototype,
      UnitLevel.get(aliceHomeAsteroid, unitPrototype)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      if (P_IsUtility.get(requiredResources.resources[i]))
        assertEq(
          ResourceCount.get(aliceHomeAsteroid, requiredResources.resources[i]) -
            initResources[requiredResources.resources[i]],
          0,
          "no utility should be refunded when transfer is between same owner fleets"
        );
    }
  }

  function testTransferResourcesAndUnitsAsteroidToFleet() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    trainUnits(alice, EUnit.MinutemanMarine, 1, true);
    increaseResource(aliceHomeAsteroid, EResource.Iron, 1);

    vm.startPrank(alice);
    world.Pri_11__transferUnitsAndResourcesFromAsteroidToFleet(
      aliceHomeAsteroid,
      fleetEntity,
      unitCounts,
      resourceCounts
    );
    vm.stopPrank();

    assertEq(UnitCount.get(fleetEntity, unitPrototype), 3, "fleet unit count doesn't match");
    assertEq(UnitCount.get(aliceHomeAsteroid, unitPrototype), 0, "asteroid unit count doesn't match");
    assertEq(ResourceCount.get(fleetEntity, uint8(EResource.Iron)), 3, "fleet resource count doesn't match");
    assertEq(ResourceCount.get(aliceHomeAsteroid, uint8(EResource.Iron)), 0, "fleet resource count doesn't match");

    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(
      unitPrototype,
      UnitLevel.get(aliceHomeAsteroid, unitPrototype)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      if (P_IsUtility.get(requiredResources.resources[i]))
        assertEq(
          ResourceCount.get(aliceHomeAsteroid, requiredResources.resources[i]) -
            initResources[requiredResources.resources[i]],
          0,
          "no utility should be refunded when transfer is between same owner fleets"
        );
    }
  }

  function testTransferFailInCooldown() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Pri_11__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    vm.prank(creator);
    CooldownEnd.set(fleetEntity, block.timestamp + 1);
    vm.startPrank(alice);

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, resourceCounts);

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferUnitsFromFleetToFleet(fleetEntity, secondFleetEntity, unitCounts);

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferUnitsAndResourcesFromFleetToFleet(fleetEntity, secondFleetEntity, unitCounts, resourceCounts);

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferUnitsFromFleetToAsteroid(fleetEntity, aliceHomeAsteroid, unitCounts);

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferUnitsAndResourcesFromFleetToAsteroid(
      fleetEntity,
      aliceHomeAsteroid,
      unitCounts,
      resourceCounts
    );

    vm.expectRevert("[Fleet] Fleet is in cooldown");
    world.Pri_11__transferResourcesFromFleetToAsteroid(fleetEntity, aliceHomeAsteroid, resourceCounts);
  }
}
