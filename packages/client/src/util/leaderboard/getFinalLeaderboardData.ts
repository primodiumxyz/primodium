import { components } from "@/network/components";
import { EntityType } from "@/util/constants";
import { rankToScore } from "@/util/score";
import { Entity } from "@latticexyz/recs";

type FinalLeaderboardData = {
  player: Entity;
  rank: number;
  score: number;
  wormholeRank?: number;
  shardRank?: number;
};

export const getFinalLeaderboardData = (
  playerEntity: Entity,
  alliance: boolean
): { allPlayers: FinalLeaderboardData[]; player?: FinalLeaderboardData } => {
  const wormholeData = components.Leaderboard.get(
    alliance ? EntityType.AllianceWormholeLeaderboard : EntityType.PlayerWormholeLeaderboard
  );
  const shardData = components.Leaderboard.get(
    alliance ? EntityType.AllianceShardLeaderboard : EntityType.PlayerShardLeaderboard
  );

  const ret: { allPlayers: FinalLeaderboardData[]; player?: FinalLeaderboardData } = {
    allPlayers: [],
  };
  const playerDatas: Record<Entity, FinalLeaderboardData> = {};

  wormholeData?.players.forEach((player, index) => {
    const wormholeRank = wormholeData.ranks[index];
    const retData = {
      player,
      wormholeRank,
      score: rankToScore(wormholeRank),
      rank: 0,
    };
    playerDatas[player] = retData;
  });

  shardData?.players.forEach((player, index) => {
    const shardRank = shardData.ranks[index];
    const retData = {
      player,
      shardRank,
      score: rankToScore(shardRank) + (playerDatas[player].score ?? 0),
      rank: 0,
    };
    playerDatas[player] = { ...playerDatas[player], ...retData };
  });

  const sortedPlayerData = Object.values(playerDatas).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  sortedPlayerData.forEach((playerData, index) => {
    const rank =
      index == 0
        ? 1
        : playerData.score == ret.allPlayers[index - 1]?.score
        ? ret.allPlayers[index - 1].rank
        : index + 1;

    const retData = {
      ...playerData,
      rank,
    };
    ret.allPlayers.push(retData);
    if (playerData.player == playerEntity) ret.player = retData;
  });
  return ret;
};
