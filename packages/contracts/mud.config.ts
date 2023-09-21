import { mudConfig } from "@latticexyz/world/register";
import { MUDEnums } from "./config/enums";
import { prototypeConfig } from "./config/prototypeConfig";

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
export type Config = typeof config;
export const config = mudConfig({
  excludeSystems: [...dev],
  overrideSystems: {
    S_SpendResourcesSystem: {
      openAccess: false,
      accessList: ["BuildSystem", "UpgradeBuildingSystem"],
      name: "S_SpendResourcesSystem",
    },
    S_ReduceProductionRateSystem: {
      openAccess: false,
      accessList: ["BuildSystem", "UpgradeBuildingSystem", "DestroySystem"],
      name: "S_ReduceProductionRateSystem",
    },
  },

  enums: MUDEnums,
  tables: {
    /* ----------------------------------- Dev ---------------------------------- */
    Counter: {
      keySchema: {},
      schema: "uint256",
    },

    /* --------------------------------- Common --------------------------------- */

    P_GameConfig: {
      keySchema: {},
      schema: {
        unitProductionRate: "uint256",
        maxMotherlodesPerAsteroid: "uint256",
        motherlodeChanceInv: "uint256",
        motherlodeDistance: "uint256",
        moveSpeed: "uint256",
      },
    },

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
      schema: "uint256",
    },

    Spawned: {
      keySchema: { entity: "bytes32" },
      schema: "bool",
    },

    /*
     This table maps building types to their prototypes. 
     For example:
        The key is the EBuilding enum value for the building type (e.g. EBuilding.MainBase). 
        The value is the prototype name (e.g. "MainBase")
        It is autogenerated in the build step.
    */
    P_EnumToPrototype: {
      keySchema: { key: "bytes32", id: "uint8" },
      schema: "bytes32",
    },

    /* --------------------------------- Player --------------------------------- */
    Home: {
      keySchema: { entity: "bytes32" },
      schema: {
        asteroid: "bytes32",
        mainBase: "bytes32",
      },
    },

    MaxMoves: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
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
      schema: "uint256",
    },

    RockType: {
      keySchema: { entity: "bytes32" },
      schema: "ERock",
    },

    // note: dimensions will always be positive, but are int32s so they work with coords
    Dimensions: {
      keySchema: { key: "bytes32", level: "uint256" },
      schema: {
        x: "int32",
        y: "int32",
      },
    },

    P_Terrain: {
      keySchema: { x: "int32", y: "int32" },
      schema: "EResource",
    },

    /* -------------------------------- Resources ------------------------------- */

    P_IsUtility: {
      keySchema: { id: "EResource" },
      schema: "bool",
    },

    // tracks the max resource a player can store
    MaxResourceCount: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: "uint256",
    },

    LastClaimedAt: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
    },

    // ResourceSet tables: used to track which resources a player has

    ResourceCount: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: "uint256",
    },

    // Used in the building utilities set
    SetItemUtilities: {
      keySchema: { entity: "bytes32", utility: "EResource" },
      schema: {
        index: "uint256",
        quantity: "uint256",
      },
    },
    SetUtilities: {
      keySchema: { entity: "bytes32" },
      schema: "uint8[]",
    },

    /* --------------------------- Build Requirements --------------------------- */
    P_RequiredTile: {
      keySchema: { prototype: "bytes32" },
      schema: "EResource",
    },
    P_RequiredBaseLevel: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: "uint256",
    },

    P_RequiredResources: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    P_RequiredDependencies: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    P_RequiredUpgradeResources: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: {
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },
    /* -------------------------------- Buildings ------------------------------- */

    P_Blueprint: {
      keySchema: { prototype: "bytes32" },
      schema: "int32[]",
    },

    P_MaxLevel: {
      keySchema: { prototype: "bytes32" },
      schema: "uint256",
    },

    P_Production: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resource: "EResource",
        amount: "uint256",
      },
    },

    // tracks if a building (prototype) can produce a unit (id)
    P_UnitProduction: {
      keySchema: { prototype: "bytes32", id: "bytes32" },
      schema: "bool",
    },

    P_ProducesUnits: {
      keySchema: { prototype: "bytes32" },
      schema: "bool",
    },

    P_UnitProdMultiplier: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: "uint256",
    },

    SetItemUnitFactories: {
      keySchema: { entity: "bytes32", building: "bytes32" },
      schema: {
        stored: "bool",
        index: "uint256",
      },
    },

    SetUnitFactories: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },

    P_ByLevelMaxResourceUpgrades: {
      keySchema: { prototype: "bytes32", resource: "EResource", level: "uint256" },
      schema: "uint256",
    },

    P_ListMaxResourceUpgrades: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      schema: "uint8[]",
    },

    BuildingType: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32",
    },

    Children: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },

    ProductionRate: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: "uint256",
    },

    /* ------------------------------- Motherlode ------------------------------- */

    P_MotherlodeResource: {
      keySchema: { motherlodeType: "EMotherlodeType", level: "ESize" },
      schema: {
        resource: "EResource",
        amount: "uint256",
      },
    },

    Motherlode: {
      keySchema: { entity: "bytes32" },
      schema: {
        ownedBy: "bytes32",
        size: "ESize",
        motherlodeType: "EMotherlodeType",
        quantity: "uint32",
        cooldownSeconds: "uint256",
        mineableAt: "uint256",
      },
    },

    // Used in the building utilities set
    SetItemMotherlodes: {
      keySchema: { motherlode: "bytes32", item: "bytes32" },
      schema: {
        stored: "bool",
        index: "uint256",
      },
    },
    SetMotherlodes: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },

    /* ----------------------------- Unit Production ---------------------------- */
    P_Unit: {
      keySchema: { entity: "bytes32", level: "uint256" },
      schema: {
        attack: "uint256",
        defense: "uint256",
        speed: "uint256",
        cargo: "uint256",
        mining: "uint256",
        trainingTime: "uint256",
      },
    },
    QueueUnits: {
      keySchema: { entity: "bytes32" },
      schema: {
        front: "uint256",
        back: "uint256",
        queue: "bytes32[]",
      },
    },

    QueueItemUnits: {
      keySchema: { entity: "bytes32", index: "uint256" },
      schema: {
        unitId: "bytes32",
        quantity: "uint256",
      },
    },
    UnitLevel: {
      keySchema: { entity: "bytes32", unit: "bytes32" },
      schema: "uint256",
    },

    UnitCount: {
      keySchema: { player: "bytes32", rock: "bytes32", unit: "bytes32" },
      schema: "uint256",
    },
    /* ----------------------- Sending and Battling Units ----------------------- */

    // Tracks player arrivals

    ArrivalCount: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
    },
    // Tracks player asteroid arrivals
    SetArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32" },
      schema: { itemKeys: "bytes32[]" },
    },

    SetItemStoredArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32", arrivalEntity: "bytes32" },
      schema: {
        stored: "bool",
        index: "uint256",
      },
    },

    // We need to split this up because it is too big to compile lol
    // But this is abstracted away in ArrivalSet.sol
    SetItemArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32", arrivalEntity: "bytes32" },
      schema: "bytes",
    },
  },
});

export default {
  ...config,
  prototypeConfig,
};
