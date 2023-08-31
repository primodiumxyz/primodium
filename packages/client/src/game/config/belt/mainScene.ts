// import { SceneConfig } from "../../types";
import { SceneConfig } from "engine/types";
import { BeltMap } from "../../constants";
import { animationConfig } from "./animation";
import { tileAnimationConfig } from "./tileAnimation";

const { Assets, Scenes, Tilesets } = BeltMap;

const mainSceneConfig: SceneConfig = {
  key: Scenes.Main,
  camera: {
    minZoom: Math.max(1, window.devicePixelRatio) * 0.25,
    maxZoom: window.devicePixelRatio * 3,
    defaultZoom: Math.max(1, window.devicePixelRatio) * 0.5,
    pinchSpeed: 0.01,
    wheelSpeed: 3,
  },
  animations: animationConfig,
  cullingChunkSize: 128,
  tilemap: {
    tileWidth: 32,
    tileHeight: 32,
    chunkSize: 128,
    tilesets: {
      [Tilesets.Grid]: {
        key: Assets.GridTileset,
        tileHeight: 32,
        tileWidth: 32,
      },
    },
    layerConfig: {
      layers: {
        Grid: {
          tilesets: [Tilesets.Grid],
        },
      },
      defaultLayer: Tilesets.Grid,
    },
    backgroundTile: [0],
    tileAnimations: tileAnimationConfig,
    animationInterval: 100,
  },
};

export default mainSceneConfig;
