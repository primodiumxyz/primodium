// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/console.sol";

import { Deploy } from "../Deploy.sol";
import { MudTest } from "std-contracts/test/MudTest.t.sol";
import { addressToEntity } from "solecs/utils.sol";

import { BuildSystem, ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "../../systems/BuildPathSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "../../systems/DestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "../../systems/ClaimFromMineSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "../../systems/UpgradeSystem.sol";
import { DebugRemoveBuildingRequirementsSystem, ID as DebugRemoveBuildingRequirementsSystemID } from "../../systems/DebugRemoveBuildingRequirementsSystem.sol";
import { DebugRemoveUpgradeRequirementsSystem, ID as DebugRemoveUpgradeRequirementsSystemID } from "../../systems/DebugRemoveUpgradeRequirementsSystem.sol";

import { PathComponent, ID as PathComponentID } from "../../components/PathComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "../../components/ItemComponent.sol";
import { BuildingComponent, ID as BuildingComponentID } from "../../components/BuildingComponent.sol";
// import { MainBaseID, DebugNodeID, RegolithID, IronID, LithiumMinerID } from "../../prototypes/Tiles.sol";
import { MainBaseID, IronMineID, CopperMineID } from "../../prototypes/Tiles.sol";
import { MainBaseID, DebugNodeID, MinerID } from "../../prototypes/Tiles.sol";
import { WaterID, RegolithID, SandstoneID, AlluviumID, LithiumMinerID, BiofilmID, BedrockID, AirID, CopperID, LithiumID, IronID, TitaniumID, IridiumID, OsmiumID, TungstenID, KimberliteID, UraniniteID, BolutiteID } from "../../prototypes/Tiles.sol";
import { BuildingKey } from "../../prototypes/Keys.sol";
import { LibTerrain } from "../../libraries/LibTerrain.sol";
import { LibEncode } from "../../libraries/LibEncode.sol";
import { Coord } from "../../types.sol";

contract ClaimSystemTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function setUp() public override {
    super.setUp();
    vm.startPrank(deployer);
    vm.stopPrank();
  }

  function testClaimOnBuildPath() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);

    DebugRemoveBuildingRequirementsSystem debugRemoveBuildingRequirementsSystem = DebugRemoveBuildingRequirementsSystem(
      system(DebugRemoveBuildingRequirementsSystemID)
    );
    debugRemoveBuildingRequirementsSystem.executeTyped(IronMineID);
    buildSystem.executeTyped(IronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 10 iron");

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 20, "Alice should have 20 iron");

    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 30, "Alice should have 30 iron");

    vm.stopPrank();
  }

  function testClaimOnDestroyPath() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    DestroyPathSystem destroyPathSystem = DestroyPathSystem(system(DestroyPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);
    DebugRemoveBuildingRequirementsSystem debugRemoveBuildingRequirementsSystem = DebugRemoveBuildingRequirementsSystem(
      system(DebugRemoveBuildingRequirementsSystemID)
    );
    debugRemoveBuildingRequirementsSystem.executeTyped(IronMineID);
    buildSystem.executeTyped(IronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 100 iron");
    destroyPathSystem.executeTyped(coord);

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 200 iron");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 20, "Alice should have 300 iron");

    vm.stopPrank();
  }

  function testClaimOnUpgrade() public {
    vm.startPrank(alice);

    BuildingComponent buildingComponent = BuildingComponent(component(BuildingComponentID));

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);
    DebugRemoveBuildingRequirementsSystem debugRemoveBuildingRequirementsSystem = DebugRemoveBuildingRequirementsSystem(
      system(DebugRemoveBuildingRequirementsSystemID)
    );
    debugRemoveBuildingRequirementsSystem.executeTyped(IronMineID);
    buildSystem.executeTyped(IronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 30 iron");

    DebugRemoveUpgradeRequirementsSystem debugRemoveUpgradeRequirementsSystem = DebugRemoveUpgradeRequirementsSystem(
      system(DebugRemoveUpgradeRequirementsSystemID)
    );
    debugRemoveUpgradeRequirementsSystem.executeTyped(IronMineID);
    upgradeSystem.executeTyped(coord);

    assertEq(
      buildingComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)),
      2,
      "IronMine should be level 2"
    );
    vm.roll(20);

    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 30, "Alice should have 30 iron");
    upgradeSystem.executeTyped(coord);
    assertEq(
      buildingComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)),
      3,
      "IronMine should be level 3"
    );

    vm.roll(30);

    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 60, "Alice should have 60 iron");

    vm.stopPrank();
  }

  // claim two resources
  function testClaimTwoResources() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));

    // Resource and crafted components
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: current generation seed
    Coord memory IronCoord = Coord({ x: -5, y: 2 });
    Coord memory CopperCoord = Coord({ x: -10, y: -4 });
    assertEq(LibTerrain.getTopLayerKey(IronCoord), IronID);
    assertEq(LibTerrain.getTopLayerKey(CopperCoord), CopperID);

    Coord memory mainBaseCoord = Coord({ x: -5, y: -4 });
    buildSystem.executeTyped(MainBaseID, mainBaseCoord);

    DebugRemoveBuildingRequirementsSystem debugRemoveBuildingRequirementsSystem = DebugRemoveBuildingRequirementsSystem(
      system(DebugRemoveBuildingRequirementsSystemID)
    );
    debugRemoveBuildingRequirementsSystem.executeTyped(IronMineID);
    debugRemoveBuildingRequirementsSystem.executeTyped(CopperMineID);

    buildSystem.executeTyped(IronMineID, IronCoord);
    buildSystem.executeTyped(CopperMineID, CopperCoord);
    vm.roll(0);
    // Iron to main base
    buildPathSystem.executeTyped(IronCoord, mainBaseCoord);
    // Copper to main base
    buildPathSystem.executeTyped(CopperCoord, mainBaseCoord);
    // START CLAIMING

    vm.roll(20);

    claimSystem.executeTyped(mainBaseCoord);
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceCopperKey = LibEncode.hashKeyEntity(CopperID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceCopperKey));
    assertEq(itemComponent.getValue(hashedAliceCopperKey), 20);
    assertEq(itemComponent.getValue(hashedAliceIronKey), 20);

    vm.stopPrank();
  }
}
