import { DepthLayers } from "@game/constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Entity, Has, defineComponentSystem, defineEnterSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { getRockRelationship } from "src/util/asteroid";
import { RockRelationship } from "src/util/constants";
import { entityToFleetName } from "src/util/name";
import { getAllOrbitingFleets } from "src/util/unit";
import {
  ObjectPosition,
  OnClickUp,
  OnComponentSystem,
  OnHover,
  OnOnce,
  SetValue,
} from "../../common/object-components/common";
import { Circle, Line } from "../../common/object-components/graphics";
import { ObjectText } from "../../common/object-components/text";

const orbitRadius = 64;
function calculatePosition(
  angleInDegrees: number,
  origin: { x: number; y: number },
  scale?: { tileWidth: number; tileHeight: number }
): { x: number; y: number } {
  const tileWidth = scale?.tileWidth ?? 1;
  const tileHeight = scale?.tileHeight ?? 1;
  const radians = (angleInDegrees * Math.PI) / 180; // Convert angle to radians
  const x = (orbitRadius / tileWidth) * Math.cos(radians); // Calculate x coordinate
  const y = (orbitRadius / tileHeight) * Math.sin(radians); // Calculate y coordinate

  return { x: x + origin.x, y: y + origin.y };
}

export const renderEntityOrbitingFleets = (rockEntity: Entity, scene: Scene) => {
  const objIndexSuffix = "_spacerockOrbits";
  const { tileWidth, tileHeight } = scene.tilemap;
  const playerEntity = components.Account.get()?.value;
  if (!playerEntity) return;
  const allFleets = getAllOrbitingFleets(rockEntity);
  const position = components.Position.get(rockEntity);
  scene.objectPool.removeGroup(rockEntity + objIndexSuffix);
  if (!position || allFleets.length == 0) return;

  const destination = components.Position.get(rockEntity);

  if (!destination) return;

  const destinationPixelCoord = tileCoordToPixelCoord({ x: destination.x, y: -destination.y }, tileWidth, tileHeight);

  const fleetOrbit = scene.objectPool.getGroup(rockEntity + objIndexSuffix);

  fleetOrbit.add("Graphics").setComponents([
    ObjectPosition(destinationPixelCoord, DepthLayers.Path),
    Circle(orbitRadius, {
      color: 0x363636,
      borderThickness: 1,
      alpha: 0,
    }),
    SetValue({
      input: null,
    }),
  ]);
  allFleets.forEach((fleet, i) => {
    const angle = ((i + 1) / allFleets.length) * 360 - 90;
    const owner = components.OwnedBy.get(fleet)?.value as Entity | undefined;
    const relationship = owner ? getRockRelationship(playerEntity, owner as Entity) : RockRelationship.Neutral;
    const color =
      relationship === RockRelationship.Ally ? 0x00ff00 : relationship === RockRelationship.Enemy ? 0xff0000 : 0x00ffff;
    const circlePositionAbs = calculatePosition(angle, destinationPixelCoord);
    const name = entityToFleetName(fleet, true);
    const sharedComponents = [ObjectPosition(circlePositionAbs, DepthLayers.Marker)];
    const fleetOrbitObject = fleetOrbit.add("Graphics");
    fleetOrbitObject.setComponents([
      ...sharedComponents,
      Circle(8, {
        color,
        borderThickness: 1,
        alpha: 0.75,
        position: circlePositionAbs,
      }),
      OnOnce((gameObject) => {
        const hoverSize = 16;
        gameObject.setInteractive(
          new Phaser.Geom.Rectangle(-hoverSize / 2, -hoverSize / 2, hoverSize, hoverSize),
          Phaser.Geom.Rectangle.Contains
        );
      }),
      OnHover(
        () => components.HoverEntity.set({ value: fleet }),
        () => components.HoverEntity.remove()
      ),
      OnComponentSystem(components.HoverEntity, (_, { value: [newVal, oldVal] }) => {
        if (oldVal?.value === fleet) {
          console.log("resetting");
          return fleetHomeLineObject.setComponent(SetValue({ alpha: 0 }));
        }
        if (newVal?.value !== fleet) return;
        const owner = components.OwnedBy.get(fleet)?.value as Entity | undefined;
        const ownerPosition = components.Position.get(owner);
        if (!ownerPosition) return;
        console.log("adding");
        fleetHomeLineObject.setComponents([
          ...sharedComponents,
          Line(tileCoordToPixelCoord({ x: ownerPosition.x, y: -ownerPosition.y }, tileWidth, tileHeight), {
            id: `homeLine`,
            thickness: Math.min(10, 3 / scene.camera.phaserCamera.zoom),
            alpha: 0.1,
            color: 0xffffff,
          }),
        ]);
      }),
      OnClickUp(scene, () => {
        if (relationship !== RockRelationship.Self) return;
        components.SelectedFleet.set({
          fleet,
          ...calculatePosition(angle - 180, { x: destination.x, y: destination.y }, { tileWidth, tileHeight }),
          angle,
        });
      }),
    ]);

    const fleetHomeLineObject = fleetOrbit.add("Graphics");

    const ownerPosition = components.Position.get(owner) ?? { x: 0, y: 0 };
    fleetHomeLineObject.setComponents([
      Line(tileCoordToPixelCoord({ x: ownerPosition.x, y: -ownerPosition.y }, tileWidth, tileHeight), {
        id: `homeLine`,
        thickness: Math.min(10, 3 / scene.camera.phaserCamera.zoom),
        alpha: 0,
        color: 0xffffff,
      }),
      OnComponentSystem(components.HoverEntity, (_, { value: [newVal] }) => {
        const alpha = newVal?.value === fleet ? 0.25 : 0;
        fleetHomeLineObject.setComponent(SetValue({ alpha: alpha }));
      }),
    ]);

    const fleetLabel = fleetOrbit.add("BitmapText");

    fleetLabel.setComponents([
      ...sharedComponents,
      SetValue({
        originX: 0.5,
        originY: 0.4,
        depth: DepthLayers.Marker + 1,
      }),
      ObjectText(name, {
        id: "fleetLabel",
        fontSize: 6,
        color: 0xffffff,
      }),
    ]);
  });
};

export const renderFleetsInOrbit = (scene: Scene) => {
  const systemsWorld = namespaceWorld(world, "systems");

  defineComponentSystem(systemsWorld, components.FleetMovement, (update) => {
    if (update.value[0]) renderEntityOrbitingFleets(update.value[0].destination as Entity, scene);
    if (update.value[1]) renderEntityOrbitingFleets(update.value[1].destination as Entity, scene);
  });

  defineEnterSystem(systemsWorld, [Has(components.SelectedFleet)], () => {
    components.SelectedRock.remove();
  });

  defineEnterSystem(systemsWorld, [Has(components.SelectedRock)], () => {
    components.SelectedFleet.remove();
  });
};
