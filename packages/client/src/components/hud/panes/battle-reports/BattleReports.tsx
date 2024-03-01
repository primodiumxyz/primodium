import { Entity } from "@latticexyz/recs";
import { useEffect, useMemo, useState } from "react";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { useMud } from "src/hooks";
import { usePlayerOwner } from "src/hooks/usePlayerOwner";
import { components } from "src/network/components";
import { entityToFleetName, entityToRockName } from "src/util/name";
import { BattleDetails } from "./BattleDetails";
import { hydrateBattleReports } from "src/network/sync/indexer";
import { useSyncStatus } from "src/hooks/useSyncStatus";
import { hashEntities } from "src/util/encode";
import { Keys } from "src/util/constants";
import { Loader } from "src/components/core/Loader";
import { FaTimes } from "react-icons/fa";

export const LabeledValue: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <p className="text-xs font-bold text-cyan-400">{label}</p>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <Navigator.Screen
      title="loading"
      className="lex flex-col !items-start justify-between w-full h-full text-sm pointer-events-auto"
    >
      <SecondaryCard className="w-full flex-grow items-center justify-center font-bold opacity-50">
        <Loader />
        LOADING BATTLE REPORTS
      </SecondaryCard>
    </Navigator.Screen>
  );
};

export const ErrorScreen = () => {
  return (
    <Navigator.Screen
      title="error"
      className="lex flex-col !items-start justify-between w-full h-full text-sm pointer-events-auto"
    >
      <SecondaryCard className="w-full flex-grow items-center justify-center font-bold opacity-50 text-error">
        <FaTimes />
        ERROR SYNCING BATTLE REPORTS
      </SecondaryCard>
    </Navigator.Screen>
  );
};

export const BattleReports = () => {
  const mud = useMud();
  const {
    playerAccount: { entity: playerEntity },
  } = mud;
  const [selectedBattle, setSelectedBattle] = useState<Entity>();
  const { loading, error } = useSyncStatus(hashEntities(Keys.BATTLE, playerEntity));

  const battles = components.Battle.useAllPlayerBattles(playerEntity).sort((a, b) =>
    Number(components.Battle.get(b)?.timestamp! - components.Battle.get(a)?.timestamp!)
  );

  useEffect(() => {
    hydrateBattleReports(playerEntity, mud);
  }, [playerEntity, mud]);

  const initialScreen = useMemo(() => {
    if (error) return "error";

    if (loading) return "loading";

    return "BattleReports";
  }, [loading, error]);

  return (
    <Navigator initialScreen={initialScreen} className="border-none p-0! h-full">
      <LoadingScreen />
      <ErrorScreen />
      <Navigator.Screen title={"BattleReports"} className="full h-full">
        <div className="text-xs gap-2 w-full h-full overflow-x-hidden flex flex-col items-center">
          {battles.length === 0 && (
            <SecondaryCard className="w-full h-full flex items-center justify-center font-bold">
              <p className="opacity-50">NO BATTLE REPORTS FOUND</p>
            </SecondaryCard>
          )}
          {battles.length !== 0 &&
            battles.map((battle, i) => (
              <BattleButton battleEntity={battle} key={`battle-${i}`} setSelectedBattle={setSelectedBattle} />
            ))}
        </div>
      </Navigator.Screen>
      {selectedBattle && <BattleDetails battleEntity={selectedBattle} />}
    </Navigator>
  );
};

const BattleButton = ({
  battleEntity,
  setSelectedBattle,
}: {
  battleEntity: Entity;
  setSelectedBattle: (entity: Entity) => void;
}) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();

  const battle = components.Battle.use(battleEntity);

  const playerIsWinner = usePlayerOwner(battle?.winner as Entity) === playerEntity;
  const attackerIsFleet = components.IsFleet.use(battle?.attacker);
  const defenderIsFleet = components.IsFleet.use(battle?.defender);
  const position = components.Position.use(battle?.rock as Entity);

  if (!battle) return <></>;

  return (
    <Navigator.NavButton
      to="BattleDetails"
      onClick={() => setSelectedBattle(battleEntity)}
      className="w-full p-0 flex justify-between text-xs bg-base-100 relative border-gray-700"
    >
      {!playerIsWinner && (
        <div className="h-full bg-rose-800 gap-1 p-1 mr-2 flex items-center">
          <p className="bg-rose-900 border border-rose-500  rounded-md px-1 text-2xl">L</p>
        </div>
      )}
      {playerIsWinner && (
        <div className="h-full bg-green-800 gap-1 p-1 mr-2 flex items-center">
          <p className="bg-green-900 border border-green-500  rounded-md px-1 text-2xl">W</p>
        </div>
      )}
      <div className="grid grid-cols-[10rem_3rem_10rem] place-items-center gap-1 p-1">
        <div
          className={`flex bg-black/10 border  text-xs justify-center items-center gap-2 p-1 w-full ${
            battle.winner == battle.attacker ? "border-success/50" : "border-error/50"
          }`}
        >
          {attackerIsFleet ? entityToFleetName(battle.attacker) : entityToRockName(battle.attacker)}
          <img src={attackerIsFleet ? "img/icons/outgoingicon.png" : "img/icons/asteroidicon.png"} className="w-4" />
        </div>
        <p className="grid place-items-center uppercase font-bold">vs</p>
        <div
          className={`flex bg-black/10 border text-xs justify-center items-center gap-2 p-1 w-full ${
            battle.winner == battle.defender ? "border-success/50" : "border-error/50"
          }`}
        >
          {defenderIsFleet ? entityToFleetName(battle.defender) : entityToRockName(battle.defender)}
          <img src={defenderIsFleet ? "img/icons/outgoingicon.png" : "img/icons/asteroidicon.png"} className="w-4" />
        </div>
      </div>
      <div className="px-4 flex flex-col gap-1 items-center text-end">
        <p>{new Date(Number(battle.timestamp * 1000n)).toLocaleDateString()}</p>
        <p className="opacity-50">
          [{position?.x ?? 0},{position?.y ?? 0}]
        </p>
      </div>
    </Navigator.NavButton>
  );
};
