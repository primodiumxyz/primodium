import createCoreTables from "@/tables/coreTables";
import { SyncTables } from "@/tables/syncTables";
import { CreateNetworkResult, Tables } from "@/lib/types";

export function createTables(network: CreateNetworkResult, syncTables: SyncTables): Tables {
  const coreTables = createCoreTables(network);

  return {
    ...network.tables,
    ...coreTables,
    ...syncTables,
  };
}
