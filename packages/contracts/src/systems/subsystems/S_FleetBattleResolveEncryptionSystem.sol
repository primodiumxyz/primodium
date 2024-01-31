// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { LibFleetCombat } from "libraries/fleet/LibFleetCombat.sol";

contract S_FleetBattleResolveEncryptionSystem is PrimodiumSystem {
  function resolveBattleEncryption(bytes32 battleId, bytes32 aggressorEntity, bytes32 targetEntity) public {
    LibFleetCombat.resolveBattleEncryption(battleId, aggressorEntity, targetEntity);
  }
}
