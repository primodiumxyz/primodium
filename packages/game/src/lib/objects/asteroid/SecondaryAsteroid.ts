import { Coord } from "@primodiumxyz/engine/types";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Relationship } from "@game/lib/constants/common";
import { BaseAsteroid } from "@game/lib/objects/asteroid/BaseAsteroid";
import { getSecondaryOutlineSprite, getSecondarySprite, LODs } from "@game/lib/objects/asteroid/helpers";
import { PrimodiumScene } from "@game/types";

export class SecondaryAsteroid extends BaseAsteroid {
  private maxLevel: bigint;
  constructor(args: {
    id: Entity;
    scene: PrimodiumScene;
    coord: Coord;
    resourceType: Entity;
    maxLevel: bigint;
    relationship: Relationship;
  }) {
    const { id, scene, coord, resourceType, maxLevel, relationship = "Neutral" } = args;
    super({
      id,
      scene,
      coord,
      sprite: getSecondarySprite(resourceType, maxLevel),
      outlineSprite: getSecondaryOutlineSprite(relationship, maxLevel),
    });

    this._scene = scene;
    this.maxLevel = maxLevel;
    this.getAsteroidLabel().setBaseScale(0.75);
  }

  override spawn() {
    super.spawn();
    return this;
  }

  // setRelationship(relationship: AsteroidRelationship) {
  //   this.outlineSprite.setTexture(getSecondaryOutlineSprite(relationship, this.maxLevel));
  // }

  getLod(zoom: number) {
    if (zoom >= 0.75) {
      return LODs.FullyShow;
    }
    if (zoom >= 0.2) {
      return LODs.ShowLabelOnly;
    }
    if (zoom >= 0) {
      return LODs.FullyHide;
    }

    return 0;
  }
}
