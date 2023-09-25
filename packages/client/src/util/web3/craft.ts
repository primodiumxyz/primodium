import { Coord } from "@latticexyz/utils";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { HomeAsteroid } from "src/network/components/clientComponents";
import { Network } from "src/network/layer";
import { useGameStore } from "src/store/GameStore";
import { parseReceipt } from "../analytics/parseReceipt";
import { BigNumber } from "ethers";

export const craft = async (coord: Coord, network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;
  setTransactionLoading(true);

  const activeAsteroid = HomeAsteroid.get()?.value;
  if (!activeAsteroid) return;

  const position = { ...coord, parent: activeAsteroid };

  const receipt = await execute(
    systems["system.Craft"].executeTyped(position),
    providers
  );

  ampli.systemCraft({
    asteroidCoord: BigNumber.from(activeAsteroid).toString(),
    coord: [coord.x, coord.y],
    ...parseReceipt(receipt),
  });

  setTransactionLoading(false);
};
