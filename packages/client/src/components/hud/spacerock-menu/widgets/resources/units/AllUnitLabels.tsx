import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { useCallback, useMemo } from "react";
import { Badge } from "src/components/core/Badge";
import { SecondaryCard } from "src/components/core/Card";
import { IconLabel } from "src/components/core/IconLabel";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { EntityType } from "src/util/constants";
import { formatNumber } from "src/util/number";
import { Hex } from "viem";
import { DefenseLabel } from "../utilities/DefenseLabel";
import { UnitLabel } from "./UnitLabel";

export const AllUnitLabels = () => {
  const playerEntity = useMud().playerAccount.entity;
  const selectedAsteroid = components.SelectedRock.use()?.value as Entity | undefined;
  const owner = components.OwnedBy.use(selectedAsteroid)?.value as Entity | undefined;
  const units = components.Hangar.use(selectedAsteroid ?? singletonEntity);

  const getUnitCount = useCallback(
    (unit: Entity) => {
      if (!units) return 0n;
      const index = units.units.indexOf(unit);
      if (index === -1) return 0n;
      return units.counts[index];
    },
    [units]
  );

  const attack = useMemo(
    () =>
      units?.units.reduce((acc, unit) => {
        const level =
          components.UnitLevel.getWithKeys({ entity: (owner ?? playerEntity) as Hex, unit: unit as Hex })?.value ?? 0n;
        const arrivalAttack =
          (components.P_Unit.getWithKeys({ entity: unit as Hex, level })?.attack ?? 0n) * getUnitCount(unit);
        return acc + arrivalAttack;
      }, 0n),
    [units, owner, playerEntity, getUnitCount]
  );

  if (!selectedAsteroid) return null;
  return (
    <div className="flex flex-col items-center gap-1 m-1">
      <SecondaryCard className="flex flex-row w-fit gap-1 m-1">
        <UnitLabel
          name={"Lightning Craft"}
          count={getUnitCount(EntityType.LightningCraft)}
          resource={EntityType.LightningCraft}
        />
        <UnitLabel
          name={"Minuteman Marine"}
          count={getUnitCount(EntityType.MinutemanMarine)}
          resource={EntityType.MinutemanMarine}
        />
        <UnitLabel
          name={"Trident Marine"}
          count={getUnitCount(EntityType.TridentMarine)}
          resource={EntityType.TridentMarine}
        />
        <UnitLabel
          name={"Anvil Light Drone"}
          count={getUnitCount(EntityType.AnvilDrone)}
          resource={EntityType.AnvilDrone}
        />
        <UnitLabel
          name={"Hammer Drone"}
          count={getUnitCount(EntityType.HammerDrone)}
          resource={EntityType.HammerDrone}
        />
        <UnitLabel
          name={"Stinger Drone"}
          count={getUnitCount(EntityType.StingerDrone)}
          resource={EntityType.StingerDrone}
        />
        <UnitLabel name={"Aegis Drone"} count={getUnitCount(EntityType.AegisDrone)} resource={EntityType.AegisDrone} />
        <UnitLabel name={"Cargo Ship"} count={getUnitCount(EntityType.CargoShip)} resource={EntityType.CargoShip} />
      </SecondaryCard>
      <div className="text-xs opacity-75 font-bold w-full flex justify-around items-center mb-1 gap-2">
        <Badge className="flex items-center gap-1">
          <DefenseLabel />
          {playerEntity === owner && (
            <IconLabel
              imageUri="/img/icons/attackicon.png"
              tooltipText="Attack"
              className="text-sm"
              text={attack ? formatNumber(attack, { short: true, fractionDigits: 2 }) : "-"}
            />
          )}
        </Badge>
      </div>
    </div>
  );
};
