import { Component } from "@latticexyz/recs";
import { ContractComponent } from "src/network/types";
import {
  ExtendedComponent,
  ExtendedContractComponent,
  extendComponent,
  extendContractComponent,
} from "./ExtendedComponent";

export function extendComponents<C extends Components>(components: C): ExtendedComponents<C> {
  const cs = Object.fromEntries(
    Object.entries(components).map(([key, value]) => [key, extendComponent(value)])
  ) as ExtendedComponents<C>;
  console.log(cs);
  return cs;
}

export function extendContractComponents<C extends Components>(components: C): ExtendedContractComponents<C> {
  return Object.fromEntries(
    Object.entries(components).map(([key, value]) => [key, extendContractComponent(value)])
  ) as ExtendedContractComponents<C>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Components = { [key: string]: Component<any, any, any> };

type TransformComponent<T> = T extends Component<infer S, infer M, infer U> ? ExtendedComponent<S, M, U> : never;

export type ExtendedComponents<C extends Components> = {
  [K in keyof C]: TransformComponent<C[K]>;
};

type TransformContractComponent<T> = T extends ContractComponent<infer S, infer U>
  ? ExtendedContractComponent<S, U>
  : never;

export type ExtendedContractComponents<C extends Components> = {
  [K in keyof C]: TransformContractComponent<C[K]>;
};
