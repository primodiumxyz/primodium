import { Assets, DepthLayers, RENDER_INTERVAL, SpriteKeys } from "@game/constants";
import { Entity, Has, Not, defineComponentSystem, defineEnterSystem, namespaceWorld } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { Coord } from "@latticexyz/utils";
import { EFleetStance } from "contracts/config/enums";
import { Scene } from "engine/types";
import { toast } from "react-toastify";
import { interval } from "rxjs";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { entityToColor } from "src/util/color";
import { getRandomRange } from "src/util/common";
import { entityToPlayerName, entityToRockName } from "src/util/name";
import { getCanAttack, getCanSend, getOrbitingFleets } from "src/util/unit";
import { getEnsName } from "src/util/web3/getEnsName";
import {
  ObjectPosition,
  OnClickUp,
  OnComponentSystem,
  OnHover,
  OnOnce,
  OnRxjsSystem,
  SetValue,
  Tween,
} from "../../common/object-components/common";
import { Circle } from "../../common/object-components/graphics";
import { Outline, Texture } from "../../common/object-components/sprite";
import { ObjectText } from "../../common/object-components/text";
import { getOutlineSprite, getRockSprite, getSecondaryOutlineSprite } from "./utils/getSprites";
import { initializeSecondaryAsteroids } from "./utils/initializeSecondaryAsteroids";

