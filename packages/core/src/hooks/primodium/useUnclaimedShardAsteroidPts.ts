import { bigIntMax } from "@latticexyz/common/utils";
import { Entity } from "@latticexyz/recs";
import { useMemo } from "react";
import { SPEED_SCALE } from "@/lib/constants";
import { useCore } from "@/hooks/useCore";

export const usePlayerUnclaimedShardAsteroidPoints = (playerEntity: Entity) => {
  const { tables } = useCore();
  const conquestConfigData = tables.P_ConquestConfig.use();
  const worldSpeed = tables.P_GameConfig.use()?.worldSpeed ?? 100n;
  const time = tables.Time.use()?.value ?? 0n;
  const shardAsteroids = tables.ShardAsteroid.useAll();

  return useMemo(() => {
    if (!conquestConfigData) return 0n;
    return shardAsteroids.reduce((acc, asteroidEntity) => {
      const owner = tables.OwnedBy.get(asteroidEntity)?.value;
      if (!owner || owner !== playerEntity) return acc;
      const shardAsteroid = tables.ShardAsteroid.get(asteroidEntity)!;
      const lastConquered = tables.LastConquered.get(asteroidEntity)?.value ?? 0n;
      const lifespan = (conquestConfigData.shardAsteroidLifeSpan * SPEED_SCALE) / worldSpeed;

      const explodeTime = shardAsteroid.spawnTime + lifespan;

      let unclaimedPoints = 0n;
      const endTime = time > explodeTime ? explodeTime : time;
      const timeSinceClaimed = bigIntMax(0n, endTime - lastConquered);
      const holdPct = (timeSinceClaimed * 100000n) / lifespan;

      unclaimedPoints = (holdPct * conquestConfigData.shardAsteroidPoints) / 100000n;
      return acc + unclaimedPoints;
    }, 0n);
  }, [conquestConfigData, shardAsteroids, playerEntity, worldSpeed, time]);
};

export const useAllUnclaimedShardAsteroidPts = () => {
  const { tables } = useCore();
  const conquestConfigData = tables.P_ConquestConfig.use();
  const worldSpeed = tables.P_GameConfig.use()?.worldSpeed ?? 100n;
  const time = tables.Time.use()?.value ?? 0n;
  const shardAsteroids = tables.ShardAsteroid.useAll();
  return useMemo(() => {
    if (!conquestConfigData) return new Map<Entity, bigint>();
    return shardAsteroids.reduce((acc, asteroidEntity) => {
      const owner = tables.OwnedBy.get(asteroidEntity)?.value as Entity;
      if (!owner) return acc;
      const shardAsteroid = tables.ShardAsteroid.get(asteroidEntity)!;
      const lastConquered = tables.LastConquered.get(asteroidEntity)?.value ?? 0n;
      const lifespan = (conquestConfigData.shardAsteroidLifeSpan * SPEED_SCALE) / worldSpeed;

      const explodeTime = shardAsteroid.spawnTime + lifespan;

      let unclaimedPoints = 0n;
      const endTime = time > explodeTime ? explodeTime : time;
      const timeSinceClaimed = bigIntMax(0n, endTime - lastConquered);
      const holdPct = (timeSinceClaimed * 100000n) / lifespan;

      unclaimedPoints = (holdPct * conquestConfigData.shardAsteroidPoints) / 100000n;
      const prevUnclaimedPoints = acc.get(owner) ?? 0n;
      acc.set(owner, prevUnclaimedPoints + unclaimedPoints);
      return acc;
    }, new Map<Entity, bigint>());
  }, [conquestConfigData, shardAsteroids, worldSpeed, time]);
};
