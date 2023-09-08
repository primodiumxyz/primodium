import { EntityID } from "@latticexyz/recs";
import { Coord } from "@latticexyz/utils";
import { BigNumber } from "ethers";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { ActiveAsteroid } from "src/network/components/clientComponents";
import { Network } from "src/network/setupNetworkOld";
import { useGameStore } from "src/store/GameStore";
import { useNotificationStore } from "src/store/NotificationStore";
import { parseReceipt } from "../analytics/parseReceipt";
import { BlockIdToKey } from "../constants";
import { addTileOverride, removeTileOverride } from "./override";

export const buildBuilding = async (
  coord: Coord,
  blockType: EntityID,
  address: EntityID,
  network: Network
) => {
  const { providers, systems } = network;
  const { tempPositionId } = addTileOverride(coord, blockType, address);
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;
  const setNotification = useNotificationStore.getState().setNotification;
  setTransactionLoading(true);

  // todo: find a cleaner way to extract this value in all web3 functions
  const activeAsteroid = ActiveAsteroid.get()?.value;
  if (!activeAsteroid) return;

  const position = { ...coord, parent: activeAsteroid };

  try {
    const receipt = await execute(
      systems["system.Build"].executeTyped(
        BigNumber.from(blockType),
        position,
        {
          gasLimit: 15_000_000,
        }
      ),
      providers,
      setNotification
    );

    ampli.systemBuild({
      asteroidCoord: BigNumber.from(activeAsteroid).toString(),
      buildingType: BlockIdToKey[blockType],
      coord: [coord.x, coord.y],
      currLevel: 0,
      ...parseReceipt(receipt),
    });
  } finally {
    removeTileOverride(tempPositionId);
  }

  setTransactionLoading(false);
};