const asteroidQueue: Entity[] = [];
export const renderAsteroid = (scene: Scene) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const systemsWorld = namespaceWorld(world, "systems");

  const render = (entity: Entity, coord: Coord) => {
    scene.objectPool.removeGroup("asteroid_" + entity);

    const asteroidData = components.Asteroid.get(entity);
    if (!asteroidData) throw new Error("Asteroid data not found");

    const ownedBy = components.OwnedBy.get(entity)?.value as Entity | undefined;

    const homeAsteroid = ownedBy ? components.Home.get(ownedBy)?.value : undefined;
    const mainBase = components.Home.get(homeAsteroid as Entity)?.value;

    const mainBaseLevel = mainBase ? components.Level.get(mainBase as Entity)?.value ?? 1n : 1n;

    const asteroidObjectGroup = scene.objectPool.getGroup("asteroid_" + entity);

    const spriteScale = 0.34 + 0.05 * Number(asteroidData.maxLevel);
    const sharedComponents = [
      ObjectPosition({
        x: coord.x * tileWidth,
        y: -coord.y * tileHeight,
      }),
      SetValue({
        originX: 0.5,
        originY: 0.5,
        scale: spriteScale,
      }),
      Tween(scene, {
        scale: { from: spriteScale - getRandomRange(0, 0.05), to: spriteScale + getRandomRange(0, 0.05) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
      Tween(scene, {
        scrollFactorX: { from: 1 - getRandomRange(0, 0.0025), to: 1 + getRandomRange(0, 0.0025) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
      Tween(scene, {
        scrollFactorY: { from: 1 - getRandomRange(0, 0.0025), to: 1 + getRandomRange(0, 0.0025) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
    ];

    const rotationTween = Tween(scene, {
      rotation: { from: -getRandomRange(0, Math.PI / 8), to: getRandomRange(0, Math.PI / 8) },
      // ease: "Sine.easeInOut",
      hold: getRandomRange(0, 10000),
      duration: 5 * 1000, // Duration of one wobble
      yoyo: true, // Go back to original scale
      repeat: -1, // Repeat indefinitely
    });

    const asteroidObject = asteroidObjectGroup.add("Sprite");

    const sprite = getRockSprite(asteroidData.mapId, asteroidData.mapId === 1 ? mainBaseLevel : asteroidData.maxLevel);
    asteroidObject.setComponents([
      ...sharedComponents,
      rotationTween,
      Texture(Assets.SpriteAtlas, sprite),
      SetValue({
        depth: DepthLayers.Rock,
      }),
    ]);

    const asteroidOutline = asteroidObjectGroup.add("Sprite");
    const playerEntity = components.Account.get()?.value ?? singletonEntity;
    const outlineSprite =
      asteroidData.mapId === 1
        ? getOutlineSprite(playerEntity, entity)
        : getSecondaryOutlineSprite(playerEntity, entity, asteroidData.maxLevel);

    asteroidOutline.setComponents([
      ...sharedComponents,
      rotationTween,
      OnComponentSystem(components.SelectedRock, () => {
        if (components.SelectedRock.get()?.value === entity) {
          if (asteroidOutline.hasComponent(Outline().id)) return;
          asteroidOutline.setComponent(Outline({ thickness: 1.5, color: 0xffa500 }));
          return;
        }

        if (asteroidOutline.hasComponent(Outline().id)) {
          asteroidOutline.removeComponent(Outline().id);
        }
      }),
      OnComponentSystem(components.PlayerAlliance, (_, { entity: _entity }) => {
        const playerEntity = components.Account.get()?.value;
        if (!playerEntity || (ownedBy !== _entity && playerEntity !== _entity)) return;

        asteroidOutline.setComponent(Texture(Assets.SpriteAtlas, outlineSprite));
      }),
      Texture(Assets.SpriteAtlas, outlineSprite),
      OnClickUp(scene, () => {
        const attackOrigin = components.Attack.get()?.originFleet;
        const sendOrigin = components.Send.get()?.originFleet;
        if (attackOrigin) {
          if (getCanAttack(attackOrigin, entity)) components.Attack.setDestination(entity);
          else toast.error("Cannot attack this asteroid.");
        } else if (sendOrigin) {
          if (getCanSend(sendOrigin, entity)) components.Send.setDestination(entity);
          else toast.error("Cannot send to this asteroid.");
        } else {
          components.SelectedRock.set({ value: entity });
        }
      }),
      OnHover(
        () => {
          components.HoverEntity.set({ value: entity });
        },
        () => {
          components.HoverEntity.remove();
        }
      ),
      SetValue({
        depth: DepthLayers.Rock + 1,
      }),
    ]);

    const gracePeriod = asteroidObjectGroup.add("Sprite");

    gracePeriod.setComponents([
      ...sharedComponents,
      rotationTween,
      OnComponentSystem(components.SelectedRock, (gameObject, update) => {
        const isSelected = update.value[0]?.value === entity;
        const wasSelected = update.value[1]?.value === entity;
        const graceTime = components.GracePeriod.get(entity)?.value ?? 0n;
        const time = components.Time.get()?.value ?? 0n;

        if (isSelected) {
          gameObject.alpha = 0;
        } else if (wasSelected && graceTime !== 0n && graceTime < time) {
          console.log("time", time, "graceTime: ", graceTime);
          gameObject.alpha = 0.8;
        }
      }),
      OnComponentSystem(components.Time, (gameObject) => {
        const isSelected = components.SelectedRock.get()?.value === entity;
        const graceTime = components.GracePeriod.get(entity)?.value ?? 0n;
        const time = components.Time.get()?.value ?? 0n;

        if (isSelected || time >= graceTime || graceTime == 0n) {
          gameObject.alpha = 0;
        } else {
          gameObject.alpha = 0.8;
        }
      }),
      Texture(Assets.SpriteAtlas, SpriteKeys.GracePeriod),
      SetValue({
        depth: DepthLayers.Marker,
        input: null,
      }),
    ]);

    const asteroidLabel = asteroidObjectGroup.add("BitmapText");

    asteroidLabel.setComponents([
      ...sharedComponents,
      SetValue({
        originX: 0.5,
        originY: -3,
        depth: DepthLayers.Marker,
      }),
      ObjectText(entityToPlayerName(ownedBy), {
        id: "addressLabel",
        fontSize: Math.max(8, Math.min(44, 16 / scene.camera.phaserCamera.zoom)),
        color: parseInt(entityToColor(ownedBy).slice(1), 16),
      }),
      OnOnce(async (gameObject) => {
        const ensNameData = await getEnsName(ownedBy);
        const name =
          ensNameData.ensName ?? asteroidData.mapId === 1 ? entityToPlayerName(ownedBy) : entityToRockName(entity);

        gameObject.setText(name);
        gameObject.setFontSize(Math.max(8, Math.min(44, 16 / scene.camera.phaserCamera.zoom)));
      }),
      // @ts-ignore
      OnRxjsSystem(scene.camera.zoom$, (gameObject, zoom) => {
        const mapOpen = components.MapOpen.get()?.value ?? false;

        if (!mapOpen) return;

        const size = Math.max(8, Math.min(44, 16 / zoom));

        gameObject.setFontSize(size);
      }),
    ]);

    const asteroidBlockade = asteroidObjectGroup.add("Graphics");
    const isBlocked = !!getOrbitingFleets(entity).find(
      (fleet) => components.FleetStance.get(fleet)?.stance == EFleetStance.Block
    );
    asteroidBlockade.setComponents([
      ObjectPosition({
        x: coord.x * tileWidth,
        y: -coord.y * tileHeight,
      }),
      SetValue({
        scale: spriteScale,
        alpha: isBlocked ? 0.5 : 0,
      }),
      SetValue({ scale: spriteScale, depth: DepthLayers.Marker - 2 }),
      Circle(128, {
        borderAlpha: 0.5,
        borderThickness: 8,
        borderColor: 0xff0000,
      }),
      Tween(scene, {
        scale: { from: spriteScale - 0.03, to: spriteScale + 0.03 },
        ease: "Sine.easeInOut",
        duration: 3000,
        yoyo: true,
        repeat: -1,
      }),
      OnComponentSystem(components.FleetStance, (gameObject, { entity: fleetEntity }) => {
        const fleetPosition = components.FleetMovement.get(fleetEntity)?.destination;
        if (fleetPosition !== entity) return;
        const isBlocked = !!getOrbitingFleets(entity).find(
          (fleet) => components.FleetStance.get(fleet)?.stance == EFleetStance.Block
        );
        gameObject.alpha = isBlocked ? 0.5 : 0;
      }),
    ]);
  };

  const query = [Has(components.Asteroid), Has(components.Position), Not(components.PirateAsteroid)];

  defineComponentSystem(systemsWorld, components.ActiveRock, ({ value: [val] }) => {
    if (!val) return;
    components.SelectedRock.set(val);
  });

  defineEnterSystem(systemsWorld, query, ({ entity }) => {
    asteroidQueue.push(entity);
  });

  const interval$ = interval(RENDER_INTERVAL);

  const asteroidRenderer = interval$.subscribe(() => {
    if (asteroidQueue.length === 0) return;

    const entity = asteroidQueue.shift() as Entity;

    const coord = components.Position.get(entity);
    const asteroidData = components.Asteroid.get(entity);

    if (!coord) return;

    render(entity, coord);
    if (asteroidData?.spawnsSecondary) initializeSecondaryAsteroids(entity, coord);
  });

  systemsWorld.registerDisposer(() => asteroidRenderer.unsubscribe());
};
