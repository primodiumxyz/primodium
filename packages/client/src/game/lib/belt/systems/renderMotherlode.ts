import { Scene } from "engine/types";
import {
  namespaceWorld,
  Has,
  defineEnterSystem,
  HasValue,
  defineComponentSystem,
} from "@latticexyz/recs";
import {
  ObjectPosition,
  OnClick,
  SetValue,
} from "../../common/object-components/common";
import { Outline, Texture } from "../../common/object-components/sprite";
import {
  AsteroidType,
  Motherlode,
  Position,
  ReversePosition,
} from "src/network/components/chainComponents";
import { world } from "src/network/world";
import { MotherlodeSizeNames, MotherlodeTypeNames } from "src/util/constants";
import { EMotherlodeSize, ESpaceRockType } from "src/util/web3/types";
import { Send } from "src/network/components/clientComponents";
import { encodeCoord } from "src/util/encode";
import { ActiveButton } from "src/util/types";
import { Coord } from "@latticexyz/utils";

export const renderMotherlode = (scene: Scene) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");

  const query = [
    Has(AsteroidType),
    HasValue(AsteroidType, { value: ESpaceRockType.Motherlode }),
  ];

  const render = (coord: Coord) => {
    const entityId = ReversePosition.get(encodeCoord(coord))?.value;
    scene.objectPool.removeGroup("motherlode_" + entityId);

    const asteroidType = AsteroidType.get(entityId)?.value;
    if (asteroidType !== ESpaceRockType.Motherlode) return;

    const motherlodeObjectGroup = scene.objectPool.getGroup(
      "motherlode_" + entityId
    );
    const motherlodeData = Motherlode.get(entityId);
    if (!motherlodeData) throw new Error("motherlode data not found");

    const sprite = `motherlode-${
      MotherlodeTypeNames[motherlodeData.motherlodeType]
    }-${MotherlodeSizeNames[motherlodeData.size]}`;

    const origin = Send.getOrigin();
    const destination = Send.getDestination();

    const originEntity = origin
      ? ReversePosition.get(encodeCoord(origin))
      : undefined;
    const destinationEntity = destination
      ? ReversePosition.get(encodeCoord(destination))
      : undefined;
    const outline =
      originEntity?.value === entityId
        ? Outline({ color: 0x00ff00 })
        : destinationEntity?.value === entityId
        ? Outline()
        : undefined;

    const scale =
      motherlodeData.size == EMotherlodeSize.SMALL
        ? 1
        : motherlodeData.size == EMotherlodeSize.MEDIUM
        ? 2
        : 4;
    motherlodeObjectGroup.add("Sprite").setComponents([
      ObjectPosition({
        x: coord.x * tileWidth,
        y: -coord.y * tileHeight,
      }),
      outline,
      SetValue({
        originX: 0.5,
        originY: 0.5,
        scale,
      }),
      Texture(sprite),
      OnClick(() => {
        const activeButton = Send.get()?.activeButton ?? ActiveButton.NONE;
        if (activeButton === ActiveButton.ORIGIN) {
          Send.setOrigin(coord);
        } else if (activeButton === ActiveButton.DESTINATION) {
          Send.setDestination(coord);
        }
        Send.update({ activeButton: ActiveButton.NONE });
      }),
    ]);
  };

  defineEnterSystem(gameWorld, query, ({ entity }) => {
    const entityId = world.entities[entity];
    const coord = Position.get(entityId);
    if (!coord) return;
    render(coord);
  });

  defineComponentSystem(gameWorld, Send, ({ value: values }) => {
    values.map((value) => {
      [
        { x: value?.originX, y: value?.originY },
        { x: value?.destinationX, y: value?.destinationY },
      ].map((coord) => {
        if (!coord || !coord.x || !coord.y) return;
        render({ x: coord.x, y: coord.y });
      });
    });
  });
};
