import {
  BuildingType,
  Level,
  MaxMoves,
  MaxUtility,
  OccupiedUtilityResource,
  P_ScoreMultiplier,
  P_TrainingTime,
} from "src/network/components/chainComponents";
import { Cheatcode, Cheatcodes } from "src/components/dev/Cheatcodes";
import { Network } from "src/network/layer";
import { BlockIdToKey, BlockType } from "./constants";
import {
  Account,
  ActiveAsteroid,
  Battle,
  SelectedBuilding,
} from "src/network/components/clientComponents";
import { hashEntities, hashKeyEntity } from "./encode";
import { train } from "./web3";
import { world } from "src/network/world";

export const setupCheatcodes = (mud: Network): Cheatcodes => {
  const setMaxHousing: Cheatcode = {
    params: [{ name: "maxHousing", type: "number" }],
    function: async (maxHousing: number) => {
      const player = Account.get()?.value;
      if (!player) throw new Error("No player found");
      const playerResource = hashKeyEntity(
        BlockType.HousingUtilityResource,
        player
      );
      await mud.dev.setEntityContractComponentValue(
        playerResource,
        MaxUtility,
        {
          value: maxHousing,
        }
      );
    },
  };

  return {
    setMaxHousing,
    setMultiplier: {
      params: [{ name: "multiplier", type: "number" }],
      function: async (multiplier: number) => {
        const building = SelectedBuilding.get()?.value;
        const type = BuildingType.get(building)?.value;
        const level = Level.get(building)?.value;
        if (!type || !level) throw new Error("No player found");

        await mud.dev.setEntityContractComponentValue(
          hashKeyEntity(type, level),
          P_ScoreMultiplier,
          {
            value: multiplier,
          }
        );
      },
    },
    setHousing: {
      params: [{ name: "housing", type: "number" }],
      function: (housing: number) => {
        const player = Account.get()?.value;
        if (!player) throw new Error("No player found");
        const playerResource = hashKeyEntity(
          BlockType.HousingUtilityResource,
          player
        );
        mud.dev.setEntityContractComponentValue(
          playerResource,
          OccupiedUtilityResource,
          {
            value: housing,
          }
        );
      },
    },
    trainDebugUnits: {
      params: [
        { name: "trainingTime", type: "number" },
        { name: "count", type: "number" },
      ],
      function: async (trainingTime: number, count: number) => {
        const building = SelectedBuilding.get()?.value;
        if (!building) throw new Error("No building selected");
        await mud.dev.setEntityContractComponentValue(
          hashKeyEntity(BlockType.DebugUnit, 1),
          P_TrainingTime,
          {
            value: trainingTime,
          }
        );

        await setMaxHousing.function(count);
        console.log(
          `Training ${count} debug units on building ${BlockIdToKey[building]}`
        );
        await train(building, BlockType.DebugUnit, count, mud);
        return `Training ${count} debug units on building ${BlockIdToKey[building]}`;
      },
    },
    increaseMaxMoves: {
      params: [{ name: "value", type: "number" }],
      function: async (value: number) => {
        const player = Account.get()?.value;
        if (!player) throw new Error("No player found");
        await mud.dev.setEntityContractComponentValue(player, MaxMoves, {
          value,
        });
      },
    },
    spoofBattles: {
      params: [{ name: "value", type: "number" }],
      function: async (value: number) => {
        const account = Account.get()?.value!;
        const spaceRock = ActiveAsteroid.get()?.value!;
        for (let i = 0; i < value; i++) {
          const entityId = hashEntities(BlockType.DebugUnit, account, i);
          const emptyUnits = new Array(Math.floor(Math.random() * 4)).fill(
            0
          ) as number[];
          const battle = {
            attacker: account,
            defender: hashEntities(BlockType.DebugUnit3, account, i),
            attackerUnitCounts: emptyUnits.map(() => Math.random() * 50),
            defenderUnitCounts: emptyUnits.map(() => Math.random() * 50),
            attackerUnitTypes: emptyUnits.map(() => BlockType.DebugUnit),
            defenderUnitTypes: emptyUnits.map(() => BlockType.DebugUnit),
            attackerUnitLevels: emptyUnits.map(() => Math.random() * 50),
            defenderUnitLevels: emptyUnits.map(() => Math.random() * 50),
            winner: account,
            defenderUnitsLeft: emptyUnits.map(() => Math.random() * 50),
            attackerUnitsLeft: emptyUnits,
            spaceRock,
          };
          world.registerEntity({ id: entityId });
          Battle.set(battle, entityId);
        }
      },
    },
  };
};
