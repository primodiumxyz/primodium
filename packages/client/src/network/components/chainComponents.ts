import { Type } from "@latticexyz/recs";
import { world } from "../world";
import newComponent, {
  newBoolComponent,
  newEntityComponent,
  newNumberComponent,
  newStringComponent,
} from "./customComponents/Component";
import { newArrivalComponent } from "./customComponents/ArrivalComponent";
import { BattleParticipantComponent } from "./customComponents/BattleParticipantComponent";

const commonIdPrefix = "component.";

// todo: organize these
export const Counter = newComponent(
  world,
  { value: Type.Number },
  { id: "Counter", metadata: { contractId: `${commonIdPrefix}Counter` } }
);

export const GameConfig = newComponent(
  world,
  {
    moveSpeed: Type.Number,
    motherlodeDistance: Type.Number,
    maxMotherlodesPerAsteroid: Type.Number,
    motherlodeChanceInv: Type.Number,
  },
  { id: "GameConfig", metadata: { contractId: `${commonIdPrefix}GameConfig` } }
);

export const BuildingType = newComponent(
  world,
  { value: Type.Entity },
  {
    id: "BuildingType",
    metadata: { contractId: `${commonIdPrefix}BuildingType` },
    overridable: true,
  }
);

export const RawBlueprint = newComponent(
  world,
  { value: Type.NumberArray },
  {
    id: "RawBlueprint",
    metadata: { contractId: `${commonIdPrefix}P_Blueprint` },
  }
);

export const SystemsRegistry = newStringComponent(world, {
  id: "SystemsRegistry",
  metadata: { contractId: "world.component.systems" },
});

export const ComponentsRegistry = newStringComponent(world, {
  id: "ComponentsRegistry",
  metadata: { contractId: "world.component.components" },
});

export const LoadingState = newComponent(
  world,
  {
    state: Type.Number,
    msg: Type.String,
    percentage: Type.Number,
  },
  {
    id: "LoadingState",
    metadata: { contractId: `${commonIdPrefix}LoadingState` },
  }
);

export const Item = newNumberComponent(world, {
  id: "Item",
  metadata: { contractId: `${commonIdPrefix}Item` },
});

export const HasResearched = newBoolComponent(world, {
  id: "HasResearched",
  metadata: { contractId: `${commonIdPrefix}HasResearched` },
});

export const P_IsTech = newBoolComponent(world, {
  id: "P_IsTech",
  metadata: { contractId: `${commonIdPrefix}P_IsTech` },
});

export const MainBase = newComponent(
  world,
  { value: Type.Entity },
  {
    id: "MainBase",
    metadata: { contractId: `${commonIdPrefix}MainBase` },
  }
);

export const P_RequiredResearch = newNumberComponent(world, {
  id: "P_RequiredResearch",
  metadata: { contractId: `${commonIdPrefix}P_RequiredResearch` },
});

export const P_RequiredResources = newComponent(
  world,
  { resources: Type.EntityArray, values: Type.NumberArray },

  {
    id: "P_RequiredResources",
    metadata: { contractId: `${commonIdPrefix}P_RequiredResources` },
  }
);
export const P_RequiredUtility = newComponent(
  world,
  { resourceIDs: Type.EntityArray, requiredAmounts: Type.NumberArray },

  {
    id: "P_RequiredUtility",
    metadata: { contractId: `${commonIdPrefix}P_RequiredUtility` },
  }
);
export const P_MaxLevel = newNumberComponent(world, {
  id: "P_MaxLevel",
  metadata: { contractId: `${commonIdPrefix}P_MaxLevel` },
  overridable: true,
});

export const Level = newNumberComponent(world, {
  id: "Level",
  metadata: { contractId: `${commonIdPrefix}Level` },
  overridable: true,
});

export const P_MaxStorage = newNumberComponent(world, {
  id: "P_MaxStorage",
  metadata: { contractId: `${commonIdPrefix}P_MaxStorage` },
  overridable: true,
});

