import {
  EntityIndex,
  Has,
  defineEnterSystem,
  defineUpdateSystem,
  namespaceWorld,
  EntityID,
} from "@latticexyz/recs";
import { Scene } from "engine/types";

import { world } from "src/network/world";

import { MainBase, Position } from "src/network/components/chainComponents";
import { createCameraApi } from "src/game/api/camera";
import { SelectedTile } from "src/network/components/clientComponents";

export const focusMainbase = (scene: Scene, player: EntityID) => {
  const { pan } = createCameraApi(scene);
  const gameWorld = namespaceWorld(world, "game");

  const query = [Has(MainBase)];

  const handleMove = ({ entity }: { entity: EntityIndex }) => {
    const entityId = world.entities[entity];
    if (entityId !== player) return;

    const mainBase = MainBase.get(player)?.value;

    if (!mainBase) return;

    const mainBaseCoord = Position.get(mainBase);
    if (!mainBaseCoord) return;
    pan(mainBaseCoord, 0);
    SelectedTile.remove();
  };

  defineEnterSystem(gameWorld, query, handleMove);

  defineUpdateSystem(gameWorld, query, handleMove);
};
