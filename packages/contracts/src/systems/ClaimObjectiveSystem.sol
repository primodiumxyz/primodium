// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { EObjectives } from "src/Types.sol";
import { CompletedObjective, P_EnumToPrototype } from "codegen/index.sol";
import { ObjectiveKey } from "src/Keys.sol";
import { IWorld } from "codegen/world/IWorld.sol";
import { LibObjectives } from "libraries/LibObjectives.sol";

contract ClaimObjectiveSystem is PrimodiumSystem {
  /**
   * @notice Claims an objective for a player on a specific asteroid.
   * @dev Claims resources and units on the asteroid before proceeding with objective claim.
   *      Validates the player's ability to claim the objective and then awards the rewards.
   * @param asteroidEntity The unique identifier for the asteroid where the objective is being claimed.
   * @param objective The specific objective being claimed by the player.
   */
  function claimObjective(
    bytes32 asteroidEntity,
    EObjectives objective
  ) public _onlyAsteroidOwner(asteroidEntity) _claimResources(asteroidEntity) _claimUnits(asteroidEntity) {
    bytes32 playerEntity = _player();
    bytes32 objectivePrototype = P_EnumToPrototype.get(ObjectiveKey, uint8(objective));

    LibObjectives.checkObjectiveRequirements(playerEntity, asteroidEntity, objective);

    IWorld world = IWorld(_world());
    world.Pri_11__receiveRewards(asteroidEntity, objectivePrototype);

    CompletedObjective.set(playerEntity, objectivePrototype, true);
  }
}
