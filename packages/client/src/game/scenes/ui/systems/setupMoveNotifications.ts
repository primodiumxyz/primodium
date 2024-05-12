import { Entity, defineComponentSystem, namespaceWorld } from "@latticexyz/recs";
import { PrimodiumScene } from "@/game/api/scene";
import { world } from "@/network/world";
import { components } from "@/network/components";

export function setupMoveNotifications(scene: PrimodiumScene) {
  const systemWorld = namespaceWorld(world, "systems");
  const { FleetMovement, BlockNumber, Position } = components;
  const fleetTransitQueue = new Map<Entity, bigint>();

  defineComponentSystem(systemWorld, FleetMovement, (update) => {
    const ownerRock = components.OwnedBy.get(update.entity)?.value as Entity | undefined;
    const ownerRockOwner = components.OwnedBy.get(ownerRock)?.value;
    const player = components.Account.get()?.value;
    const now = components.Time.get()?.value ?? 0n;
    const entity = update.entity;

    const arrival = update.value[0];
    if (!arrival || now == 0n) return;

    if (!ownerRockOwner || ownerRockOwner !== player) return;

    //it has arrived
    if (arrival.sendTime + 30n < now || arrival.arrivalTime - 5n) {
      return;
    }
    const minutes = (arrival.arrivalTime - now) / 60n;
    const seconds = (arrival.arrivalTime - now) % 60n;
    const output = minutes > 0 ? `${minutes} minute(s)` : `${seconds} seconds`;

    if (arrival.arrivalTime > now) scene.notify("info", `Your fleet is en route and will arrive in ${output}.`);
    fleetTransitQueue.set(entity, arrival.arrivalTime);
  });

  defineComponentSystem(systemWorld, BlockNumber, () => {
    const now = components.Time.get()?.value ?? 0n;

    fleetTransitQueue.forEach((arrivalTime, entityId) => {
      const arrival = FleetMovement.get(entityId);

      if (!arrival || now == 0n) return;

      const destination = Position.get(arrival.destination as Entity);
      if (now > arrivalTime) {
        scene.notify("info", `Your fleet has arrived at [${destination?.x ?? 0}, ${destination?.y ?? 0}].`);

        fleetTransitQueue.delete(entityId);
      }
    });
  });
}
