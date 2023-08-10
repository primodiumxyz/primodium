// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/console.sol";

import "../PrimodiumTest.t.sol";

import { MainBaseID, WaterID, RegolithID, SandstoneID, AlluviumID, BiofilmID, BedrockID, AirID, CopperID, LithiumID, IronID, TitaniumID, IridiumID, OsmiumID, TungstenID, KimberliteID, UraniniteID, BolutiteID } from "../../prototypes.sol";

import { LibTerrain } from "../../libraries/LibTerrain.sol";
import { Coord } from "../../types.sol";

contract BuildSystemTest is PrimodiumTest {
  constructor() PrimodiumTest() {}

  function setUp() public override {
    super.setUp();
  }

  function testTerrain() public {
    assertEq(LibTerrain.getResourceByCoord(world, Coord(7, 0, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(7, 1, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(7, 35, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(7, 36, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 0, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 1, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 2, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 3, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 4, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 5, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 6, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 7, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 8, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 9, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 10, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 11, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 13, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 14, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 20, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 21, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 22, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 23, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 24, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 25, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 26, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 27, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 28, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 29, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 30, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 31, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 32, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 33, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 34, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 35, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(8, 36, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 0, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 1, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 5, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 9, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 13, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 14, 0)), LithiumID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 20, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 21, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 22, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 23, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 24, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 25, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 26, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 27, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 28, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 29, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 30, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 31, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 32, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 33, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 34, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 35, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(9, 36, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 25, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 26, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 27, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 29, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 35, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(10, 36, 0)), IronID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 0, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 1, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 4, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 5, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 8, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 9, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 13, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 14, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 20, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 21, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 22, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 23, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 25, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 26, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 27, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 28, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 29, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 30, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 31, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 32, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 33, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 34, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 35, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(15, 36, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 0, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 1, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 4, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 5, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 8, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 9, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 13, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 14, 0)), SulfurID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 20, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 21, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 22, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 23, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 26, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 28, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 30, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 32, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 34, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 35, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(16, 36, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(17, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(17, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(17, 35, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(17, 36, 0)), CopperID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(18, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(18, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(19, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(19, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(20, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(20, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(21, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(21, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(22, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(22, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(23, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(23, 17, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(24, 16, 0)), WaterID);
    assertEq(LibTerrain.getResourceByCoord(world, Coord(24, 17, 0)), WaterID);
  }
}