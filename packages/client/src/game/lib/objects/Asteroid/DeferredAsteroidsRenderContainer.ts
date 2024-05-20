import { Entity } from "@latticexyz/recs";
import { Coord } from "engine/types";
import { PrimodiumScene } from "@/game/api/scene";
import { BaseSpawnArgs, DeferredRenderContainer } from "@/game/lib/objects/DeferredRenderContainer";
import { FleetsContainer } from "@/game/lib/objects/Asteroid/FleetsContainer";
import { BaseAsteroid } from "@/game/lib/objects/Asteroid/BaseAsteroid";
import { components } from "@/network/components";

type AsteroidSpawnArgs = BaseSpawnArgs & {
  spawnsSecondary: boolean;
};

export class DeferredAsteroidsRenderContainer extends DeferredRenderContainer<BaseAsteroid, AsteroidSpawnArgs> {
  private asteroids: Map<Entity, BaseAsteroid> = new Map();
  private fleetsContainers: Map<string, FleetsContainer> = new Map();
  // remember coords of asteroid around which fleets are orbiting when the asteroid is not yet spawned
  private orbitingFleetCoord: Map<Entity, Coord> = new Map();

  constructor(args: {
    id: Entity;
    scene: PrimodiumScene;
    spawnCallback: (args: AsteroidSpawnArgs) => BaseAsteroid | undefined;
    isShard?: boolean;
  }) {
    super({ ...args, objectApiType: "asteroid" });
  }

  add(entity: Entity, coord: Coord, spawnArgs: AsteroidSpawnArgs) {
    super.add(entity, coord, spawnArgs);

    // register the fleets container so the asteroid can grab it when spawning
    const pixelCoord = this._scene.utils.tileCoordToPixelCoord(coord);
    this.fleetsContainers.set(entity, new FleetsContainer(this._scene, { x: pixelCoord.x, y: -pixelCoord.y }));
  }

  spawn(entity: Entity) {
    const asteroid = super.spawn(entity);
    if (asteroid) this.asteroids.set(entity, asteroid);
    return asteroid;
  }

  getFleetsContainers(entity: Entity) {
    // in case it's accessed after the object was spawned
    const obj = this._scene.objects.asteroid.get(entity);
    if (obj) return obj.getFleetsContainer();

    return this.fleetsContainers.get(entity);
  }

  addFleet(entity: Entity, asteroid: Entity) {
    const coord = components.Position.get(asteroid);
    if (!coord) {
      this.orbitingFleetCoord.set(entity, { x: 0, y: 0 });
      return;
    }

    this.orbitingFleetCoord.set(entity, coord);
  }

  removeFleet(entity: Entity) {
    this.orbitingFleetCoord.delete(entity);
  }

  getFleetCoord(entity: Entity) {
    return this.orbitingFleetCoord.get(entity);
  }
}
