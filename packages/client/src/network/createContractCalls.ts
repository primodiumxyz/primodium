import { abiTypesToSchema, encodeField, schemaToHex } from "@latticexyz/protocol-parser";
import { ComponentValue, Entity, Schema } from "@latticexyz/recs/src/types";
import { StaticAbiType } from "@latticexyz/schema-type";
import { entityToHexKeyTuple } from "@latticexyz/store-sync/recs";
import { Hex } from "viem";
import { Components, ContractComponent, SetupNetworkResult } from "./types";
export function createContractCalls(
  { worldContract, waitForTransaction }: SetupNetworkResult,
  { Counter }: Components
) {
  /* -------------------------------------------------------------------------- */
  /*                                 DEV SYSTEMS                                */
  /* -------------------------------------------------------------------------- */

  const increment = async () => {
    const tx = await worldContract.write.increment();
    await waitForTransaction(tx);
    return Counter.get();
  };

  const setRecord = async (tableId: Hex, key: Hex[], data: Hex, schema: Hex) => {
    const tx = await worldContract.write.devSetRecord([tableId, key, data, schema]);
    await waitForTransaction(tx);
  };

  async function setComponentValue<S extends Schema>(
    component: ContractComponent<S>,
    entity: Entity,
    newValues: Partial<ComponentValue<S>>
  ) {
    const tableId = component.id as Hex;
    const key = entityToHexKeyTuple(entity);
    const valueSchema = schemaToHex(abiTypesToSchema(Object.values(component.metadata.valueSchema) as StaticAbiType[]));

    const schema = Object.keys(component.metadata.valueSchema);
    Object.entries(newValues).forEach(async ([name, value]) => {
      const type = component.metadata.valueSchema[name] as StaticAbiType;
      const data = encodeField(type, value);
      const schemaIndex = schema.indexOf(name);
      const tx = await worldContract.write.devSetField([tableId, key, schemaIndex, data, valueSchema]);
      await waitForTransaction(tx);
    });
  }

  // const pushToField = async (tableId: string, key: string[], schemaIndex: number, dataToPush: string) => {
  //   const tx = await worldContract.write.devPushToField([tableId, key, schemaIndex, dataToPush]);
  //   await waitForTransaction(tx);
  // };

  // const popFromField = async (tableId: string, key: string[], schemaIndex: number, dataToPush: string) => {
  //   const tx = await worldContract.write.devPopFromField([tableId, key, schemaIndex, dataToPush]);
  //   await waitForTransaction(tx);
  // };

  // const updateInField = async (tableId: string, key: string[], schemaIndex: number, dataToPush: string) => {
  //   const tx = await worldContract.write.devUpdateInField([tableId, key, schemaIndex, dataToPush]);
  //   await waitForTransaction(tx);
  // };

  // const deleteRecord = async (tableId: string, key: string[], schemaIndex: number, dataToPush: string) => {
  //   const tx = await worldContract.write.devDeleteRecord([tableId, key, schemaIndex, dataToPush]);
  //   await waitForTransaction(tx);
  // };

  return {
    /* ------------------------------- dev systems ------------------------------ */
    increment,
    setRecord,
    setComponentValue,
    // pushToField,
    // popFromField,
    // updateInField,
    // deleteRecord,
  };
}
