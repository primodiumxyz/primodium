import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { Network } from "src/network/setupNetworkOld";
import { useGameStore } from "src/store/GameStore";
import { parseReceipt } from "../analytics/parseReceipt";

export const spawn = async (network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;

  setTransactionLoading(true);
  const receipt = await execute(
    systems["system.Spawn"].executeTyped({ gasLimit: 15_000_000 }),
    providers
  );

  ampli.systemSpawn({
    ...parseReceipt(receipt),
  });

  setTransactionLoading(false);
};
