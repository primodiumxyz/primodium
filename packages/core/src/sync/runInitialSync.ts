import { Core, SyncSourceType, SyncStep } from "@/lib/types";

/**
 * Runs default initial sync process. Syncs to indexer. If indexer is not available, syncs to RPC.
 *
 * @param core {@link Core}
 * @param playerAddress Player address (optional). If included, will fetch player data on initial sync
 */
export const runInitialSync = async (core: Core) => {
  const {
    network,
    tables,
    config,
    sync: { syncFromRPC, subscribeToRPC, syncInitialGameState, syncSecondaryGameState },
  } = core;
  const { publicClient, triggerUpdateStream } = network;
  const fromBlock = config.initialBlockNumber ?? 0n;

  // Once historical sync (indexer > rpc) is complete
  const onSyncComplete = (processPendingLogs?: () => void) => {
    // process logs that came in the meantime
    processPendingLogs?.();

    // trigger update stream for all entities in all components (to update UI on hooks and watchers)
    triggerUpdateStream();

    // set sync status to live so it processed incoming blocks immediately
    tables.SyncStatus.set({ step: SyncStep.Live, progress: 1, message: "Subscribed to live updates" });
  };

  if (!config.chain.indexerUrl) {
    console.warn("No indexer url found, hydrating from RPC");
    tables.SyncSource.set({ value: SyncSourceType.RPC });

    const toBlock = await publicClient.getBlockNumber();
    // Start live sync right away (it will store logs until `SyncStatus` is `SyncStep.Live`)
    const processPendingLogs = subscribeToRPC();

    syncFromRPC(
      fromBlock,
      toBlock,
      //on complete
      () => onSyncComplete(processPendingLogs),
      //on error
      (err: unknown) => {
        tables.SyncStatus.set({
          step: SyncStep.Error,
          progress: 0,
          message: `Failed to sync from RPC`,
        });

        console.warn("Failed to sync from RPC");
        console.log(err);
      },
    );

    return;
  }

  const onError = async (err: unknown) => {
    console.warn("Failed to fetch from indexer, hydrating from RPC");
    tables.SyncSource.set({ value: SyncSourceType.RPC });
    const toBlock = await publicClient.getBlockNumber();
    const processPendingLogs = subscribeToRPC();

    syncFromRPC(
      fromBlock,
      toBlock,
      //on complete
      () => onSyncComplete(processPendingLogs),
      //on error
      (err: unknown) => {
        tables.SyncStatus.set({
          step: SyncStep.Error,
          progress: 0,
          message: `Failed to sync from RPC. Please try again.`,
        });
        console.warn("Failed to sync from RPC ");
      },
    );
  };

  tables.SyncSource.set({ value: SyncSourceType.Indexer });
  // sync initial game state from indexer
  syncInitialGameState(
    // on complete
    () => {
      tables.SyncStatus.set({
        step: SyncStep.Complete,
        progress: 1,
        message: `DONE`,
      });

      // initialize secondary state
      syncSecondaryGameState(
        // on complete
        onSyncComplete,
        onError,
      );
    },
    onError,
  );

  // resolve when sync is live
  return await new Promise<void>((resolve) => {
    tables.SyncStatus.watch({
      onChange: ({ properties }) => {
        if (properties.current?.step === SyncStep.Live) {
          resolve();
        }
      },
    });
  });
};
