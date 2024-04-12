import { GameConfig } from "engine/types";
import { ASSET_PACK, KEY } from "../constants/common";

const gameConfig: GameConfig = {
  key: KEY,
  type: Phaser.WEBGL,
  parent: "phaser-container",
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  antialias: false,
  antialiasGL: false,
  roundPixels: true,
  transparent: true,
  pixelArt: true,
  fps: {
    limit: 60,
  },
  assetPackUrl: ASSET_PACK,
  dom: {
    createContainer: true,
    pointerEvents: "none",
  },
};

export default gameConfig;
