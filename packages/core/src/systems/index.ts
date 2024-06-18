import { Mode } from "@/lib";
import { Core } from "@/lib/types";
import { setupBattleComponents } from "@/systems/setupBattleComponents";
import { setupBlockNumber } from "@/systems/setupBlockNumber";
import { setupBuildingReversePosition } from "@/systems/setupBuildingReversePosition";
import { setupBuildRock } from "@/systems/setupBuildRock";
import { setupDoubleCounter } from "@/systems/setupDoubleCounter";
import { setupHangar } from "@/systems/setupHangar";
import { setupHomeAsteroid } from "@/systems/setupHomeAsteroid";
import { setupLeaderboard } from "@/systems/setupLeaderboard";
import { setupTime } from "@/systems/setupTime";
import { setupTrainingQueues } from "@/systems/setupTrainingQueues";
import { setupWormholeResource } from "@/systems/setupWormholeResource";

export function runCoreSystems(core: Core) {
  core.network.world.dispose("coreSystems");
  const { tables } = core;

  tables.SelectedMode.set({ value: Mode.Asteroid });
  setupHomeAsteroid(core);
  setupBattleComponents(core);
  setupBlockNumber(core);
  setupBuildingReversePosition(core);
  setupBuildRock(core);
  setupDoubleCounter(core);
  setupHangar(core);
  setupLeaderboard(core);
  setupTime(core);
  setupTrainingQueues(core);
  setupWormholeResource(core);
}
