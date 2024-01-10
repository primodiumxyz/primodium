import { AudioKeys, KeybindActions, Scenes } from "@game/constants";
import { useEffect } from "react";
import { FaCaretUp } from "react-icons/fa";
import { usePrimodium } from "src/hooks/usePrimodium";
import { components } from "src/network/components";
import { Button } from "../core/Button";
import { Join } from "../core/Join";

export const SelectAction: React.FC<{ isSpectating: boolean }> = ({ isSpectating }) => {
  const mapOpen = components.MapOpen.use(undefined, {
    value: false,
  }).value;

  const primodium = usePrimodium();
  const { transitionToScene } = primodium.api().scene;

  const closeMap = async () => {
    if (!components.MapOpen.get()?.value) return;
    await transitionToScene(
      Scenes.Starmap,
      Scenes.Asteroid,
      0,
      (_, targetScene) => {
        targetScene.camera.phaserCamera.fadeOut(0, 0, 0, 0);
      },
      (_, targetScene) => {
        targetScene.phaserScene.add.tween({
          targets: targetScene.camera.phaserCamera,
          zoom: { from: 0.5, to: 1 },
          duration: 500,
          ease: "Cubic.easeInOut",
          onUpdate: () => {
            targetScene.camera.zoom$.next(targetScene.camera.phaserCamera.zoom);
            targetScene.camera.worldView$.next(targetScene.camera.phaserCamera.worldView);
          },
        });
        targetScene.camera.phaserCamera.fadeIn(500, 0, 0, 0);
      }
    );
    components.MapOpen.set({ value: false });
    // components.SelectedRock.set({ value: homeAsteroid ?? singletonEntity });
  };

  const openMap = async () => {
    if (components.MapOpen.get()?.value) return;
    const activeRock = components.ActiveRock.get()?.value;
    const position = components.Position.get(activeRock) ?? { x: 0, y: 0 };
    const { pan } = primodium.api(Scenes.Starmap).camera;

    pan(position, 0);

    await transitionToScene(
      Scenes.Asteroid,
      Scenes.Starmap,
      0,
      (_, targetScene) => {
        targetScene.camera.phaserCamera.fadeOut(0, 0, 0, 0);
      },
      (_, targetScene) => {
        targetScene.phaserScene.add.tween({
          targets: targetScene.camera.phaserCamera,
          zoom: { from: 2, to: 1 },
          duration: 500,
          ease: "Cubic.easeInOut",
          onUpdate: () => {
            targetScene.camera.zoom$.next(targetScene.camera.phaserCamera.zoom);
            targetScene.camera.worldView$.next(targetScene.camera.phaserCamera.worldView);
          },
        });
        targetScene.camera.phaserCamera.fadeIn(500, 0, 0, 0);
      }
    );
    components.MapOpen.set({ value: true });
    components.SelectedBuilding.remove();
  };

  useEffect(() => {
    const starmapListener = primodium.api(Scenes.Starmap).input.addListener(KeybindActions.Map, closeMap);

    const asteroidListener = primodium.api(Scenes.Asteroid).input.addListener(KeybindActions.Map, openMap);

    return () => {
      starmapListener.dispose();
      asteroidListener.dispose();
    };
  }, []);

  return (
    <div className="flex z-10">
      <Join className="flex border-b border-x border-secondary rounded-t-none">
        <Button
          clickSound={AudioKeys.Sequence}
          onClick={closeMap}
          className={`flex-1 relative rounded-t-none rounded-r-none ${
            mapOpen ? "opacity-50" : "ring ring-accent z-10"
          }`}
        >
          {isSpectating && (
            <div className="flex flex-col gap-2 items-center p-2 w-16">
              <img src="img/icons/spectateicon.png" className="pixel-images w-12 h-12" />
              <p className="">SPECTATE</p>
            </div>
          )}
          {!isSpectating && (
            <div className="flex flex-col gap-2 items-center p-2 w-16">
              <img src="img/icons/minersicon.png" className="pixel-images w-12 h-12" />
              <p className="">BUILD</p>
            </div>
          )}
          {!mapOpen && <FaCaretUp size={22} className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-accent" />}
        </Button>
        <Button
          clickSound={AudioKeys.Sequence}
          onClick={openMap}
          className={`flex-1 rounded-t-none rounded-l-none disabled:opacity-100 ${
            !mapOpen ? "opacity-50" : "ring ring-accent z-10"
          }`}
        >
          {!isSpectating && (
            <div className="flex flex-col gap-2 items-center p-2 w-16">
              <img src="img/icons/starmapicon.png" className="pixel-images w-12 h-12" />
              <p className="">CONQUER</p>
            </div>
          )}
          {isSpectating && (
            <div className="flex flex-col gap-2 items-center p-2 w-16">
              <img src="img/icons/returnicon.png" className="pixel-images w-12 h-12" />
              <p className="">EXIT</p>
            </div>
          )}
          {mapOpen && <FaCaretUp size={22} className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-accent" />}
        </Button>
      </Join>
    </div>
  );
};
