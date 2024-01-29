// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { LibFleetRaid } from "libraries/fleet/LibFleetRaid.sol";

contract S_FleetBattleResolveRaidSystem is PrimodiumSystem {
  function resolveBattleRaid(bytes32 battleId, bytes32 raider, bytes32 target) public {
    LibFleetRaid.resolveBattleRaid(battleId, raider, target);
  }
}
