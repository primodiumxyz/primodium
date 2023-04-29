import { SetupContractConfig, setupMUDNetwork } from "@latticexyz/std-client";
import {
  createWorld,
  defineComponentSystem,
  setComponent,
} from "@latticexyz/recs";
import { createFaucetService } from "@latticexyz/network";
import { SingletonID } from "@latticexyz/network";
import { utils } from "ethers";

import { SystemTypes } from "contracts/types/SystemTypes";
import { SystemAbis } from "contracts/types/SystemAbis.mjs";
import { defineComponents, defineOffChainComponents } from "./components";
import { defaultParamsSkyStrife } from "./config";

export async function createNetworkLayer(config: SetupContractConfig) {
  // The world contains references to all entities, all components and disposers.
  const world = createWorld();
  const singletonIndex = world.registerEntity({ id: SingletonID });

  // Components contain the application state.
  // If a contractId is provided, MUD syncs the state with the corresponding
  // component contract (in this case `CounterComponent.sol`)

  const contractComponents = defineComponents(world);
  const offChainComponents = defineOffChainComponents(world);

  const { startSync, systems, components, network, gasPriceInput$ } =
    await setupMUDNetwork<typeof contractComponents, SystemTypes>(
      config,
      world,
      contractComponents,
      SystemAbis
    );

  const intervalId = setInterval(async () => {
    const gasPrice = Math.ceil(
      (await network.providers.get().json.getGasPrice()).toNumber() * 1.1
    );
    console.log(
      "[GAS] Adjusted gas price to " +
        Math.ceil(gasPrice / 1_000_000_000) +
        " gwei"
    );
    gasPriceInput$.next(gasPrice);
  }, 5000);

  world.registerDisposer(() => clearInterval(intervalId));

  defineComponentSystem(world, components.Counter, (update) => {
    setComponent(offChainComponents.DoubleCounter, singletonIndex, {
      value: update.value[0]!.value * 2,
    });
  });

  // Faucet setup
  const faucet = defaultParamsSkyStrife.faucet
    ? createFaucetService(defaultParamsSkyStrife.faucet)
    : undefined;

  const playerIsBroke = (await network.signer.get()?.getBalance())?.lte(
    utils.parseEther("0.9")
  );
  if (playerIsBroke) {
    console.info("[Dev Faucet] Dripping funds to player");
    const address = network.connectedAddress.get();
    address && (await faucet?.dripDev({ address }));
  }

  startSync();

  return {
    world,
    systems,
    components,
    offChainComponents,
    singletonIndex,
    providers: network.providers,
  };
}
