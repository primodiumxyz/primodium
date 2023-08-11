// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../PrimodiumTest.t.sol";
import { addressToEntity } from "solecs/utils.sol";
import { BuildSystem, ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { S_ClaimUnitsSystem, ID as S_ClaimUnitsSystemID } from "../../systems/S_ClaimUnitsSystem.sol";
import { TrainUnitsSystem, ID as TrainUnitsSystemID } from "../../systems/TrainUnitsSystem.sol";
import { DestroySystem, ID as DestroySystemID } from "../../systems/DestroySystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "../../systems/BuildPathSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "../../systems/UpgradeSystem.sol";

import { ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { ComponentDevSystem, ID as ComponentDevSystemID } from "../../systems/ComponentDevSystem.sol";
import { P_MaxBuildingsComponent, ID as P_MaxBuildingsComponentID } from "../../components/P_MaxBuildingsComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "../../components/OwnedByComponent.sol";
import { P_BlueprintComponent, ID as P_BlueprintComponentID } from "../../components/P_BlueprintComponent.sol";
import { ChildrenComponent, ID as ChildrenComponentID } from "../../components/ChildrenComponent.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "../../components/BuildingTypeComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "../../components/ItemComponent.sol";
import { LevelComponent, ID as BuildingComponentID } from "../../components/LevelComponent.sol";
import { PathComponent, ID as PathComponentID } from "../../components/PathComponent.sol";
import { P_RequiredResourcesComponent, ID as P_RequiredResourcesComponentID } from "../../components/P_RequiredResourcesComponent.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "../../components/BuildingTypeComponent.sol";
import { P_MaxStorageComponent, ID as P_MaxStorageComponentID } from "../../components/P_MaxStorageComponent.sol";
import { OccupiedUtilityResourceComponent, ID as OccupiedUtilityResourceComponentID } from "components/OccupiedUtilityResourceComponent.sol";
import { MaxUtilityComponent, ID as MaxUtilityComponentID } from "components/MaxUtilityComponent.sol";
import { WaterID, RegolithID, SandstoneID, AlluviumID, BiofilmID, BedrockID, AirID, CopperID, LithiumID, IronID, TitaniumID, IridiumID, OsmiumID, TungstenID, KimberliteID, UraniniteID, BolutiteID } from "../../prototypes.sol";
import { ElectricityUtilityResourceID } from "../../prototypes.sol";
import { BIGNUM } from "../../prototypes/Debug.sol";
//debug buildings
import "../../prototypes.sol";
import { Coord } from "../../types.sol";

import { LibBuilding } from "../../libraries/LibBuilding.sol";
import { LibBlueprint } from "../../libraries/LibBlueprint.sol";
import { LibEncode } from "../../libraries/LibEncode.sol";
import { LibMath } from "../../libraries/LibMath.sol";
import { LibTerrain } from "../../libraries/LibTerrain.sol";
import { ResourceValue, ResourceValues } from "../../types.sol";

contract TrainUnitSystem is PrimodiumTest {
  constructor() PrimodiumTest() {}

  BuildSystem public buildSystem;
  TrainUnitsSystem public trainUnitsSystem;
  S_ClaimUnitsSystem public s_claimUnitsSystem;
  UpgradeSystem public upgradeSystem;

  function setUp() public override {
    super.setUp();

    // init systems
    buildSystem = BuildSystem(system(BuildSystemID));
    trainUnitsSystem = TrainUnitsSystem(system(TrainUnitsSystemID));
    s_claimUnitsSystem = S_ClaimUnitsSystem(system(S_ClaimUnitsSystemID));
    upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    // init other
  }

  function testTrainUnits() public {
    vm.startPrank(alice);

    Coord memory coord1 = Coord({ x: -1, y: -1 });
    buildSystem.executeTyped(MainBaseID, coord1);

    coord1 = Coord({ x: 1, y: 2 });
    buildSystem.executeTyped(DebugHousingBuilding, coord1);

    coord2 = Coord({ x: 2, y: 2 });

    buildSystem.executeTyped(DebugUnitProductionBuilding, coord2);
    uint256 unitProductionBuildingEntity = LibEncode.encodeCoordEntity(coord2, BuildingKey);

    vm.roll(10);
    trainUnitsSystem.executeTyped(unitProductionBuildingEntity, DebugUnit, 10);
    vm.roll(30);
    s_claimUnitsSystem.executeTyped(alice);
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    uint256 playerUnitEntity = LibEncode.hashKeyEntity(DebugUnit, addressToEntity(alice));
    assertTrue(itemComponent.has(playerUnitEntity), "player should have units");
    assertEq(itemComponent.getValue(playerUnitEntity), 10, "player should have 10 units");

    vm.stopPrank();
  }

  function testTrainUnitsMidProduction() public {
    vm.startPrank(alice);

    Coord memory coord1 = Coord({ x: -1, y: -1 });
    buildSystem.executeTyped(MainBaseID, coord1);

    coord1 = Coord({ x: 1, y: 2 });
    buildSystem.executeTyped(DebugHousingBuilding, coord1);

    coord2 = Coord({ x: 2, y: 2 });

    buildSystem.executeTyped(DebugUnitProductionBuilding, coord2);
    uint256 unitProductionBuildingEntity = LibEncode.encodeCoordEntity(coord2, BuildingKey);

    vm.roll(10);
    trainUnitsSystem.executeTyped(unitProductionBuildingEntity, DebugUnit, 10);
    vm.roll(20);
    s_claimUnitsSystem.executeTyped(alice);
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    uint256 playerUnitEntity = LibEncode.hashKeyEntity(DebugUnit, addressToEntity(alice));
    assertTrue(itemComponent.has(playerUnitEntity), "player should have units");
    assertEq(itemComponent.getValue(playerUnitEntity), 5, "player should have 5 units");
    vm.roll(30);

    s_claimUnitsSystem.executeTyped(alice);
    assertEq(itemComponent.getValue(playerUnitEntity), 10, "player should have 10 units");

    vm.roll(40);
    s_claimUnitsSystem.executeTyped(alice);
    assertEq(itemComponent.getValue(playerUnitEntity), 10, "player should have 10 units");

    vm.stopPrank();
  }

  function testTrainUnitsUpgradeUnitProduction() public {
    vm.startPrank(alice);

    Coord memory coord1 = Coord({ x: -1, y: -1 });
    buildSystem.executeTyped(MainBaseID, coord1);

    coord1 = Coord({ x: 1, y: 2 });
    buildSystem.executeTyped(DebugHousingBuilding, coord1);

    coord2 = Coord({ x: 2, y: 2 });

    buildSystem.executeTyped(DebugUnitProductionBuilding, coord2);
    uint256 unitProductionBuildingEntity = LibEncode.encodeCoordEntity(coord2, BuildingKey);
    upgradeSystem.executeTyped(coord2);
    vm.roll(10);
    trainUnitsSystem.executeTyped(unitProductionBuildingEntity, DebugUnit, 10);
    vm.roll(20);
    s_claimUnitsSystem.executeTyped(alice);
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    uint256 playerUnitEntity = LibEncode.hashKeyEntity(DebugUnit, addressToEntity(alice));
    assertTrue(itemComponent.has(playerUnitEntity), "player should have units");
    assertEq(itemComponent.getValue(playerUnitEntity), 10, "player should have 10 units");

    vm.stopPrank();
  }

  function testFailTrainUnitsHousing() public {
    vm.startPrank(alice);

    Coord memory coord1 = Coord({ x: -1, y: -1 });
    buildSystem.executeTyped(MainBaseID, coord1);

    coord1 = Coord({ x: 1, y: 2 });
    buildSystem.executeTyped(DebugHousingBuilding, coord1);

    coord2 = Coord({ x: 2, y: 2 });

    buildSystem.executeTyped(DebugUnitProductionBuilding, coord2);
    uint256 unitProductionBuildingEntity = LibEncode.encodeCoordEntity(coord2, BuildingKey);
    upgradeSystem.executeTyped(coord2);
    vm.roll(10);
    trainUnitsSystem.executeTyped(unitProductionBuildingEntity, DebugUnit, 11);

    vm.stopPrank();
  }

  function buildMainBaseAtZero() internal returns (uint256) {
    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });
    bytes memory blockEntity = buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    uint256 blockEntityID = abi.decode(blockEntity, (uint256));
    return blockEntityID;
  }
}
