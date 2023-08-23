import { Scene } from "engine/types";
import {
  namespaceWorld,
  Has,
  defineEnterSystem,
  // defineUpdateQuery,
  EntityIndex,
} from "@latticexyz/recs";
import {
  ObjectPosition,
  SetValue,
} from "../../common/object-components/common";
import { Outline, Texture } from "../../common/object-components/sprite";
import { AsteroidType, Position } from "src/network/components/chainComponents";
import { world } from "src/network/world";
import { ActiveAsteroid } from "src/network/components/clientComponents";

export const renderAsteroid = (scene: Scene) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");

  const query = [Has(AsteroidType)];

  const render = ({ entity }: { entity: EntityIndex }) => {
    const entityId = world.entities[entity];
    const asteroidObjectGroup = scene.objectPool.getGroup("asteroid_" + entity);
    const coord = Position.get(entityId);

    const activeAsteroid = ActiveAsteroid.get()?.value;

    if (!coord) return;

    asteroidObjectGroup.add("Sprite").setComponents([
      ObjectPosition({
        x: coord.x * tileWidth,
        y: -coord.y * tileHeight,
      }),
      SetValue({
        originX: 0.5,
        originY: 0.5,
      }),
      Texture("asteroid-sprite"),
      activeAsteroid && activeAsteroid === entityId
        ? Outline({ color: 0xffffff })
        : undefined,
    ]);
  };

  defineEnterSystem(gameWorld, query, render);
};
