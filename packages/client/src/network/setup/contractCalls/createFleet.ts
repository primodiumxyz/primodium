import { Entity } from "@latticexyz/recs";
import { execute } from "src/network/actions";
import { MUD } from "src/network/types";
import { TransactionQueueType } from "src/util/constants";
import { getSystemId, hashEntities } from "src/util/encode";
import { toTransportableResourceArray, toUnitCountArray } from "src/util/send";
import { Hex } from "viem";

export const attack = async (
  mud: MUD,
  spaceRock: Entity,
  units: Record<Entity, bigint>,
  resources: Record<Entity, bigint>
) => {
  await execute(
    {
      mud,
      functionName: "createFleet",
      systemId: getSystemId("FleetCreateSystem"),
      args: [spaceRock as Hex, toUnitCountArray(units), toTransportableResourceArray(resources)],
      delegate: true,
    },
    {
      id: hashEntities(TransactionQueueType.CreateFleet, spaceRock),
      type: TransactionQueueType.CreateFleet,
    }
  );
};
