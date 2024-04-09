import { Entity } from "@latticexyz/recs";
import { EObjectives } from "contracts/config/enums";

export type ObjectiveType = "Build" | "Upgrade" | "Train";

// Define a base type for common properties
export type BaseObjective = {
  description?: string;
  requiredMainBase?: bigint;
  requiredObjectives?: EObjectives[];
};

export type BuildObjective = BaseObjective & {
  type: "Build";
  buildingType: Entity;
};

export type UpgradeObjective = BaseObjective & {
  type: "Upgrade";
  buildingType: Entity;
  level: bigint;
};

export type TrainUnitObjective = BaseObjective & {
  type: "Train";
  unitType: Entity;
  unitCount: bigint;
};

// Union of all Objective types
export type Objective = BuildObjective | UpgradeObjective | TrainUnitObjective;

export type ObjectiveReq = {
  tooltipText?: string;
  backgroundImage?: string;
  requiredValue: bigint;
  currentValue: bigint;
  scale: bigint;
};
