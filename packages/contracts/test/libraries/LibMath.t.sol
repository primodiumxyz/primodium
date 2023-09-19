// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "test/PrimodiumTest.t.sol";

contract LibMathTest is PrimodiumTest {
  function setUp() public override {
    super.setUp();
  }

  function testFuzzPositionByVector(uint256 distance, uint256 direction) public {
    distance = distance % 100_000;
    direction = direction % 720;
    PositionData memory destination = LibMath.getPositionByVector(distance, direction);
    uint256 reverseDirection = direction + 180;
    PositionData memory origin = LibMath.getPositionByVector(distance, reverseDirection);
    origin = PositionData(origin.x + destination.x, origin.y + destination.y, 0);
    assertEq(origin, PositionData(0, 0, 0));
  }

  function testPositionByVector() public {
    uint256 distance = 100;
    uint256 direction = 85;
    PositionData memory destination = LibMath.getPositionByVector(distance, direction);
    uint256 reverseDirection = direction + 180;
    PositionData memory origin = LibMath.getPositionByVector(distance, reverseDirection);
    origin = PositionData(origin.x + destination.x, origin.y + destination.y, 0);
    assertEq(origin, PositionData(0, 0, 0));
  }

  function testPrintPositions() public view {
    uint256 distance = 100;
    uint256 max = 13;
    for (uint256 i = 0; i < max; i++) {
      PositionData memory coord = LibMath.getPositionByVector(distance, (i * 360) / max);
      logPosition(coord);
    }
  }
}
