import { ContractWrite, createBurnerAccount, getContract, transportObserver } from "@latticexyz/common";
import IWorldAbi from "contracts/out/IWorld.sol/IWorld.abi.json";
import { Subject } from "rxjs";
import { normalizeAddress } from "src/util/common";
import { STORAGE_PREFIX } from "src/util/constants";
import { addressToEntity } from "src/util/encode";
import { Hex, createPublicClient, createWalletClient, fallback, http } from "viem";
import { generatePrivateKey } from "viem/accounts";
import { getNetworkConfig } from "../config/getNetworkConfig";

export async function setupBurnerAccount(privateKey?: Hex) {
  const key = privateKey ?? generatePrivateKey();
  const networkConfig = getNetworkConfig();
  const burnerAccount = createBurnerAccount(key);
  localStorage.setItem(STORAGE_PREFIX + burnerAccount.address, key);
  const clientOptions = {
    chain: networkConfig.chain,
    transport: transportObserver(fallback([http()])),
    pollingInterval: 1000,
  };

  const publicClient = createPublicClient(clientOptions);

  const sessionWalletClient = createWalletClient({
    ...clientOptions,
    account: burnerAccount,
  });

  const write$ = new Subject<ContractWrite>();
  const sessionWorldContract = getContract({
    address: networkConfig.worldAddress as Hex,
    abi: IWorldAbi,
    publicClient,
    walletClient: sessionWalletClient,
    onWrite: (write) => write$.next(write),
  });
  return {
    worldContract: sessionWorldContract,
    account: sessionWalletClient.account,
    address: normalizeAddress(sessionWalletClient.account.address),
    publicClient,
    walletClient: sessionWalletClient,
    entity: addressToEntity(sessionWalletClient.account.address),
    privateKey: key,
    write$,
  };
}
