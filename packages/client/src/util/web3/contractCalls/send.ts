import { Coord } from "@latticexyz/utils";
import { ESendType, MUDEnums } from "contracts/config/enums";
import { SetupNetworkResult } from "src/network/types";
import { toHex32 } from "src/util/constants";
import { Hex } from "viem";
import { UnitCountTuple } from "../types";
import { execute } from "src/network/actions";
import { encodeCoord, hashEntities } from "src/util/encode";
import { components } from "src/network/components";
import { parseReceipt } from "../../analytics/parseReceipt";
import { ampli } from "src/ampli";

export const send = async (
  unitCounts: UnitCountTuple,
  sendType: ESendType,
  origin: Coord,
  destination: Coord,
  to: Hex,
  network: SetupNetworkResult
) => {
  await execute(
    () =>
      network.worldContract.write.sendUnits([
        unitCounts,
        sendType,
        { ...origin, parent: toHex32("0") },
        { ...destination, parent: toHex32("0") },
        to,
      ]),
    network,
    {
      // todo: random bytes?
      id: hashEntities(unitCounts.toString(), sendType, JSON.stringify(origin), JSON.stringify(destination)),
    },
    (receipt) => {
      const originAsteroid = components.ReversePosition.get(encodeCoord(origin))?.entity;
      const destinationAsteroid = components.ReversePosition.get(encodeCoord(destination))?.entity;

      ampli.systemSendUnits({
        asteroidCoord: originAsteroid!,
        destinationAsteroidCoord: destinationAsteroid!,
        destinationAsteroidOwner: to,
        sendType: ESendType[sendType],
        unitCounts: unitCounts.map((count) => bigintToNumber(count)),
        unitTypes: MUDEnums.EUnit,
        ...parseReceipt(receipt),
      });
    }
  );
};
