import { useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { InterfaceIcons, ResourceImages } from "@primodiumxyz/assets";
import { formatNumber, rankToScore } from "@primodiumxyz/core";
import { useCore } from "@primodiumxyz/core/react";
import { defaultEntity, Entity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";
import { CrownRank } from "@/components/hud/global/modals/leaderboard/RankCrown";
import { AccountDisplay } from "@/components/shared/AccountDisplay";

export const GrandLeaderboard = ({ alliance = false }: { alliance?: boolean }) => {
  const core = useCore();
  const { tables, utils } = core;
  const playerEntity = tables.Account.get()?.value ?? defaultEntity;
  const [data, setData] = useState(utils.getFinalLeaderboardData(playerEntity, alliance));
  const [showRefresh, setShowRefresh] = useState(false);

  const refresh = () => setData(utils.getFinalLeaderboardData(playerEntity, alliance));

  useEffect(() => {
    const interval = setInterval(() => {
      setShowRefresh(true);
    }, 1000);
    return () => clearInterval(interval);
  });

  const entity = alliance ? (tables.PlayerAlliance.get(playerEntity)?.alliance as Entity) : playerEntity;

  if (!data || !data.allPlayers.length)
    return (
      <div className="w-full h-full flex justify-center items-center uppercase font-bold text-sm">No Data Found</div>
    );
  return (
    <div className="flex flex-col w-full h-full text-xs pointer-events-auto">
      {showRefresh && (
        <Button variant="neutral" onClick={refresh} className="absolute top-2 right-2 animate-in fade-in">
          <FaSync />
          Refresh
        </Button>
      )}
      <div className={`grid grid-cols-7 w-full p-2 font-bold items-end uppercase pr-5`}>
        <div>Rank</div>
        <div className="col-span-3">Name</div>
        <div className="opacity-80 flex flex-col justify-center items-center">
          <img src={InterfaceIcons.Wormhole} className="w-8" />
        </div>
        <div className="opacity-80 flex flex-col justify-center items-center">
          <img src={ResourceImages.Primodium} className="w-8" />
        </div>
        <div className="opacity-80 flex flex-col justify-center items-center">
          <img src={InterfaceIcons.Leaderboard} className="w-8" />
        </div>
      </div>

      <div className="flex flex-col w-full h-full justify-between text-xs pointer-events-auto">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List height={height} width={width} itemCount={data.allPlayers.length} itemSize={52} className="scrollbar">
              {({ index, style }) => {
                const player = data.allPlayers[index];
                return (
                  <div style={style} className="pr-2">
                    <GrandLeaderboardItem
                      key={index}
                      {...player}
                      special={player.player === entity}
                      alliance={alliance}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
      {data.player && (
        <div className="w-full self-end pr-4">
          <hr className="w-full border-t border-cyan-800 my-2" />
          <GrandLeaderboardItem {...data.player} special alliance={alliance} />
        </div>
      )}
    </div>
  );
};

const RankSuffix = ({ rank }: { rank: number }) => {
  const modTen = rank % 10;
  return modTen == 1 ? "st" : modTen == 2 ? "nd" : modTen == 3 ? "rd" : "th";
};

export const GrandLeaderboardItem = ({
  player,
  rank,
  finalScore,
  wormholeRank = 0,
  shardRank = 0,
  alliance = false,
  className = "",
  hideRanks = false,
  special = false,
}: {
  player: Entity;
  rank: number;
  finalScore: number;
  wormholeRank?: number;
  shardRank?: number;
  alliance?: boolean;
  className?: string;
  hideRanks?: boolean;
  special?: boolean;
}) => {
  const core = useCore();
  const { tables, utils } = core;
  const playerEntity = tables.Account.get()?.value ?? defaultEntity;
  const entity = alliance ? (tables.PlayerAlliance.get(playerEntity)?.alliance as Entity) : playerEntity;

  return (
    <SecondaryCard
      className={`grid grid-cols-7 w-full h-12 items-center ${
        special ? "border-success bg-success/20" : ""
      } ${className}`}
    >
      <div className={`grid grid-cols-2 gap-1 items-center`}>
        <p>
          {rank}
          <RankSuffix rank={rank} />
        </p>
        <CrownRank rank={rank} />
      </div>
      <div className="col-span-3 flex gap-1 justify-between items-center">
        <div className="flex items-center gap-1">
          {alliance ? (
            `[${utils.getAllianceName(player, true)}]`
          ) : (
            <AccountDisplay noColor={!special} player={player} />
          )}
          {player === entity && <p className="text-accent">(You)</p>}
        </div>
      </div>
      {!hideRanks && (
        <>
          <div className="relative font-bold w-full px-2 flex justify-center">
            <div className="relative w-fit">
              <p className="opacity-80">{formatNumber(rankToScore(wormholeRank), { fractionDigits: 1 })}</p>
              <CrownRank rank={wormholeRank} offset />
            </div>
          </div>
          <div className="font-bold px-2 flex justify-center">
            <div className="relative w-fit">
              <p className="opacity-80">{formatNumber(rankToScore(shardRank), { fractionDigits: 1 })}</p>
              <CrownRank rank={shardRank} offset />
            </div>
          </div>
        </>
      )}
      <p className="font-bold w-full px-2 flex text-warning text-center justify-center">
        {formatNumber(finalScore, { fractionDigits: 1 })}
      </p>
    </SecondaryCard>
  );
};