export const P_Production = newComponent(
  world,
  { resourceID: Type.Entity, resourceProductionRate: Type.Number },

  {
    id: "P_Production",
    metadata: { contractId: `${commonIdPrefix}P_Production` },
  }
);

export const P_ProductionDependencies = newComponent(
  world,
  { resources: Type.EntityArray, values: Type.NumberArray },

  {
    id: "P_ProductionDependencies",
    metadata: { contractId: `${commonIdPrefix}P_ProductionDependencies` },
  }
);
export const Production = newNumberComponent(world, {
  id: "Production",
  metadata: { contractId: `${commonIdPrefix}Production` },
  overridable: true,
});

export const MaxUtility = newNumberComponent(world, {
  id: "MaxUtility",
  metadata: { contractId: `${commonIdPrefix}MaxUtility` },
  overridable: true,
});

export const OccupiedUtilityResource = newNumberComponent(world, {
  id: "OccupiedUtilityResource",
  metadata: { contractId: `${commonIdPrefix}OccupiedUtilityResource` },
  overridable: true,
});

export const Children = newComponent(
  world,
  { value: Type.EntityArray },
  {
    id: "Children",
    metadata: { contractId: `${commonIdPrefix}Children` },
  }
);

export const OwnedBy = newComponent(
  world,
  { value: Type.Entity },
  {
    id: "OwnedBy",
    metadata: { contractId: `${commonIdPrefix}OwnedBy` },
    overridable: true,
  }
);

export const LastClaimedAt = newNumberComponent(world, {
  id: "LastClaimedAt",
  metadata: { contractId: `${commonIdPrefix}LastClaimedAt` },
  overridable: true,
});

export const IsDebug = newBoolComponent(world, {
  id: "IsDebug",
  metadata: { contractId: `${commonIdPrefix}IsDebug` },
});

export const Active = newBoolComponent(world, {
  id: "Active",
  metadata: { contractId: `${commonIdPrefix}Active` },
});

export const AsteroidType = newNumberComponent(world, {
  id: "AsteroidType",
  metadata: { contractId: `${commonIdPrefix}AsteroidType` },
});

export const Dimensions = newComponent(
  world,
  {
    width: Type.Number,
    height: Type.Number,
  },
  { id: "Dimensions", metadata: { contractId: `${commonIdPrefix}Dimensions` } }
);

export const Position = newComponent(
  world,
  {
    x: Type.Number,
    y: Type.Number,
    parent: Type.Entity,
  },
  {
    id: "Position",
    metadata: { contractId: `${commonIdPrefix}Position` },
    overridable: true,
  }
);

export const ReversePosition = newComponent(
  world,
  {
    value: Type.Entity,
  },
  {
    id: "ReversePosition",
    metadata: { contractId: `${commonIdPrefix}ReversePosition` },
  }
);

export const P_Terrain = newComponent(
  world,
  {
    value: Type.Entity,
  },
  {
    id: "P_Terrain",
    metadata: { contractId: `${commonIdPrefix}P_Terrain` },
  }
);

export const P_RequiredTile = newComponent(
  world,
  {
    value: Type.Entity,
  },
  {
    id: "P_RequiredTile",
    metadata: { contractId: `${commonIdPrefix}P_RequiredTile` },
  }
);

/* -------------------------------------------------------------------------- */
/*                                   World                                    */
/* -------------------------------------------------------------------------- */
export const P_WorldSpeed = newNumberComponent(world, {
  id: "P_WorldSpeed",
  metadata: { contractId: `${commonIdPrefix}P_WorldSpeed` },
  overridable: true,
});

/* -------------------------------------------------------------------------- */
/*                                 Motherlode                                 */
/* -------------------------------------------------------------------------- */

export const Motherlode = newComponent(
  world,
  {
    size: Type.Number,
    motherlodeType: Type.Number,
    cooldownBlocks: Type.String,
  },
  {
    id: "Motherlode",
    metadata: { contractId: `${commonIdPrefix}Motherlode` },
  }
);

