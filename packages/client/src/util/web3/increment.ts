import { EntityID } from "@latticexyz/recs";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { Counter } from "src/network/components/chainComponents";
import { Network } from "src/network/setupNetworkOld";
import { useGameStore } from "src/store/GameStore";
import { parseReceipt } from "../analytics/parseReceipt";

export const increment = async (entity: EntityID, network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;
  setTransactionLoading(true);

  const counter = Counter.get();

  const receipt = await execute(
    systems["system.Increment"].executeTyped(entity, {
      gasLimit: 1_000_000,
    }),
    providers
  );

  ampli.systemIncrement({
    currIncrementLevel: counter?.value ?? 0,
    ...parseReceipt(receipt),
  });

  setTransactionLoading(false);
};
