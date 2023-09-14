import { StaticAbiType } from "@latticexyz/schema-type/deprecated";
import { ConfigFieldTypeToPrimitiveType, StoreConfig } from "@latticexyz/store";

type Tables<C extends StoreConfig, T = undefined> = {
  [Table in keyof C["tables"]]?: {
    [Field in keyof C["tables"][Table]["schema"]]: T extends undefined
      ? ConfigFieldTypeToPrimitiveType<C["tables"][Table]["schema"][Field]>
      : C["tables"][Table]["keySchema"] extends T
      ? ConfigFieldTypeToPrimitiveType<C["tables"][Table]["schema"][Field]>
      : never;
  };
};

export type PrototypeConfig<C extends StoreConfig> = {
  keys?: Record<string, StaticAbiType>;
  tables?: Tables<C>;
  levels?: Record<number, Tables<C, { level: "uint32" } | { id: unknown }>>;
};

export type PrototypesConfig<C extends StoreConfig> = Record<string, PrototypeConfig<C>>;

export type StoreConfigWithPrototypes = StoreConfig & {
  prototypes: PrototypesConfig<StoreConfig>;
};
