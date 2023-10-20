// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

import { LibBattle } from "libraries/LibBattle.sol";
import { ESendType } from "src/Types.sol";
import { BattleResultData } from "codegen/index.sol";
import { LibPirate } from "libraries/LibPirate.sol";

contract S_SpawnPirateAsteroidSystem is PrimodiumSystem {
  /**
   * @dev Initiates a battle between two entities using the LibBattle library.
   * @param prototypeEntity The prototype which the pirate is spawned by.
   * @return asteroidEntity the spawned asteroid entity.
   */
  function spawnPirateAsteroid(bytes32 prototypeEntity) public returns (bytes32 asteroidEntity) {
    asteroidEntity = LibPirate.createPirateAsteroid(addressToEntity(_msgSender()), prototypeEntity);
  }
}
