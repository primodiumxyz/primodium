import {
  ComponentUpdate,
  Has,
  Not,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  getComponentValue,
} from "@latticexyz/recs";
import { Network } from "src/network/layer";
import { Scene } from "src/engine/types";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { createSelectionTile } from "../factory/selectionTile";
import { primodium } from "@game/api";

export const renderSelectionTile = (scene: Scene, network: Network) => {
  const { world, offChainComponents } = network;
  const { tileWidth, tileHeight } = scene.tilemap;

  const query = [Has(offChainComponents.SelectedTile)];

  const render = (update: ComponentUpdate) => {
    const entityIndex = update.entity;
    const objGraphicsIndex = update.entity + "_selectionTile" + "_graphics";

    // Avoid updating on optimistic overrides
    if (
      typeof entityIndex !== "number" ||
      entityIndex >= world.entities.length
    ) {
      return;
    }

    const tileCoord = getComponentValue(
      offChainComponents.SelectedTile,
      entityIndex
    );

    if (!tileCoord) return;

    const pixelCoord = tileCoordToPixelCoord(tileCoord, tileWidth, tileHeight);

    const selectionTileGraphicsEmbodiedEntity = scene.objectPool.get(
      objGraphicsIndex,
      "Graphics"
    );

    selectionTileGraphicsEmbodiedEntity.setComponent(
      createSelectionTile({
        id: objGraphicsIndex,
        x: pixelCoord.x,
        y: -pixelCoord.y,
        tileWidth,
        tileHeight,
      })
    );
  };

  defineEnterSystem(world, query, (update) => {
    render(update);
    console.info(
      "[ENTER SYSTEM](renderSelectionTile) Selection tile has been added"
    );
  });

  defineUpdateSystem(world, query, render);

  defineExitSystem(world, query, (update) => {
    const objGraphicsIndex = update.entity + "_selectionTile" + "_graphics";
    scene.objectPool.remove(objGraphicsIndex);

    primodium.components.selectedTile(network).remove();

    console.info(
      "[EXIT SYSTEM](renderSelectionTile) Selection tile has been removed"
    );
  });
};
