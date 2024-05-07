import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Entity, defineComponentSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
// import { createAudioApi } from "@/game/api/audio";
import { createObjectApi } from "@/game/api/objects";
import { BaseAsteroid } from "@game/lib/objects/Asteroid/BaseAsteroid";
import { Fleet } from "@game/lib/objects/Fleet";
import { TransitLine } from "@game/lib/objects/TransitLine";
import { components } from "@/network/components";
import { world } from "@/network/world";

export const renderFleets = (scene: Scene) => {
  const systemsWorld = namespaceWorld(world, "systems");
  // const audioApi = createAudioApi(scene);
  const objects = createObjectApi(scene);
  const transitsToUpdate = new Set<Entity>();

  // handle rendering fleets if asteroid is not yet spawned
  const spawnQueue = new Map<Entity, Entity[]>();
  const unsub = scene.objects.onNewObject((id) => {
    const asteroidEntity = id as Entity;
    //does fleets exist in spawn queue
    const fleets = spawnQueue.get(asteroidEntity);

    if (fleets) {
      fleets.forEach((entity) => {
        handleFleetOrbit(entity, asteroidEntity);
      });
      spawnQueue.delete(asteroidEntity);
    }
  });

  function handleFleetTransit(fleet: Entity, origin: Entity, destination: Entity) {
    const originPosition = components.Position.get(origin) ?? { x: 0, y: 0 };
    const destinationPosition = components.Position.get(destination) ?? { x: 0, y: 0 };
    const originPixelPosition = tileCoordToPixelCoord(
      { x: originPosition.x, y: -originPosition.y },
      scene.tiled.tileWidth,
      scene.tiled.tileHeight
    );
    const destinationPixelPosition = tileCoordToPixelCoord(
      { x: destinationPosition.x, y: -destinationPosition.y },
      scene.tiled.tileWidth,
      scene.tiled.tileHeight
    );

    const fleetObject = getFleetObject(fleet);

    transitsToUpdate.add(fleet);
    const transitLine = getTransitLineObject(fleet);
    transitLine.setFleet(fleetObject);
    transitLine.setCoordinates(originPixelPosition, destinationPixelPosition);
  }

  function handleFleetOrbit(fleet: Entity, asteroidEntity: Entity) {
    const asteroid = objects.getAsteroid(asteroidEntity);

    if (!asteroid) {
      const queue = spawnQueue.get(asteroidEntity) ?? [];
      if (queue.length) queue.push(fleet);
      else spawnQueue.set(asteroidEntity, [fleet]);
      return;
    }

    if (!(asteroid instanceof BaseAsteroid)) return;

    const fleetObject = getFleetObject(fleet);

    asteroid.getOrbitRing().addFleet(fleetObject);
  }

  function getFleetObject(entity: Entity) {
    const fleet = objects.getFleet(entity);

    if (!fleet) {
      const newFleet = new Fleet(scene, { x: 0, y: 0 })
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        //   components.SelectedFleet.set({
        //     value: entity,
        //   });
        //   audioApi.play("Bleep", "ui");
        // })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          components.HoverEntity.set({
            value: entity,
          });
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          components.HoverEntity.remove();
        });
      scene.objects.add(entity, newFleet);
      return newFleet;
    }

    return fleet;
  }

  function getTransitLineObject(entity: Entity) {
    const transitLine = objects.getTransitLine(entity);

    if (!transitLine) {
      const newTransitLine = new TransitLine(scene, { x: 0, y: 0 }, { x: 0, y: 0 }).spawn();
      scene.objects.add(`transit_${entity}`, newTransitLine);
      return newTransitLine;
    }

    return transitLine;
  }

  defineComponentSystem(systemsWorld, components.FleetMovement, async (update) => {
    const [newMovement, oldMovement] = update.value;

    if (newMovement) {
      const time = components.Time.get()?.value ?? 0n;
      const arrivalTime = newMovement.arrivalTime ?? 0n;
      if (arrivalTime <= time) {
        handleFleetOrbit(update.entity, newMovement.destination as Entity);
      } else {
        handleFleetTransit(update.entity, newMovement.origin as Entity, newMovement.destination as Entity);
      }
    } else if (oldMovement) {
      const transitLine = objects.getTransitLine(update.entity);
      if (transitLine) {
        scene.objects.remove(`transit_${update.entity}`);
        transitsToUpdate.delete(update.entity);
      } else {
        const orbitRing = objects.getAsteroid(oldMovement.destination as Entity)?.getOrbitRing();
        const fleet = objects.getFleet(update.entity);
        if (fleet) orbitRing?.removeFleet(fleet);
      }
    }
  });

  defineComponentSystem(systemsWorld, components.Time, ({ value }) => {
    const now = value[0]?.value ?? 0n;

    transitsToUpdate.forEach((transit) => {
      const transitObj = objects.getTransitLine(transit);

      if (!transitObj) return;

      const movement = components.FleetMovement.get(transit);

      if (!movement) return;

      const timeTraveled = now - movement.sendTime;
      const totaltime = movement.arrivalTime - movement.sendTime;

      const progress = Number(timeTraveled) / Number(totaltime);

      transitObj.setFleetProgress(progress);

      if (progress >= 1) {
        const fleet = objects.getFleet(transit);
        const orbitRing = objects.getAsteroid(movement.destination as Entity)?.getOrbitRing();

        if (orbitRing && fleet) {
          orbitRing.addFleet(fleet);
          scene.objects.remove(`transit_${transit}`);
        }

        transitsToUpdate.delete(transit);
      }
    });
  });

  systemsWorld.registerDisposer(() => {
    unsub();
  });
};