export const MotherlodeResource = newNumberComponent(world, {
  id: "MotherlodeResource",
  metadata: { contractId: `${commonIdPrefix}MotherlodeResource` },
});

export const P_MotherlodeResource = newComponent(
  world,
  {
    resource: Type.Entity,
    maxAmount: Type.Number,
  },
  {
    id: "P_MotherlodeResource",
    metadata: { contractId: `${commonIdPrefix}P_MotherlodeResource` },
  }
);

export const IsMineableAt = newStringComponent(world, {
  id: "IsMineableAt",
  metadata: { contractId: `${commonIdPrefix}IsMineableAt` },
});
/* -------------------------------------------------------------------------- */
/*                                    Units                                   */
/* -------------------------------------------------------------------------- */

export const P_IsUnit = newBoolComponent(world, {
  id: "P_IsUnit",
  metadata: { contractId: `${commonIdPrefix}P_IsUnit` },
});
export const P_UnitAttack = newNumberComponent(world, {
  id: "P_UnitAttack",
  metadata: { contractId: `${commonIdPrefix}P_UnitAttack` },
});

export const P_UnitCargo = newNumberComponent(world, {
  id: "P_UnitCargo",
  metadata: { contractId: `${commonIdPrefix}P_UnitCargo` },
});

export const P_UnitTravelSpeed = newNumberComponent(world, {
  id: "P_UnitTravelSpeed",
  metadata: { contractId: `${commonIdPrefix}P_UnitTravelSpeed` },
});

export const P_UnitDefence = newNumberComponent(world, {
  id: "P_UnitDefence",
  metadata: { contractId: `${commonIdPrefix}P_UnitDefence` },
});

export const P_UnitMining = newNumberComponent(world, {
  id: "P_UnitMining",
  metadata: { contractId: `${commonIdPrefix}P_UnitMining` },
});

export const Units = newNumberComponent(world, {
  id: "Units",
  metadata: { contractId: `${commonIdPrefix}Units` },
});

/* -------------------------------------------------------------------------- */
/*                                Unit Training                               */
/* -------------------------------------------------------------------------- */
export const P_UnitProductionMultiplier = newNumberComponent(world, {
  id: "P_UnitProductionMultiplier",
  metadata: { contractId: `${commonIdPrefix}P_UnitProductionMultiplier` },
});

export const P_UnitProductionTypes = newComponent(
  world,
  {
    value: Type.EntityArray,
  },
  {
    id: "P_UnitProductionTypes",
    metadata: { contractId: `${commonIdPrefix}P_UnitProductionTypes` },
  }
);

export const P_TrainingTime = newNumberComponent(world, {
  id: "P_TrainingTime",
  metadata: { contractId: `${commonIdPrefix}P_UnitTrainingTime` },
});

export const UnitProductionLastQueueIndex = newNumberComponent(world, {
  id: "UnitProductionLastQueueIndex",
  metadata: { contractId: `${commonIdPrefix}UnitProductionLastQueueIndex` },
});

export const UnitProductionOwnedBy = newComponent(
  world,
  { value: Type.Entity },
  {
    id: "UnitProductionOwnedBy",
    metadata: { contractId: `${commonIdPrefix}UnitProductionOwnedBy` },
  }
);

export const UnitProductionQueue = newComponent(
  world,
  { unitEntity: Type.Entity, count: Type.Number },
  {
    id: "UnitProductionQueue",
    metadata: { contractId: `${commonIdPrefix}UnitProductionQueue` },
  }
);

export const UnitProductionQueueIndex = newNumberComponent(world, {
  id: "UnitProductionQueueIndex",
  metadata: { contractId: `${commonIdPrefix}UnitProductionQueueIndex` },
});

/* -------------------------------------------------------------------------- */
/*                                  Arrivals                                  */
/* -------------------------------------------------------------------------- */

export const Arrival = newArrivalComponent();
export const MaxMoves = newNumberComponent(world, {
  id: "MaxMoves",
  metadata: { contractId: `${commonIdPrefix}MaxMoves` },
});

