import { createBlockStream } from "@latticexyz/block-logs-stream";
import {
  concatMap,
  filter,
  firstValueFrom,
  identity,
  map,
  Observable,
  scan,
  share,
  shareReplay,
  throwError,
  timeout,
} from "rxjs";
import { Block, Hex, PublicClient, TransactionReceiptNotFoundError } from "viem";

import {
  ContractTableDefs,
  createWrapper,
  World as RecsWorld,
  StoreConfig,
  WrapperResult,
} from "@primodiumxyz/reactive-tables";
import { StorageAdapterBlock } from "@primodiumxyz/reactive-tables/utils";
import { Read } from "@primodiumxyz/sync-stack";
import { SyncStep } from "@/lib";
import { SyncTables } from "@/tables/syncTables";

export type Recs<config extends StoreConfig, extraTables extends ContractTableDefs> = Omit<
  WrapperResult<config, extraTables>,
  "world"
> & {
  latestBlock$: Observable<Block<bigint, false, "latest">>;
  latestBlockNumber$: Observable<bigint>;
  storedBlockLogs$: Observable<StorageAdapterBlock>;
  waitForTransaction: (tx: Hex) => Promise<void>;
};

//TODO: Move this into the reactive-tables package
export const setupRecs = <config extends StoreConfig, extraTables extends ContractTableDefs>(args: {
  mudConfig: config;
  world: RecsWorld;
  publicClient: PublicClient;
  address: Hex;
  otherTableDefs?: extraTables;
  syncTables?: SyncTables;
}): Recs<config, extraTables> => {
  const { mudConfig, publicClient, world, address, otherTableDefs, syncTables } = args;

  const { tables, tableDefs, storageAdapter, triggerUpdateStream } = createWrapper({
    mudConfig,
    world,
    otherTableDefs,
    shouldSkipUpdateStream: () => syncTables?.SyncStatus.get()?.step !== SyncStep.Live,
  });

  const latestBlock$ = createBlockStream({ publicClient, blockTag: "latest" }).pipe(shareReplay(1));

  const latestBlockNumber$ = latestBlock$.pipe(
    map((block) => block.number),
    shareReplay(1),
  );

  const storedBlockLogs$ = new Observable<StorageAdapterBlock>((subscriber) => {
    const unsub = Read.fromRPC
      .subscribe({
        address,
        publicClient,
      })
      .subscribe((block) => {
        subscriber.next({
          blockNumber: block.blockNumber,
          logs: [...block.logs],
        });
      });

    // Handle unsubscription
    return () => {
      unsub();
    };
  }).pipe(share());

  // keep 10 blocks worth processed transactions in memory
  const recentBlocksWindow = 10;
  // most recent block first, for ease of pulling the first one off the array
  const recentBlocks$ = storedBlockLogs$.pipe(
    scan<StorageAdapterBlock, StorageAdapterBlock[]>(
      (recentBlocks, block) => [block, ...recentBlocks].slice(0, recentBlocksWindow),
      [],
    ),
    filter((recentBlocks) => recentBlocks.length > 0),
    shareReplay(1),
  );

  // TODO: move to its own file so we can test it, have its own debug instance, etc.
  async function waitForTransaction(tx: Hex): Promise<void> {
    // debug("waiting for tx", tx);

    // This currently blocks for async call on each block processed
    // We could potentially speed this up a tiny bit by racing to see if 1) tx exists in processed block or 2) fetch tx receipt for latest block processed
    const hasTransaction$ = recentBlocks$.pipe(
      concatMap(async (blocks) => {
        const txs = blocks.flatMap((block) => block.logs.map((op) => op.transactionHash).filter((elem) => !!elem));
        if (txs.includes(tx)) return true;

        try {
          const lastBlock = blocks[0];
          // debug("fetching tx receipt for block", lastBlock.blockNumber);
          const receipt = await publicClient.getTransactionReceipt({ hash: tx });
          return lastBlock.blockNumber >= receipt.blockNumber;
        } catch (error) {
          if (error instanceof TransactionReceiptNotFoundError) {
            return false;
          }
          console.log(error);
          return false;
        }
      }),
    );

    await firstValueFrom(
      hasTransaction$.pipe(
        filter(identity),
        timeout({ each: 10_000, with: () => throwError(() => new Error("Transaction failed.")) }),
      ),
    );
  }

  return {
    tables,
    tableDefs,
    storageAdapter,
    triggerUpdateStream,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    waitForTransaction,
  };
};
