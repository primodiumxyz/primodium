import { memo, useEffect, useRef, useState } from "react";

import "react-toastify/dist/ReactToastify.min.css";
import { Hex } from "viem";
import { useAccount } from "wagmi";
import { useShallow } from "zustand/react/shallow";
import AppLoadingState from "./AppLoadingState";
import { Initializing } from "./components/shared/Initializing";
import { usePersistentStore } from "./game/stores/PersistentStore";
import { MudProvider } from "./hooks/providers/MudProvider";
import useSetupResult from "./hooks/useSetupResult";
import { world } from "./network/world";
import { Maintenance } from "./screens/Maintenance";

const MAINTENANCE = import.meta.env.PRI_MAINTENANCE === "true";

function SetupResultProvider() {
  const setupResult = useSetupResult();
  const [loading, setLoading] = useState(true);
  const { network, updatePlayerAccount, playerAccount, components } = setupResult;
  const externalAccount = useAccount();
  const mounted = useRef<boolean>(false);

  const { noExternalAccount } = usePersistentStore(
    useShallow((state) => ({ noExternalAccount: state.noExternalAccount }))
  );

  console.log("noExternalAccount", noExternalAccount);
  useEffect(() => {
    /* This cheese exists because otherwise there is a race condition to check if the player 
        has a home asteroid. This makes the site crash when a player changes accounts to an account 
        without a home asteroid 
    */
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);

    if (import.meta.env.PRI_DEV == "true" || noExternalAccount) {
      const privateKey = localStorage.getItem("primodiumPlayerAccount") ?? undefined;
      updatePlayerAccount({ burner: true, privateKey: privateKey as Hex | undefined });
    } else {
      if (!externalAccount.address) return;
      updatePlayerAccount({ address: externalAccount.address });
    }
  }, [noExternalAccount, externalAccount.address, updatePlayerAccount]);

  useEffect(() => {
    if (!network || !playerAccount || mounted.current) return;
    // https://vitejs.dev/guide/env-and-mode.html
    if (import.meta.env.DEV) {
      import("@latticexyz/dev-tools").then(({ mount: mountDevTools }) =>
        mountDevTools({
          config: network.mudConfig,
          publicClient: playerAccount.publicClient,
          walletClient: playerAccount.walletClient,
          latestBlock$: network.latestBlock$,
          storedBlockLogs$: network.storedBlockLogs$,
          worldAddress: playerAccount.worldContract.address,
          worldAbi: playerAccount.worldContract.abi,
          write$: playerAccount.write$,
          recsWorld: world,
        })
      );
      mounted.current = true;
    }
  }, [network, playerAccount, mounted]);

  if (MAINTENANCE) return <Maintenance />;

  if (!noExternalAccount && externalAccount.status !== "connected") return null;

  if (loading || !network || !playerAccount || !components) return <Initializing />;
  return (
    <MudProvider {...setupResult} components={components} network={network} playerAccount={playerAccount}>
      <AppLoadingState />
    </MudProvider>
  );
}
export default memo(SetupResultProvider);