export const ArrivalsIndex = newEntityComponent(world, {
  id: "ArrivalsIndex",
  metadata: { contractId: `${commonIdPrefix}ArrivalsIndex` },
});

export const ArrivalsSize = newNumberComponent(world, {
  id: "ArrivalsSize",
  metadata: { contractId: `${commonIdPrefix}ArrivalsSize` },
});

/* -------------------------------------------------------------------------- */
/*                                 Leaderboard                                */
/* -------------------------------------------------------------------------- */

export const Score = newNumberComponent(world, {
  id: "Score",
  metadata: { contractId: `${commonIdPrefix}Score` },
});

export const P_ScoreMultiplier = newNumberComponent(world, {
  id: "P_ScoreMultiplier",
  metadata: { contractId: `${commonIdPrefix}P_ScoreMultiplier` },
});

/* -------------------------------------------------------------------------- */
/*                                   Battle                                   */
/* -------------------------------------------------------------------------- */

export const BattleAttacker = BattleParticipantComponent({
  id: "BattleAttacker",
  metadata: { contractId: `${commonIdPrefix}BattleAttacker` },
});
export const BattleDefender = BattleParticipantComponent({
  id: "BattleDefender",
  metadata: { contractId: `${commonIdPrefix}BattleDefender` },
});
export const BattleSpaceRock = newEntityComponent(world, {
  id: "BattleSpaceRock",
  metadata: { contractId: `${commonIdPrefix}BattleSpaceRock` },
});
export const BattleResult = newComponent(
  world,
  {
    winner: Type.Entity,
    attackerUnitsLeft: Type.NumberArray,
    defenderUnitsLeft: Type.NumberArray,
  },
  {
    id: "BattleResult",
    metadata: { contractId: `${commonIdPrefix}BattleResult` },
  }
);
export const BattleBlockNumber = newNumberComponent(world, {
  id: "BattleBlockNumber",
  metadata: { contractId: `${commonIdPrefix}BattleBlockNumber` },
});
export const BattleRaidResult = newComponent(
  world,
  {
    resources: Type.EntityArray,
    defenderValuesBeforeRaid: Type.NumberArray,
    raidedAmount: Type.NumberArray,
  },
  {
    id: "BattleRaidResult",
    metadata: { contractId: `${commonIdPrefix}BattleRaidResult` },
  }
);

export default {
  GameConfig,
  P_Terrain,
  Active,
  AsteroidType,
  Counter,
  Dimensions,
  BuildingType,
  Position,
  OwnedBy,
  LastClaimedAt,
  IsDebug,
  Item,
  HasResearched,
  MainBase,
  P_RequiredResearch,
  P_RequiredResources,
  P_RequiredUtility,
  P_MaxLevel,
  Level,
  P_MaxStorage,
  Production,
  Children,
  RawBlueprint,
  SystemsRegistry,
  ComponentsRegistry,
  LoadingState,
  OccupiedUtilityResource,
  MaxUtility,
  ReversePosition,
  P_Production,
  P_ProductionDependencies,
  P_RequiredTile,
  // World
  P_WorldSpeed,

  // Motherlodes
  Motherlode,
  MotherlodeResource,
  P_MotherlodeResource,
  IsMineableAt,

  // Units
  P_IsUnit,
  P_UnitAttack,
  P_UnitCargo,
  P_UnitTravelSpeed,
  P_UnitDefence,
  P_UnitMining,
  Units,

  // Unit Training
  P_UnitProductionMultiplier,
  P_UnitProductionTypes,
  P_TrainingTime,
  UnitProductionLastQueueIndex,
  UnitProductionOwnedBy,
  UnitProductionQueue,
  UnitProductionQueueIndex,

  // Arrivals
  Arrival,
  ArrivalsIndex,
  ArrivalsSize,
  MaxMoves,

  // Scoreboard
  Score,
  P_ScoreMultiplier,

  // Battle
  BattleAttacker,
  BattleDefender,
  BattleSpaceRock,
  BattleResult,
  BattleBlockNumber,
  BattleRaidResult,
};
