import { mudConfig } from "@latticexyz/world/register";
import { getBlueprint } from "./config/util/blueprints";
import encodeBytes32 from "./config/util/encodeBytes32";
import { PrototypesConfig } from "./ts/prototypes/prototypeConfig";

// Exclude dev systems if not in dev PRI_DEV
let dev: string[] = [];
if (typeof process != undefined && typeof process != "undefined") {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: "../../.env" });
    dev = process.env.PRI_DEV === "true" ? [] : ["DevSystem"];
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */
export const config = mudConfig({
  excludeSystems: [...dev],

  structs: {},
  enums: {
    ERock: ["NULL", "Asteroid", "Motherlode", "LENGTH"],
    EBuilding: [
      "NULL",
      // Special
      "MainBase",

      // Mines
      "LithiumMine",
      "IronMine",
      "CopperMine",
      "SulfurMine",

      // Factories
      "IronPlateFactory",
      "AlloyFactory",
      "PVCellFactory",
      "RocketFuelFactory",

      // Utilities
      "SolarPanel",

      // Units
      "Hangar",
      "UnitTrainingBuilding",
      "StorageUnit",
      "DroneFactory",
      "Starmapper",
      "LENGTH",
    ],
  },
  tables: {
    /* ----------------------------------- Dev ---------------------------------- */
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    /* --------------------------------- Common --------------------------------- */
    Position: {
      keySchema: { entity: "bytes32" },
      schema: {
        x: "int32",
        y: "int32",
        parent: "bytes32",
      },
    },

    ReversePosition: {
      keySchema: { x: "int32", y: "int32" },
      schema: {
        entity: "bytes32",
      },
    },

    OwnedBy: {
      keySchema: { entity: "bytes32" },
      schema: {
        owner: "bytes32",
      },
    },

    Level: {
      keySchema: { entity: "bytes32" },
      schema: "uint32",
    },

    LastClaimedAt: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
    },

    /* --------------------------------- Player --------------------------------- */
    HomeAsteroid: {
      keySchema: { entity: "bytes32" },
      schema: {
        value: "bytes32",
      },
    },

    /* ---------------------------------- Rocks --------------------------------- */
    P_Asteroid: {
      keySchema: {},
      schema: {
        xBounds: "int32",
        yBounds: "int32",
      },
    },
    AsteroidCount: {
      keySchema: {},
      schema: "uint32",
    },

    RockType: {
      keySchema: { entity: "bytes32" },
      schema: "ERock",
    },

    // note: dimensions will always be positive, but are int32s so they work with coords
    Dimensions: {
      keySchema: { key: "bytes32", level: "uint32" },
      schema: {
        x: "int32",
        y: "int32",
      },
    },

    Spawned: {
      keySchema: { entity: "bytes32" },
      schema: "bool",
    },

    /* -------------------------------- Buildings ------------------------------- */
    P_BuildingTypeToPrototype: {
      keySchema: { buildingType: "EBuilding" },
      schema: "bytes32",
    },

    P_Blueprint: {
      keySchema: { prototype: "bytes32" },
      schema: "int32[]",
    },

    P_MaxLevel: {
      keySchema: { prototype: "bytes32" },
      schema: "uint32",
    },

    BuildingType: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32",
    },

    Children: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },
  },
});

const buildingIdToPrototypeId = config.enums.EBuilding.map((building, i) => ({
  [i]: {
    P_BuildingTypeToPrototype: { value: encodeBytes32(building) },
  },
})).reduce((acc, curr) => ({ ...acc, ...curr }), {});

/* -------------------------------------------------------------------------- */
/*                                 Prototypes                                 */
/* -------------------------------------------------------------------------- */
const maxRange = { xBounds: 37, yBounds: 25 };
const prototypesConfig: PrototypesConfig<typeof config> = {
  /* ---------------------------------- World --------------------------------- */
  World: {
    tables: {
      P_Asteroid: maxRange,
    },
    levels: buildingIdToPrototypeId,
  },

  Expansion: {
    tables: {},
    levels: {
      0: { Dimensions: { x: 13, y: 11 } },
      1: { Dimensions: { x: 17, y: 13 } },
      2: { Dimensions: { x: 21, y: 15 } },
      3: { Dimensions: { x: 25, y: 17 } },
      4: { Dimensions: { x: 29, y: 19 } },
      5: { Dimensions: { x: 33, y: 13 } },
      6: { Dimensions: { x: maxRange.xBounds, y: maxRange.yBounds } },
    },
  },

  /* -------------------------------- Buildings ------------------------------- 
   NOTE the key of a building prototype must match its EBuilding enum equivalent
   This is because we use the enum to look up the prototype in the P_BuildingTypeToPrototype table
  ----------------------------------------------------------------------------- */

  MainBase: {
    tables: {
      Position: { x: Math.floor(maxRange.xBounds / 2), y: Math.floor(maxRange.yBounds / 2), parent: encodeBytes32(0) },
      P_Blueprint: { value: getBlueprint(3, 2) },
      P_MaxLevel: { value: 8 },
    },
  },

  // Mines
  IronMine: {
    tables: {
      P_Blueprint: { value: getBlueprint(1, 1) },
      P_MaxLevel: { value: 5 },
    },
  },
  CopperMine: {
    tables: {
      P_Blueprint: { value: getBlueprint(1, 1) },
      P_MaxLevel: { value: 5 },
    },
  },
  LithiumMine: {
    tables: {
      P_Blueprint: { value: getBlueprint(1, 1) },
      P_MaxLevel: { value: 5 },
    },
  },
  SulfurMine: {
    tables: {
      P_Blueprint: { value: getBlueprint(1, 1) },
      P_MaxLevel: { value: 5 },
    },
  },

  // Factories
  IronPlateFactory: {
    tables: {
      P_Blueprint: { value: getBlueprint(2, 2) },
      P_MaxLevel: { value: 5 },
    },
  },
  AlloyFactory: {
    tables: {
      P_Blueprint: { value: getBlueprint(2, 2) },
      P_MaxLevel: { value: 3 },
    },
  },
  PVCellFactory: {
    tables: {
      P_Blueprint: { value: getBlueprint(2, 2) },
      P_MaxLevel: { value: 3 },
    },
  },

  // Utilities
  StorageUnit: {
    tables: {
      P_Blueprint: { value: getBlueprint(2, 2) },
      P_MaxLevel: { value: 3 },
    },
  },
  SolarPanel: {
    tables: {
      P_Blueprint: { value: getBlueprint(2, 2) },
      P_MaxLevel: { value: 3 },
    },
  },

  // Units
  Hangar: {
    tables: {
      P_Blueprint: { value: getBlueprint(4, 4) },
      P_MaxLevel: { value: 5 },
    },
  },
  UnitTraining: {
    tables: {
      P_Blueprint: { value: getBlueprint(3, 3) },
      P_MaxLevel: { value: 5 },
    },
  },
  DroneFactory: {
    tables: {
      P_Blueprint: { value: getBlueprint(3, 3) },
      P_MaxLevel: { value: 4 },
    },
  },
  Starmapper: {
    tables: {
      P_Blueprint: { value: getBlueprint(3, 2) },
      P_MaxLevel: { value: 3 },
    },
  },
};

export default {
  ...config,
  prototypes: prototypesConfig,
};
