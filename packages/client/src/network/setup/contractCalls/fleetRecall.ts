import { Entity } from "@latticexyz/recs";
import { execute } from "src/network/txExecute";
import { MUD } from "src/network/types";
import { TransactionQueueType } from "src/util/constants";
import { getSystemId, hashEntities } from "src/util/encode";
import { Hex } from "viem";

export const recallFleet = async (mud: MUD, fleet: Entity) => {
  await execute(
    {
      mud,
      functionName: "Primodium__recallFleet",
      systemId: getSystemId("FleetRecallSystem"),
      args: [fleet as Hex],
      withSession: true,
    },
    {
      id: hashEntities(TransactionQueueType.SendFleet),
      type: TransactionQueueType.SendFleet,
    }
  );
};
