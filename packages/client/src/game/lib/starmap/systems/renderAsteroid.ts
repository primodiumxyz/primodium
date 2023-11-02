import { Entity, Has, HasValue, Not, defineEnterSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
import { singletonIndex, world } from "src/network/world";
import { Depth, ObjectPosition, OnClick, OnComponentSystem, SetValue } from "../../common/object-components/common";
import { Outline, Texture } from "../../common/object-components/sprite";

import { Assets, DepthLayers, EntitytoSpriteKey, SpriteKeys } from "@game/constants";
import { Coord } from "@latticexyz/utils";
import { ERock } from "contracts/config/enums";
import { components } from "src/network/components";
import { SetupResult } from "src/network/types";
import { clampedIndex } from "src/util/common";
import { EntityType } from "src/util/constants";
import { getNow } from "src/util/time";
import { initializeMotherlodes } from "../utils/initializeMotherlodes";

export const renderAsteroid = (scene: Scene, mud: SetupResult) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");
  const playerEntity = mud.network.playerEntity;

  const render = (entity: Entity, coord: Coord) => {
    scene.objectPool.removeGroup("asteroid_" + entity);

    //TODO - fix conversion to Entity
    const ownedBy = components.OwnedBy.get(entity, {
      value: singletonIndex,
    }).value as Entity;

    const mainBaseEntity = components.Home.get(ownedBy, {
      mainBase: "-1" as Entity,
      asteroid: "-1" as Entity,
    }).mainBase as Entity;

    const mainBaseLevel = components.Level.get(mainBaseEntity, {
      value: 1n,
    }).value;

    const asteroidObjectGroup = scene.objectPool.getGroup("asteroid_" + entity);

    const sharedComponents = [
      ObjectPosition(
        {
          x: coord.x * tileWidth,
          y: -coord.y * tileHeight,
        },
        DepthLayers.Marker
      ),
      SetValue({
        originX: 0.5,
        originY: 0.5,
      }),
    ];

    const asteroidObject = asteroidObjectGroup.add("Sprite");

    asteroidObject.setComponents([
      ...sharedComponents,
      Texture(
        Assets.SpriteAtlas,
        EntitytoSpriteKey[EntityType.Asteroid][
          clampedIndex(Number(mainBaseLevel) - 1, EntitytoSpriteKey[EntityType.Asteroid].length)
        ]
      ),
      OnClick(
        scene,
        () => {
          components.Send.setDestination(entity);
        },
        true
      ),
    ]);

    const outlineSprite =
      SpriteKeys[`Asteroid${ownedBy === playerEntity ? "Player" : "Enemy"}` as keyof typeof SpriteKeys];

    const asteroidOutline = asteroidObjectGroup.add("Sprite");

    asteroidOutline.setComponents([
      ...sharedComponents,
      OnComponentSystem(components.Send, () => {
        if (components.Send.get()?.destination === entity) {
          if (asteroidOutline.hasComponent(Outline().id)) return;
          asteroidOutline.setComponent(Outline({ thickness: 1.5, color: 0xffa500 }));
          return;
        }

        if (asteroidOutline.hasComponent(Outline().id)) {
          asteroidOutline.removeComponent(Outline().id);
        }
      }),
      Texture(Assets.SpriteAtlas, outlineSprite),
    ]);

    const gracePeriod = asteroidObjectGroup.add("Sprite");
    gracePeriod.setComponents([
      ...sharedComponents,
      SetValue({
        scale: 0.75,
      }),
      OnComponentSystem(components.BlockNumber, (gameObject) => {
        const player = components.OwnedBy.get(entity)?.value as Entity | undefined;
        const graceTime = components.GracePeriod.get(player)?.value ?? 0n;
        const time = getNow();

        if (time >= graceTime) {
          gameObject.alpha = 0;
        } else {
          gameObject.alpha = 0.6;
        }
      }),
      Texture(Assets.SpriteAtlas, SpriteKeys.GracePeriod),
      Depth(DepthLayers.Marker + 1),
    ]);
  };

  const query = [
    Has(components.RockType),
    HasValue(components.RockType, { value: ERock.Asteroid }),
    Has(components.Position),
    Has(components.OwnedBy),
    Not(components.PirateAsteroid),
  ];

  defineEnterSystem(gameWorld, query, ({ entity }) => {
    const coord = components.Position.get(entity);

    if (!coord) return;

    render(entity, coord);
    initializeMotherlodes(entity, coord);
  });
};
