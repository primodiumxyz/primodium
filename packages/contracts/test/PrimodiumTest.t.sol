// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/store/src/MudTest.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";
import { ResourceSelector } from "@latticexyz/world/src/ResourceSelector.sol";

import "codegen/world/IWorld.sol";
import "codegen/Tables.sol";
import "codegen/Types.sol";
import "codegen/Prototypes.sol";
import "libraries/Libraries.sol";
import "src/Keys.sol";
import "src/PrimodiumTypes.sol";

struct PositionData2D {
  int32 x;
  int32 y;
}

contract PrimodiumTest is MudTest {
  IWorld public world;
  uint256 userNonce = 0;

  address payable alice;
  address payable bob;
  address payable eve;

  function setUp() public virtual override {
    super.setUp();
    world = IWorld(worldAddress);

    alice = getUser();
    bob = getUser();
    eve = getUser();
  }

  function addressToEntity(address a) internal pure returns (bytes32) {
    return bytes32(uint256(uint160((a))));
  }

  function getUser() internal returns (address payable) {
    address payable user = payable(address(uint160(uint256(keccak256(abi.encodePacked(userNonce++))))));
    vm.deal(user, 100 ether);
    return user;
  }

  modifier prank(address prankster) {
    vm.startPrank(prankster);
    _;
    vm.stopPrank();
  }

  function assertEq(PositionData memory coordA, PositionData memory coordB) internal {
    assertEq(coordA.x, coordB.x, "[assertEq]: x doesn't match");
    assertEq(coordA.y, coordB.y, "[assertEq]: y doesn't match");
    assertEq(coordA.parent, coordB.parent, "[assertEq]: parent doesn't match");
  }

  function assertEq(ERock a, ERock b) internal {
    assertEq(uint256(a), uint256(b));
  }

  function assertEq(
    ERock a,
    ERock b,
    string memory context
  ) internal {
    assertEq(uint256(a), uint256(b), context);
  }

  function logPosition(PositionData memory coord) internal view {
    console.log("x");
    console.logInt(coord.x);
    console.log("y");
    console.logInt(coord.y);
    console.log("parent", uint256(coord.parent));
  }

  function getPosition1(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord1 = PositionData2D(15, 12);
    return getPosition(coord1, player);
  }

  function getPosition2(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord2 = PositionData2D(23, 17);
    return getPosition(coord2, player);
  }

  function getPosition3(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord3 = PositionData2D(13, 8);
    return getPosition(coord3, player);
  }

  function getIronPosition(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord = PositionData2D(20, 8);
    return getPosition(coord, player);
  }

  function getCopperPosition(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord = PositionData2D(20, 15);
    return getPosition(coord, player);
  }

  function getNonIronPosition(address player) internal view returns (PositionData memory) {
    PositionData2D memory coord = PositionData2D(8, 15);
    return getPosition(coord, player);
  }

  function getPosition(
    int32 x,
    int32 y,
    address player
  ) internal view returns (PositionData memory coord) {
    return getPosition(PositionData2D(x, y), player);
  }

  function getPosition(PositionData2D memory coord2D, address player)
    internal
    view
    returns (PositionData memory coord)
  {
    bytes32 playerEntity = addressToEntity(player);
    bytes32 asteroid = LibEncode.getHash(worldAddress, playerEntity);

    coord = PositionData(coord2D.x, coord2D.y, asteroid);
  }

  function spawn(address player) internal returns (bytes32) {
    vm.prank(player);
    world.spawn();
    bytes32 playerEntity = addressToEntity(player);
    return HomeAsteroid.get(world, playerEntity);
  }
}
