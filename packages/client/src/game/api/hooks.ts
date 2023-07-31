import { pixelCoordToTileCoord } from "@latticexyz/phaserx";
import { Coord } from "@latticexyz/utils";
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useSettingsStore } from "../stores/SettingsStore";
import { GameReady } from "src/network/components/clientComponents";
import { Scene } from "engine/types";

export function createHooksApi(targetScene: Scene) {
  function useKeybinds() {
    return useSettingsStore((state) => state.keybinds);
  }

  function useCamera() {
    const [worldCoord, setWorldCoord] = useState<Coord>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(0);
    const gameStatus = GameReady.use();
    const minZoom = useRef(1);

    useEffect(() => {
      if (!gameStatus) {
        return;
      }

      const {
        camera,
        tilemap: { tileHeight, tileWidth },
        config: { camera: cameraconfig },
      } = targetScene;

      minZoom.current = cameraconfig.minZoom;

      const worldViewListener = camera?.worldView$.subscribe(
        throttle((worldView) => {
          const tileCoord = pixelCoordToTileCoord(
            { x: worldView.centerX, y: worldView.centerY },
            tileWidth,
            tileHeight
          );

          setWorldCoord({ x: tileCoord.x, y: -tileCoord.y });
        }, 100)
      );

      const zoomListener = camera?.zoom$.subscribe(throttle(setZoom, 100));

      return () => {
        worldViewListener?.unsubscribe();
        zoomListener?.unsubscribe();
      };
    }, [gameStatus]);

    const normalizedZoom = zoom / minZoom.current;

    return { worldCoord, zoom, normalizedZoom };
  }

  return {
    useKeybinds,
    useCamera,
  };
}
