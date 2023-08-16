// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IWorld } from "solecs/System.sol";
import { SingletonID } from "solecs/SingletonID.sol";

//components
import { ActiveComponent, ID as ActiveComponentID } from "components/ActiveComponent.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { AsteroidCountComponent, ID as AsteroidCountComponentID } from "components/AsteroidCountComponent.sol";
import { AsteroidTypeComponent, ID as AsteroidTypeComponentID } from "components/AsteroidTypeComponent.sol";
import { DimensionsComponent, ID as DimensionsComponentID } from "components/DimensionsComponent.sol";

import { Coord, Dimensions, EAsteroidType } from "../types.sol";

import { Trigonometry as Trig } from "trig/src/Trigonometry.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibMath } from "libraries/LibMath.sol";
import { ABDKMath64x64 as Math } from "abdk-libraries-solidity/ABDKMath64x64.sol";

library LibAsteroid {
  /**
   * @dev Creates a new asteroid for a player in the given world.
   * @param world The World contract address.
   * @param ownerEntity The entity ID of the owner player.
   * @return asteroidEntity The entity ID of the created asteroid.
   */
  function createAsteroid(IWorld world, uint256 ownerEntity) internal returns (uint256 asteroidEntity) {
    asteroidEntity = LibEncode.hashEntity(world, ownerEntity);

    AsteroidTypeComponent asteroidTypeComponent = AsteroidTypeComponent(world.getComponent(AsteroidTypeComponentID));
    PositionComponent positionComponent = PositionComponent(world.getComponent(PositionComponentID));
    AsteroidCountComponent asteroidCountComponent = AsteroidCountComponent(
      world.getComponent(AsteroidCountComponentID)
    );
    uint32 asteroidCount = LibMath.increment(asteroidCountComponent, SingletonID);
    require(!asteroidTypeComponent.has(asteroidEntity), "[LibAsteroid] asteroid already exists");

    Coord memory position = getUniqueAsteroidPosition(asteroidCount);

    positionComponent.set(asteroidEntity, position);
    asteroidTypeComponent.set(asteroidEntity, uint256(EAsteroidType.NORMAL));

    // For now, we will use this component to ensure the owner can only build on their asteroid.
    // TODO: remove this component later as it might be for temporary use.
    positionComponent.set(ownerEntity, 0, 0, asteroidEntity);
    uint256 encodedPosition = LibEncode.encodeCoord(position);

    // Mark the asteroid's position as active in the ActiveComponent.
    ActiveComponent(world.getComponent(ActiveComponentID)).set(encodedPosition);

    asteroidCountComponent.set(SingletonID, asteroidCount);
  }

  /**
   * @dev Gets a unique asteroid position for the player in the given world.
   * @return position The unique position (Coord) for the asteroid.
   */

  function getUniqueAsteroidPosition(uint32 asteroidCount) internal pure returns (Coord memory position) {
    position = getPositionByVector(getDistance(asteroidCount), getDirection(asteroidCount));
  }

  /**
   * @dev Calculates the position (x, y) based on a given distance and direction.
   * @param _distance The distance to be moved.
   * @param direction The direction angle in degrees.
   * @return Coord Returns a struct containing x and y coordinates.
   */
  function getPositionByVector(uint32 _distance, uint32 direction) internal pure returns (Coord memory) {
    uint32 angleDegs = (direction) % 360;

    uint256 angleRadsTimes10000 = uint256(angleDegs * 1745);

    uint256 angleRadsConverted = angleRadsTimes10000 * 1e13 + Trig.TWO_PI;

    int256 newX = Trig.cos(angleRadsConverted) * int32(_distance);

    int256 newY = Trig.sin(angleRadsConverted) * int32(_distance);

    int32 finalX = int32(newX / 1e18);
    int32 finalY = int32(newY / 1e18);

    return Coord({ x: finalX, y: finalY, parent: 0 });
  }

  /**
   * @dev Calculates the distance based on the given asteroid count.
   *      The equation is 260 * ln((asteroidCount + 105) / 10) - 580
   * @param asteroidCount Number of asteroids.
   * @return uint32 Returns the calculated distance.
   */
  function getDistance(uint32 asteroidCount) public pure returns (uint32) {
    int128 value = Math.add(Math.fromUInt(asteroidCount), Math.fromUInt(105));
    value = Math.div(value, Math.fromUInt(10));
    value = Math.ln(value);
    uint256 integer = Math.mulu(value, 260);
    return uint32(integer - 580);
  }

  /**
   * @dev Determines the general direction based on the given asteroid count.
   * @param asteroidCount Number of asteroids.
   * @return uint32 Returns the calculated direction.
   */
  function getDirection(uint32 asteroidCount) internal pure returns (uint32) {
    uint32 countMod27 = asteroidCount % 27;
    uint32 countMod3 = asteroidCount % 3;
    uint32 generalDirection = asteroidCount % 4;
    return generalDirection * 90 + countMod3 * 30 + countMod27;
  }
}
