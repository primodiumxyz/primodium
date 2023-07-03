import {
  ComponentUpdate,
  EntityID,
  Has,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  getComponentValue,
} from "@latticexyz/recs";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";

import { Coord } from "@latticexyz/utils";

import { createBuilding } from "../factory/building";
import { Network } from "src/network/layer";
import { Scene } from "src/engine/types";

export const renderBuildingSprites = (scene: Scene, network: Network) => {
  const { world, components } = network;
  const { tileHeight, tileWidth } = scene.tilemap;
  const objIndexSuffix = "_entitySprite";

  const query = [Has(components.Position), Has(components.Tile)];

  const render = (update: ComponentUpdate) => {
    const entityIndex = update.entity;
    const objIndex = entityIndex + objIndexSuffix;

    // Avoid updating on optimistic overrides
    if (
      typeof entityIndex !== "number" ||
      entityIndex >= world.entities.length
    ) {
      return;
    }

    const tilePosition = update.value[0];

    const tile = getComponentValue(components.Tile, entityIndex);
    const tileEntityId = tile?.value as unknown as EntityID;

    const pixelCoord = tileCoordToPixelCoord(
      tilePosition as Coord,
      tileWidth,
      tileHeight
    );

    if (!scene.objectPool.objects.has(objIndex)) {
      const buildingEmbodiedEntity = scene.objectPool.get(objIndex, "Sprite");

      const buildingComponent = createBuilding({
        id: objIndex,
        x: pixelCoord.x,
        y: -pixelCoord.y,
        tile: tileEntityId,
      });

      buildingEmbodiedEntity.setComponent(buildingComponent);
    }
  };

  defineEnterSystem(world, query, render);
  defineUpdateSystem(world, query, render);

  defineExitSystem(world, query, (update) => {
    const objIndex = update.entity + objIndexSuffix;
    scene.objectPool.remove(objIndex);
  });
};
