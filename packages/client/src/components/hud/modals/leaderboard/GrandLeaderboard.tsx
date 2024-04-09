import { Entity } from "@latticexyz/recs";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { SecondaryCard } from "src/components/core/Card";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { getAllianceName } from "src/util/alliance";
import { rankToScore } from "src/util/score";

export const GrandLeaderboard = ({ leaderboard, alliance = false }: { leaderboard: Entity; alliance?: boolean }) => {
  const { playerAccount } = useMud();
  const data = components.GrandLeaderboard.use(leaderboard);

  if (!playerAccount.address) return null;
  if (!data)
    return (
      <SecondaryCard className="w-full h-full flex justify-center items-center uppercase font-bold text-sm">
        No Data Found
      </SecondaryCard>
    );
  const entity = alliance
    ? (components.PlayerAlliance.get(playerAccount.entity)?.alliance as Entity)
    : playerAccount.entity;

  const playerIndex = data.players.indexOf(entity);
  const playerScore = playerIndex == -1 ? 0 : data.scores[playerIndex];
  const playerWormholeRank = playerIndex == -1 ? 0 : data.wormholeRanks[playerIndex];
  const playerPrimodiumRank = playerIndex == -1 ? 0 : data.primodiumRanks[playerIndex];

  return (
    <SecondaryCard className="flex flex-col w-full h-full text-xs pointer-events-auto">
      <div className={`grid grid-cols-8 w-full p-2 font-bold uppercase`}>
        <div>Rank</div>
        <div className="col-span-4">Name</div>
        <div>Wormhole</div>
        <div>Primodium</div>
        <div>Pts</div>
      </div>

      <div className="flex flex-col w-full h-full justify-between text-xs pointer-events-auto">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height - 65}
              width={width}
              itemCount={data.players.length}
              itemSize={60}
              className="scrollbar"
            >
              {({ index, style }) => {
                const player = data.players[index];
                const score = data.scores[index];
                const wormholeRank = data.wormholeRanks[index];
                const primodiumRank = data.primodiumRanks[index];
                return (
                  <div style={style} className="pr-2">
                    <GrandLeaderboardItem
                      key={index}
                      player={player}
                      index={index}
                      score={score}
                      alliance={alliance}
                      wormholeRank={wormholeRank}
                      primodiumRank={primodiumRank}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
      {entity && (
        <div className="w-full self-end">
          <hr className="w-full border-t border-cyan-800 my-2" />
          <GrandLeaderboardItem
            player={entity}
            index={playerIndex}
            score={playerScore ?? 0}
            alliance={alliance}
            wormholeRank={playerWormholeRank}
            primodiumRank={playerPrimodiumRank}
          />
        </div>
      )}
    </SecondaryCard>
  );
};

const rankSuffix = (rank: number) => (rank == 1 ? "st" : rank == 2 ? "nd" : rank == 3 ? "rd" : "th");

export const GrandLeaderboardItem = ({
  player,
  index,
  score,
  wormholeRank,
  primodiumRank,
  alliance = false,
  className = "",
  hideRanks = false,
}: {
  player: Entity;
  index: number;
  score: number;
  wormholeRank: number;
  primodiumRank: number;
  alliance?: boolean;
  className?: string;
  hideRanks?: boolean;
}) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const entity = alliance ? (components.PlayerAlliance.get(playerEntity)?.alliance as Entity) : playerEntity;

  const rank = index + 1;
  return (
    <SecondaryCard
      className={`grid grid-cols-8 gap-1 w-full border border-cyan-800 p-2 bg-slate-800 bg-gradient-to-br from-transparent to-bg-slate-900/30 items-center h-14 ${
        player === entity ? "border-success" : ""
      } ${className}`}
    >
      <div>
        {rank}
        {rankSuffix(rank)}
      </div>
      <div className="col-span-4 flex gap-1 justify-between items-center">
        <div className="flex items-center gap-1">
          {alliance ? `[${getAllianceName(player, true)}]` : <AccountDisplay player={player} />}
          {player === entity && <p className="text-accent">(You)</p>}
        </div>
      </div>
      {!hideRanks && (
        <>
          <div className="font-bold w-fit bg-cyan-700 px-2">
            {rankToScore(wormholeRank)}
            <p className="inline opacity-70">[{wormholeRank.toLocaleString() + rankSuffix(wormholeRank)}]</p>
          </div>
          <div className="font-bold w-fit bg-cyan-700 px-2">
            {rankToScore(primodiumRank)}
            <p className="inline opacity-70">[{primodiumRank.toLocaleString() + rankSuffix(primodiumRank)}]</p>
          </div>
        </>
      )}
      <p className="font-bold w-fit bg-yellow-700 px-2 flex justify-end">{score.toLocaleString()}</p>
    </SecondaryCard>
  );
};
