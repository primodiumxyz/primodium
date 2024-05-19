// ROOT ENTRY POINT
import { GlobalApi } from "@/game/api/global";
import { createSceneApi, PrimodiumScene } from "@/game/api/scene";
import { rootSceneConfig } from "@game/lib/config/rootScene";
import { runSystems as runRootSystems } from "src/game/scenes/root/systems";

export const initRootScene = async (game: GlobalApi): Promise<PrimodiumScene> => {
  const scene = await game.createScene(rootSceneConfig, true);

  const sceneApi = createSceneApi(scene);
  sceneApi.audio.play("Background", "music");
  sceneApi.audio.play("Background2", "music", {
    loop: true,
    volume: 0,
  });
  sceneApi.audio.setPauseOnBlur(false);

  const runSystems = () => runRootSystems(sceneApi, game);
  return { ...sceneApi, runSystems, isPrimary: true };
};
