// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../PrimodiumTest.t.sol";

contract UpgradeRangeSystemTest is PrimodiumTest {
  function setUp() public override {
    super.setUp();
    spawn(alice);
  }

  function testOutOfBounds() public {
    vm.startPrank(alice);
    bytes32 aliceEntity = addressToEntity(alice);
    bytes32 asteroid = Home.getAsteroid(aliceEntity);

    Bounds memory bounds = LibBuilding.getPlayerBounds(aliceEntity);
    vm.expectRevert(bytes("[BuildSystem] Building out of bounds"));
    world.build(EBuilding.IronMine, PositionData(bounds.maxX + 1, bounds.maxY, asteroid));
  }

  //   function testUpgradeRangeResources() public {
  //     vm.startPrank(alice);
  //     vm.expectRevert(bytes("[SpendRequiredResourcesSystem] Not enough resources"));
  //     upgradeRangeSystem.executeTyped();
  //   }

  //   function testUpgradeRangeWrongBaseLevel() public {
  //     uint256 aliceEntity = addressToEntity(alice);
  //     vm.startPrank(alice);
  //     componentDevSystem.executeTyped(LevelComponentID, aliceEntity, abi.encode(5));

  //     require(levelComponent.has(ExpansionResearch6), "should have expansion research 6");
  //     vm.expectRevert(bytes("[UpgradeRangeSystem] MainBase level requirement not met"));
  //     upgradeRangeSystem.executeTyped();
  //   }

  function testUpgradeRangeMaxLevel() public {
    bytes32 aliceEntity = addressToEntity(alice);
    vm.startPrank(alice);
    // set player level to max level

    uint32 maxLevel = P_MaxLevel.get(ExpansionKey);
    bytes32[] memory keys = new bytes32[](1);
    keys[0] = aliceEntity;

    world.devSetRecord(LevelTableId, keys, Level.encode(maxLevel), Level.getValueSchema());
    assertEq(Level.get(aliceEntity), maxLevel);

    vm.expectRevert(bytes("[UpgradeRangeSystem] Max level reached"));
    world.upgradeRange();
  }

  function testUpgrade() public {
    bytes32 aliceEntity = addressToEntity(alice);
    vm.startPrank(alice);
    // ResourceValues memory resourceValues = P_RequiredResourcesComponent(component(P_RequiredResourcesComponentID))
    //   .getValue(ExpansionResearch2);
    // for (uint256 i = 0; i < resourceValues.resources.length; i++) {
    //   uint256 resource = resourceValues.resources[i];
    //   uint256 playerResourceEntity = LibEncode.hashKeyEntity(resource, aliceEntity);
    //   uint32 value = resourceValues.values[i];
    //   componentDevSystem.executeTyped(ItemComponentID, playerResourceEntity, abi.encode(value));
    // }

    uint32 level = Level.get(aliceEntity);
    // uint256 mainBaseEntity = MainBaseComponent(component(MainBaseComponentID)).getValue(aliceEntity);
    // componentDevSystem.executeTyped(LevelComponentID, mainBaseEntity, abi.encode(level + 1));

    world.upgradeRange();
    assertEq(Level.get(aliceEntity), level + 1);
  }
}
