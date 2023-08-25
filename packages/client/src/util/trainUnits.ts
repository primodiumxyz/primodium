import { EntityID } from "@latticexyz/recs";
import {
  BuildingType,
  Level,
  P_TrainingTime,
  P_UnitAttack,
  P_UnitCargo,
  P_UnitDefence,
  P_UnitMining,
  P_UnitProductionMultiplier,
  P_UnitProductionTypes,
  P_UnitTravelSpeed,
} from "src/network/components/chainComponents";
import { hashKeyEntity } from "./encode";

export function useTrainableUnits(buildingEntity: EntityID) {
  const buildingType = BuildingType.get(buildingEntity)?.value;
  if (!buildingType) return [];
  const level = Level.use(buildingEntity, { value: 0 }).value;
  const buildingLevelEntity = hashKeyEntity(buildingType, level);
  return P_UnitProductionTypes.use(buildingLevelEntity, { value: [] })?.value;
}

export function getUnitStats(unitEntity: EntityID) {
  const unitLevelEntity = hashKeyEntity(unitEntity, 1);
  const attack = P_UnitAttack.get(unitLevelEntity, { value: 0 })?.value;
  const defence = P_UnitDefence.get(unitLevelEntity, { value: 0 })?.value;
  const speed = P_UnitTravelSpeed.get(unitLevelEntity, { value: 0 })?.value;
  const mining = P_UnitMining.get(unitLevelEntity, { value: 0 })?.value;
  const cargo = P_UnitCargo.get(unitLevelEntity, { value: 0 })?.value;
  return [
    {
      name: "ATK",
      value: attack,
    },
    {
      name: "DEF",
      value: defence,
    },
    {
      name: "SPD",
      value: speed,
    },
    {
      name: "MIN",
      value: mining,
    },
    {
      name: "CRG",
      value: cargo,
    },
  ];
}

// time is in blocks (~1/second)
export function getUnitTrainingTime(
  player: EntityID,
  building: EntityID,
  unit: EntityID
) {
  const playerUnitEntity = hashKeyEntity(player, unit);
  const playerUnitLevel = Level.get(playerUnitEntity, { value: 1 }).value;
  const unitLevelEntity = hashKeyEntity(unit, playerUnitLevel);

  const buildingLevel = Level.get(building, { value: 1 }).value;
  const multiplier =
    P_UnitProductionMultiplier.get(hashKeyEntity(building, buildingLevel), {
      value: 100,
    }).value / 100;
  const time =
    P_TrainingTime.get(unitLevelEntity, { value: 0 }).value / multiplier;

  return time;
}
