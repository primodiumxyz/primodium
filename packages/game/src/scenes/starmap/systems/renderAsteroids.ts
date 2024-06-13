import { Core, EntityType } from "@primodiumxyz/core";
import { $query, namespaceWorld } from "@primodiumxyz/reactive-tables";

import { PrimodiumScene } from "@/api/scene";
import { DeferredAsteroidsRenderContainer } from "@/lib/objects/asteroid/DeferredAsteroidsRenderContainer";
import { renderAsteroid } from "@/lib/render/renderAsteroid";
import { initializeSecondaryAsteroids } from "@/scenes/starmap/systems/utils/initializeSecondaryAsteroids";

export const renderAsteroids = (scene: PrimodiumScene, core: Core) => {
  const {
    tables,
    network: { world },
  } = core;

  const systemsWorld = namespaceWorld(world, "systems");

  const deferredAsteroidsRenderContainer = new DeferredAsteroidsRenderContainer({
    id: EntityType.Asteroid,
    scene,
    spawnCallback: async ({ scene, entity, coord, spawnsSecondary }) => {
      // TODO: not sure why this is needed but rendering of unitialized asteroids wont work otherwise
      await new Promise((resolve) => setTimeout(resolve, 0));

      const asteroid = renderAsteroid({
        scene,
        entity,
        coord,
        core,
        addEventHandlers: true,
      });

      if (spawnsSecondary) initializeSecondaryAsteroids(entity, coord, core);

      return asteroid;
    },
  });

  $query(
    systemsWorld,
    { with: [tables.Asteroid, tables.Position] },
    {
      onEnter: ({ entity }) => {
        const coord = tables.Position.get(entity);
        const asteroidData = tables.Asteroid.get(entity);

        if (!coord) return;

        deferredAsteroidsRenderContainer.add(entity, coord, {
          scene,
          entity,
          coord,
          spawnsSecondary: asteroidData?.spawnsSecondary ?? false,
        });
      },
    }
  );
};
