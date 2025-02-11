import { InterfaceIcons } from "@primodiumxyz/assets";
import { Core, getEntityTypeName } from "@primodiumxyz/core";
import { Entity, query } from "@primodiumxyz/reactive-tables";

import { BuildObjective, ObjectiveReq } from "./types";

export function getHasRequiredBuilding({ tables }: Core, asteroid: Entity, objective: BuildObjective): ObjectiveReq {
  const buildings = query({
    withProperties: [
      {
        table: tables.OwnedBy,
        properties: { value: asteroid },
      },

      { table: tables.BuildingType, properties: { value: objective.buildingType } },
    ],
  });

  return {
    tooltipText: `Build a ${getEntityTypeName(objective.buildingType)}`,
    backgroundImage: InterfaceIcons.Build,
    requiredValue: 1n,
    currentValue: BigInt(buildings.length),
    isBool: true,
    scale: 1n,
  };
}
