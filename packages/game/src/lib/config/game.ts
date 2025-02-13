import { Pack } from "@primodiumxyz/assets";
import { GameConfig } from "@primodiumxyz/engine/types";
import { KEY } from "@game/lib/constants/common";

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
  assetPack: Pack,
  dom: {
    createContainer: true,
    pointerEvents: "none",
  },
};

export default gameConfig;
