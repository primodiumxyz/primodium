// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "std-contracts/test/MudTest.t.sol";
import { Deploy } from "./Deploy.sol";
import { Coord } from "../types.sol";
import { addressToEntity, getAddressById } from "systems/internal/PrimodiumSystem.sol";

import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { MainBaseComponent, ID as MainBaseComponentID } from "components/MainBaseComponent.sol";

import { BuildSystem, ID as BuildSystemID } from "systems/BuildSystem.sol";

import "../prototypes.sol";

// only for use privately
struct Coord2D {
  int32 x;
  int32 y;
}

contract PrimodiumTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  uint256 public dummyBuilding = uint256(bytes32("dummy"));

  function setUp() public virtual override {
    super.setUp();
  }

  modifier prank(address prankster) {
    vm.startPrank(prankster);
    _;
    vm.stopPrank();
  }

  function assertCoordEq(Coord memory coordA, Coord memory coordB) internal {
    assertEq(coordA.x, coordB.x, "[assertEq]: x doesn't match");
    assertEq(coordA.y, coordB.y, "[assertEq]: y doesn't match");
    assertEq(coordA.parent, coordB.parent, "[assertEq]: parent doesn't match");
  }

  function getOrigin(address player) internal view returns (Coord memory) {
    Coord2D memory origin = Coord2D(0, 0);
    return getCoord(origin, player);
  }

  function getCoord1(address player) internal view returns (Coord memory) {
    Coord2D memory coord1 = Coord2D(4, 0);
    return getCoord(coord1, player);
  }

  function getCoord2(address player) internal view returns (Coord memory) {
    Coord2D memory coord2 = Coord2D(8, 0);
    return getCoord(coord2, player);
  }

  function getIronCoord(address player) internal view returns (Coord memory) {
    Coord2D memory coord = Coord2D(-5, 2);
    return getCoord(coord, player);
  }

  function getCopperCoord(address player) internal view returns (Coord memory) {
    Coord2D memory coord = Coord2D(-10, -4);
    return getCoord(coord, player);
  }

  function getNonIronCoord(address player) internal view returns (Coord memory) {
    Coord2D memory coord = Coord2D(6, 2);
    return getCoord(coord, player);
  }

  function getCoord(int32 x, int32 y, address player) internal view returns (Coord memory coord) {
    return getCoord(Coord2D(x, y), player);
  }

  function getCoord(Coord2D memory coord2D, address player) internal view returns (Coord memory coord) {
    coord = Coord(coord2D.x, coord2D.y, 0);
  }

  function assertFalse(bool input) internal {
    assertTrue(!input);
  }

  function assertFalse(bool input, string memory message) internal {
    assertTrue(!input, message);
  }

  function buildMainBaseAtZero(address player) internal returns (uint256) {
    bytes memory blockEntity = BuildSystem(system(BuildSystemID)).executeTyped(MainBaseID, getOrigin(player));

    uint256 blockEntityID = abi.decode(blockEntity, (uint256));
    return blockEntityID;
  }

  function spawn(address player) internal prank(player) returns (uint256) {
    return abi.decode(SpawnSystem(system(SpawnSystemID)).executeTyped(), (uint256));
  }
}
