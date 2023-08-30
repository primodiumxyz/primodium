import { ESendType } from "src/util/web3/types";
import { EntityID } from "@latticexyz/recs";
import { Arrival } from "src/network/components/chainComponents";
import { Account } from "src/network/components/clientComponents";
import { SingletonID } from "@latticexyz/network";
import { useMemo } from "react";
import { AttackingFleet } from "./AttackingFleet";

export const OrbitingFleets: React.FC<{ spaceRock: EntityID }> = ({
  spaceRock,
}) => {
  const player = Account.use()?.value ?? SingletonID;

  const orbitingFleets = Arrival.use({
    to: player,
    onlyOrbiting: true,
  });

  //filter collection where sendType is not REINFORCE
  const attackingOrbitingFleets = useMemo(
    () =>
      orbitingFleets.filter((fleet) => {
        if (!fleet) return false;
        return fleet.sendType !== ESendType.REINFORCE;
      }),
    [orbitingFleets]
  );

  return (
    <div className="w-full text-xs space-y-2 h-full overflow-y-auto scrollbar">
      {attackingOrbitingFleets.length === 0 && (
        <div className="w-full h-full bg-slate-800 border rounded-md border-slate-700 flex items-center justify-center font-bold">
          <p className="opacity-50">NO HOSTILE ORBITING FLEETS</p>
        </div>
      )}
      {attackingOrbitingFleets.length !== 0 &&
        attackingOrbitingFleets.map((fleet, index) => {
          if (!fleet) return;
          return (
            <AttackingFleet key={index} fleet={fleet} spaceRock={spaceRock} />
          );
        })}
    </div>
  );
};
