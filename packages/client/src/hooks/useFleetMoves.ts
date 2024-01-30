import { Entity } from "@latticexyz/recs";
import { components } from "src/network/components";
import { EntityType } from "src/util/constants";
import { useFullResourceCount } from "./useFullResourceCount";
import { useMud } from "./useMud";

export const useFleetMoves = () => {
  const playerEntity = useMud().playerAccount.entity;
  const home = components.Home.get(playerEntity)?.value;
  if (!home) throw new Error("No home found");

  const maxMoves = useFullResourceCount(EntityType.FleetMoves, home as Entity).resourceCount;
  const movesUsed = 0n;

  return maxMoves - movesUsed;
};
