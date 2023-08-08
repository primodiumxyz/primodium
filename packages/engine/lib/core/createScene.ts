import {
  generateFrames,
  createCulling,
  createChunks,
  // createDebugger,
} from "@latticexyz/phaserx";

import createInput from "./createInput";
import { createPhaserScene } from "../util/createPhaserScene";
import { createCamera } from "./createCamera";
import { createScriptManager } from "./createScriptManager";
import { createTilemap } from "./createTilemap";
import { SceneConfig } from "../../types";
import { createObjectPool } from "./createObjectPool";

export const createScene = async (
  phaserGame: Phaser.Game,
  config: SceneConfig,
  autoStart: boolean = true
) => {
  const {
    camera: { minZoom, maxZoom, pinchSpeed, wheelSpeed, defaultZoom },
    tilemap: {
      chunkSize,
      tileWidth,
      tileHeight,
      layerConfig,
      tilesets,
      tileAnimations,
      animationInterval,
      backgroundTile,
    },
    cullingChunkSize,
    animations,
  } = config;

  if (!phaserGame) throw new Error("Phaser game not initialized");

  const phaserScene = createPhaserScene({
    key: config.key,
  });

  let scene = new phaserScene();

  phaserGame.scene.add(config.key, scene, autoStart);

  const camera = createCamera(scene.cameras.main, {
    maxZoom,
    minZoom,
    pinchSpeed,
    wheelSpeed,
    defaultZoom,
  });

  const tilemap = createTilemap(
    scene,
    // @ts-ignore
    camera,
    tileWidth,
    tileHeight,
    chunkSize,
    tilesets,
    layerConfig,
    tileAnimations,
    animationInterval,
    backgroundTile
  );

  //create sprite animations
  if (animations) {
    for (const anim of animations) {
      scene.anims.create({
        key: anim.key,
        frames: generateFrames(scene.anims, anim),
        frameRate: anim.frameRate,
        repeat: anim.repeat,
      });
    }
  }

  // Setup object pool
  const objectPool = createObjectPool(scene);

  // Setup chunks for viewport culling
  const cullingChunks = createChunks(
    camera.worldView$,
    cullingChunkSize * tileWidth
  );

  const scriptManager = createScriptManager(scene);

  // const debug = createDebugger(
  //   camera,
  //   cullingChunks,
  //   scene,
  //   objectPool,
  //   tilemap.map
  // );

  // Setup culling
  const culling = createCulling(
    //override since we modified embodied entity
    objectPool as any,
    camera,
    cullingChunks
  );

  const input = createInput(scene.input);

  camera.centerOn(0, 0);
  camera.setZoom(defaultZoom);

  return {
    phaserScene: scene,
    tilemap,
    scriptManager,
    camera,
    culling,
    objectPool,
    config,
    input,
    dispose: () => {
      input.dispose();
      tilemap.dispose();
      camera.dispose();
      culling.dispose();
    },
  };
};
