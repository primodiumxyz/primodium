import { components } from "@/network/components";
import { getColonyShipsPlusAsteroids } from "@/util/colonyShip";
import { ResourceEntityLookup } from "@/util/constants";
import { Entity } from "@latticexyz/recs";
import { EResource } from "contracts/config/enums";
import { useMemo } from "react";
import { Hex } from "viem";

export const useColonySlots = (playerEntity: Entity) => {
  const maxSlots = components.MaxColonySlots.use(playerEntity)?.value ?? 0n;
  const shipsInTraining = components.ColonyShipsInTraining.use(playerEntity)?.value ?? 0n;
  const config = components.P_ColonySlotsConfig.use();
  const costMultiplier = useColonySlotsMultiplier(playerEntity);
  const data = useMemo(() => {
    if (!config) throw new Error("No colony slots config found");
    const occupiedSlots = getColonyShipsPlusAsteroids(playerEntity);

    const resourceCosts = config.resources.reduce((acc, resource, i) => {
      const paid =
        components.ColonySlotsInstallments.getWithKeys({
          playerEntity: playerEntity as Hex,
          resourceIndex: BigInt(i),
        })?.amounts ?? 0n;
      const cost = config.amounts[i] * costMultiplier;
      return { ...acc, [ResourceEntityLookup[resource as EResource]]: { paid, cost } };
    }, {} as Record<Entity, { cost: bigint; paid: bigint }>);

    return {
      maxSlots,
      occupiedSlots,
      costMultiplier,
      resourceCosts,
    };
  }, [config, costMultiplier, maxSlots, playerEntity]);

  return {
    ...data,
    availableSlots: maxSlots - BigInt(data.occupiedSlots.length),
    shipsInTraining,
    maxSlots,
  };
};

export const useColonySlotsMultiplier = (playerEntity: Entity) => {
  const maxColonySlots = components.MaxColonySlots.use(playerEntity)?.value ?? 0n;
  const multiplier = components.P_ColonySlotsConfig.use()?.multiplier ?? 1n;
  return multiplier * maxColonySlots;
};
