import { Entity } from "@latticexyz/recs";
import { EOrderType } from "contracts/config/enums";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { SetupNetworkResult } from "src/network/types";
import { world } from "src/network/world";
import { bigintToNumber } from "src/util/bigint";
import { getBlockTypeName } from "src/util/common";
import { RESOURCE_SCALE, ResourceEnumLookup, UnitEnumLookup } from "src/util/constants";
import { parseReceipt } from "../../analytics/parseReceipt";

export const createOrder = async (rawResource: Entity, count: bigint, price: bigint, network: SetupNetworkResult) => {
  const rawResourceId = ResourceEnumLookup[rawResource];
  const { resourceId, type } = rawResourceId
    ? { resourceId: rawResourceId, type: EOrderType.Resource }
    : { resourceId: UnitEnumLookup[rawResource], type: EOrderType.Unit };
  if (!resourceId) {
    throw new Error("Invalid resource or unit");
  }
  await execute(
    () => network.worldContract.write.addOrder([type, resourceId, count, price]),
    network,
    {
      id: world.registerEntity(),
    },
    (receipt) => {
      const scaledPrice = (price * BigInt(1e18)) / RESOURCE_SCALE;
      const scaledCount = BigInt(count) * RESOURCE_SCALE;

      ampli.systemAddOrder({
        resourceType: getBlockTypeName(rawResource),
        resourceCount: bigintToNumber(scaledCount),
        resourcePrice: bigintToNumber(scaledPrice),
        ...parseReceipt(receipt),
      });
      null;
    }
  );
};
