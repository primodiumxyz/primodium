import { execute } from "src/network/actions";
import { Network } from "src/network/layer";
import { useGameStore } from "src/store/GameStore";
import { Account, HomeAsteroid } from "src/network/components/clientComponents";

export const updateSpaceRock = async (network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;

  // todo: find a cleaner way to extract this value in all web3 functions
  const activeAsteroid = HomeAsteroid.get()?.value;
  const address = Account.get()?.value;
  if (!activeAsteroid || !address) return;

  try {
    setTransactionLoading(true);
    await execute(
      systems["system.S_UpdatePlayerSpaceRock"].executeTyped(
        address,
        activeAsteroid,
        {
          gasLimit: 10_000_000,
        }
      ),
      providers
    );
  } finally {
    setTransactionLoading(false);
  }
};
