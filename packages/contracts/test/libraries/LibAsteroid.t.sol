// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";

import { EResource } from "src/Types.sol";

import { P_EnumToPrototype, P_Transportables, P_UnitPrototypes, Asteroid, AsteroidData, Position, PositionData, Position, PositionData, ReversePosition, MaxResourceCount, UnitCount, ResourceCount, UnitCount, ResourceCount, P_GameConfig, P_GameConfigData, P_WormholeAsteroidConfig, P_WormholeAsteroidConfigData } from "codegen/index.sol";
import { DroidPrototypeId } from "codegen/Prototypes.sol";
import { EUnit } from "src/Types.sol";
import { UnitKey } from "src/Keys.sol";

import { LibAsteroid } from "libraries/LibAsteroid.sol";

contract LibAsteroidTest is PrimodiumTest {
  bytes32 playerEntity;
  bytes32 asteroidEntity;

  function setUp() public override {
    super.setUp();

    P_GameConfigData memory gameConfig = P_GameConfig.get();
    gameConfig.asteroidDistance = 8;
    gameConfig.maxAsteroidsPerPlayer = 12;
    gameConfig.asteroidChanceInv = 2;
    asteroidEntity = spawn(creator);
    vm.startPrank(creator);
    playerEntity = addressToEntity(creator);
    P_GameConfig.set(gameConfig);
    vm.stopPrank();
  }

  function testIsAsteroid() public {
    vm.startPrank(creator);
    uint256 chanceInv = 4;
    P_GameConfig.setAsteroidChanceInv(4);
    bytes32 entity = 0 << 128;
    assertTrue(LibAsteroid.isAsteroid(entity, chanceInv, P_WormholeAsteroidConfig.getWormholeAsteroidSlot() + 1));
    entity = bytes32(uint256(1 << 128));
    assertFalse(LibAsteroid.isAsteroid(entity, chanceInv, P_WormholeAsteroidConfig.getWormholeAsteroidSlot() + 1));
    entity = bytes32(uint256(2 << 128));
    assertFalse(LibAsteroid.isAsteroid(entity, chanceInv, P_WormholeAsteroidConfig.getWormholeAsteroidSlot() + 1));
  }

  function testFuzzAsteroidData(bytes32 entity) public {
    AsteroidData memory asteroidData = LibAsteroid.getAsteroidData(entity, false, false);
    assertTrue(asteroidData.isAsteroid);
    assertFalse(asteroidData.spawnsSecondary);
    assertLe(asteroidData.mapId, 5, "map id too high");
    assertGe(asteroidData.mapId, 2, "map id too low");
    assertGe(asteroidData.maxLevel, 1, "max level too low");
    assertLe(asteroidData.maxLevel, 8, "max level too low");
  }

  function testCreateWormholeAsteroid() public {
    asteroidEntity = spawn(alice);
    PositionData memory position = findWormholeAsteroid(asteroidEntity);

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    bytes32 minutemanEntity = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == minutemanEntity) unitCounts[i] = 1;
    }

    setupCreateFleet(alice, asteroidEntity, unitCounts, resourceCounts);
    vm.startPrank(alice);

    bytes32 fleetEntity = world.Primodium__createFleet(asteroidEntity, unitCounts, resourceCounts);
    world.Primodium__sendFleet(fleetEntity, position);

    bytes32 actualAsteroidEntity = ReversePosition.get(position.x, position.y);
    bytes32 expectedAsteroidEntity = keccak256(abi.encode(asteroidEntity, bytes32("asteroid"), position.x, position.y));

    assertEq(actualAsteroidEntity, expectedAsteroidEntity, "asteroidEntity");
    AsteroidData memory expectedAsteroidData = LibAsteroid.getAsteroidData(expectedAsteroidEntity, false, true);
    AsteroidData memory actualAsteroidData = Asteroid.get(expectedAsteroidEntity);

    assertEq(expectedAsteroidData.isAsteroid, actualAsteroidData.isAsteroid, "isAsteroid");
    assertEq(expectedAsteroidData.spawnsSecondary, actualAsteroidData.spawnsSecondary, "spawnsSecondary");
    assertEq(expectedAsteroidData.mapId, actualAsteroidData.mapId, "mapId");
    assertTrue(actualAsteroidData.wormhole, "wormhole");
    assertEq(Position.get(actualAsteroidEntity), position);
    assertEq(ReversePosition.get(position.x, position.y), actualAsteroidEntity, "reversePosition");
    assertEq(
      MaxResourceCount.get(actualAsteroidEntity, uint8(EResource.U_MaxFleets)),
      0,
      "Asteroid should have 0 max fleets"
    );
  }

  function testCreateSecondaryAsteroid() public {
    vm.startPrank(creator);
    PositionData memory position = findSecondaryAsteroid(asteroidEntity);

    bytes32 actualAsteroidEntity = LibAsteroid.createSecondaryAsteroid(position);
    bytes32 expectedAsteroidEntity = keccak256(abi.encode(asteroidEntity, bytes32("asteroid"), position.x, position.y));

    assertEq(actualAsteroidEntity, expectedAsteroidEntity, "asteroidEntity");
    AsteroidData memory expectedAsteroidData = LibAsteroid.getAsteroidData(expectedAsteroidEntity, false, false);
    AsteroidData memory actualAsteroidData = Asteroid.get(expectedAsteroidEntity);

    assertEq(expectedAsteroidData.isAsteroid, actualAsteroidData.isAsteroid, "isAsteroid");
    assertEq(expectedAsteroidData.spawnsSecondary, actualAsteroidData.spawnsSecondary, "spawnsSecondary");
    assertEq(expectedAsteroidData.mapId, actualAsteroidData.mapId, "mapId");
    assertEq(Position.get(expectedAsteroidEntity), position);
    assertEq(ReversePosition.get(position.x, position.y), expectedAsteroidEntity, "reversePosition");
    assertEq(
      MaxResourceCount.get(expectedAsteroidEntity, uint8(EResource.U_MaxFleets)),
      0,
      "Asteroid should have 0 max fleets"
    );
  }

  function testSecondaryAsteroidDefense() public {
    vm.startPrank(creator);
    PositionData memory position = findSecondaryAsteroid(asteroidEntity);

    asteroidEntity = LibAsteroid.createSecondaryAsteroid(position);
    AsteroidData memory asteroidData = Asteroid.get(asteroidEntity);
    (uint256 expectedDroidCount, uint256 expectedEncryption) = LibAsteroid.getSecondaryAsteroidUnitsAndEncryption(
      asteroidData.maxLevel
    );
    uint256 actualDroidCount = UnitCount.get(asteroidEntity, DroidPrototypeId);
    assertEq(expectedDroidCount, actualDroidCount, "droidCount");
    uint256 actualEncryption = ResourceCount.get(asteroidEntity, uint8(EResource.R_Encryption));
    uint256 maxEncryption = MaxResourceCount.get(asteroidEntity, uint8(EResource.R_Encryption));
    assertEq(expectedEncryption, actualEncryption, "encryption");
    assertEq(expectedEncryption, maxEncryption, "maxEncryption");
  }

  function testFailNoAsteroidNoSource() public {
    LibAsteroid.createSecondaryAsteroid(PositionData(0, 0, 0));
  }
}
