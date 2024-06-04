import { EntityToResourceImage } from "@/lib/mappings";
import { Entity } from "@latticexyz/recs";
import { EResource } from "contracts/config/enums";
import { Hex } from "viem";
import { getEntityTypeName } from "@/utils/global/common";
import { ResourceEntityLookup, UtilityStorages } from "@/lib/constants";
import { ObjectiveReq } from "../types";
import { Components, ResourceType } from "@/lib/types";
import { createResourceUtils } from "@/utils/core/resource";

type ResourceUtils = ReturnType<typeof createResourceUtils>;

export function getRewardUtilitiesRequirement(
  components: Components,
  { getFullResourceCount }: ResourceUtils,
  objective: Entity,
  asteroid: Entity
): ObjectiveReq[] {
  const rewards = getRewards(components, objective);
  const requiredUtilities = rewards.reduce((acc, cur) => {
    if (cur.type !== ResourceType.Utility) return acc;
    const prototype = cur.id as Hex;
    const level = components.UnitLevel.getWithKeys({ unit: prototype, entity: asteroid as Hex })?.value ?? 0n;
    const requiredResources = components.P_RequiredResources.getWithKeys({ prototype, level });
    if (!requiredResources) return acc;
    requiredResources.resources.forEach((rawResource, i) => {
      const resource = ResourceEntityLookup[rawResource as EResource];
      const amount = requiredResources.amounts[i] * cur.amount;
      if (!UtilityStorages.has(resource)) return;
      acc[resource] ? (acc[resource] += amount) : (acc[resource] = amount);
    });
    return acc;
  }, {} as Record<Entity, bigint>);

  return Object.entries(requiredUtilities).map(([entity, requiredValue]) => {
    const { resourceCount, resourceStorage } = getFullResourceCount(entity as Entity, asteroid);
    const val = requiredValue + (resourceStorage - resourceCount);
    return {
      entity: entity as Entity,
      requiredValue: val,
      currentValue: resourceStorage,
      scale: 1n,
      backgroundImage: EntityToResourceImage[entity as Entity],
      tooltipText: `${getEntityTypeName(entity as Entity)}`,
    };
  });
}

export function getHasRequiredRewards(
  components: Components,
  { getFullResourceCount }: ResourceUtils,
  asteroidEntity: Entity,
  objectiveEntity: Entity
) {
  const rewards = getRewards(components, objectiveEntity);
  return rewards.every((resource) => {
    if (resource.type !== ResourceType.Resource) return true;
    const { resourceCount, resourceStorage } = getFullResourceCount(resource.id, asteroidEntity);
    return resourceCount + resource.amount < resourceStorage;
  });
}

export function getRewards(components: Components, entityId: Entity) {
  const { P_ResourceReward, P_UnitReward } = components;
  const rawResourceRewards = P_ResourceReward.get(entityId, {
    resources: [],
    amounts: [],
  });

  const rawUnitRewards = P_UnitReward.get(entityId, {
    units: [],
    amounts: [],
  });

  const resourceRewards = rawResourceRewards.resources.map((resource, index) => ({
    id: ResourceEntityLookup[resource as EResource],
    type: ResourceType.Resource,
    amount: rawResourceRewards.amounts[index],
  }));

  const unitRewards = rawUnitRewards.units.map((unit, index) => ({
    id: unit as Entity,
    type: ResourceType.Utility,
    amount: rawUnitRewards.amounts[index],
  }));

  return [...resourceRewards, ...unitRewards];
}
