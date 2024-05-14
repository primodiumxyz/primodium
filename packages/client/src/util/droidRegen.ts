import { Entity } from "@latticexyz/recs";
import { bigIntMin } from "@latticexyz/common/utils";
import { EMap } from "contracts/config/enums";
import { components as comps } from "src/network/components";
import { Hex } from "viem";
import { EntityType, SPEED_SCALE, RESOURCE_SCALE } from "./constants";

export function getAsteroidDroidCount(asteroid: Entity): bigint {
  const homeHex = asteroid as Hex;

  const mapId = comps.Asteroid.getWithKeys({ entity: homeHex })?.mapId ?? 0n;
  const owner = comps.OwnedBy.getWithKeys({ entity: homeHex })?.value as Entity | undefined;
  if (mapId != EMap.Common || owner != undefined) {
    return 0n;
  }

  const time = comps.Time.get()?.value ?? 0n;

  const playerLastClaimed = comps.DroidRegenTimestamp.getWithKeys({ entity: homeHex })?.value ?? 0n;
  const timeSinceClaimed =
    ((time - playerLastClaimed) * (comps.P_GameConfig?.get()?.worldSpeed ?? SPEED_SCALE)) / SPEED_SCALE;

  const maxLevel = comps.Asteroid.getWithKeys({ entity: homeHex })?.maxLevel ?? 0n;

  const maxDroidCount = getSecondaryAsteroidUnitsAndEncryption(asteroid, maxLevel).droidCount;

  const droidCount = comps.UnitCount.getWithKeys({ entity: homeHex, unit: EntityType.Droid as Hex })?.value ?? 0n;

  const droidRegenRate = comps.P_Unit.getWithKeys({ entity: EntityType.Droid as Hex, level: 0n })?.trainingTime ?? 0n;
  const totalDroidCount = droidCount + timeSinceClaimed / droidRegenRate;

  return bigIntMin(totalDroidCount, maxDroidCount);
}

function getSecondaryAsteroidUnitsAndEncryption(asteroidEntity: Entity, level: bigint) {
  // this is a crime but wanted to preserve the const without using an implicit equation.
  const droidCount = level < 3n ? 1000n : level < 6n ? 16000n : level < 8n ? 256000n : 4096000n;
  const encryption = (level * 300n + 300n) * RESOURCE_SCALE;
  return { droidCount, encryption };
}
