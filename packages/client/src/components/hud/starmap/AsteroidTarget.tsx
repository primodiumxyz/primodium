import { Scenes } from "@game/constants";
import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { EResource } from "contracts/config/enums";
import { useMemo } from "react";
import { Badge } from "src/components/core/Badge";
import { useMud } from "src/hooks";
import { useInGracePeriod } from "src/hooks/useInGracePeriod";
import { usePrimodium } from "src/hooks/usePrimodium";
import { useUnitCounts } from "src/hooks/useUnitCount";
import { components } from "src/network/components";
import { getAsteroidImage } from "src/util/asteroid";
import { getCanAttackSomeone } from "src/util/unit";
import { Hex } from "viem";
import { Button } from "../../core/Button";
import { IconLabel } from "../../core/IconLabel";
import { Modal } from "../../core/Modal";
import { Marker } from "../../shared/Marker";
import { GracePeriod } from "../GracePeriod";
import { Fleets } from "../panes/fleets/Fleets";

export const _AsteroidTarget: React.FC<{ selectedAsteroid: Entity }> = ({ selectedAsteroid }) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const primodium = usePrimodium();
  const {
    hooks: { useCoordToScreenCoord },
    util: { closeMap },
  } = primodium.api(Scenes.Starmap);
  const ownedBy = components.OwnedBy.use(selectedAsteroid)?.value;
  const mapOpen = components.MapOpen.use()?.value ?? false;
  const position = components.Position.use(selectedAsteroid) ?? { x: 0, y: 0 };
  const imageUri = getAsteroidImage(primodium, selectedAsteroid);
  const { screenCoord, isBounded } = useCoordToScreenCoord(position, true);
  const { inGracePeriod } = useInGracePeriod((selectedAsteroid as Entity) ?? singletonEntity);
  const isPirate = components.PirateAsteroid.has(selectedAsteroid);
  const ownedByPlayer = ownedBy === playerEntity;
  const canAddFleets =
    ownedByPlayer &&
    0n <
      (components.ResourceCount.getWithKeys({ entity: selectedAsteroid as Hex, resource: EResource.U_MaxMoves })
        ?.value ?? 0n);
  const noUnits = [...useUnitCounts(selectedAsteroid).entries()].every(([, count]) => count === 0n);

  const selectingDestination = !!components.Attack.use()?.originFleet;

  const hideAttack = useMemo(
    () => !ownedByPlayer || selectingDestination || noUnits || !getCanAttackSomeone(selectedAsteroid),
    [ownedByPlayer, selectingDestination, noUnits, selectedAsteroid]
  );

  if (!mapOpen) return <></>;
  if (isBounded) return <Marker coord={position} imageUri="/img/icons/weaponryicon.png" />;

  return (
    <div
      style={{ left: `calc(${screenCoord.x}px)`, top: `calc(${screenCoord.y}px)` }}
      className={`text-error absolute -translate-y-1/2 -translate-x-1/2`}
    >
      <div className="w-14 h-14 border-2 border-error flex items-center justify-center bg-neutral/75">
        <div className="absolute top-0 right-0 translate-x-full w-24">
          <Button
            className="btn-ghost btn-xs text-xs text-accent bg-slate-900 border border-l-0 border-secondary/50"
            disabled={isPirate}
            onClick={async () => {
              components.Send.reset();
              components.ActiveRock.set({ value: selectedAsteroid });
              await closeMap();
            }}
          >
            {!ownedByPlayer && <IconLabel imageUri="/img/icons/spectateicon.png" className={``} text="VIEW" />}
            {ownedByPlayer && <IconLabel imageUri="/img/icons/minersicon.png" className={``} text="BUILD" />}
          </Button>
        </div>
        {!hideAttack && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Button
              onClick={() => components.Attack.setOrigin(selectedAsteroid)}
              className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
            >
              Attack
            </Button>
          </div>
        )}
        {ownedByPlayer && hideAttack && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Modal title="Add Fleet">
              <Modal.Button
                disabled={!canAddFleets}
                className="btn-ghost btn-xs text-xs text-accent bg-slate-900 border border-l-0 border-secondary/50"
              >
                <IconLabel imageUri="/img/icons/addicon.png" text="ADD FLEET" />
              </Modal.Button>
              <Modal.Content className="w-4/5 h-4/5">
                <Fleets initialState="createFleet" />
              </Modal.Content>
            </Modal>
          </div>
        )}

        {inGracePeriod && (
          <div className="absolute top-0 left-1/2 transform -translate-y-full -translate-x-1/2">
            <Badge className="text-xs text-accent bg-slate-900 p-2 w-24">
              <GracePeriod entity={selectedAsteroid as Entity} />
            </Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 -translate-x-full">
          <Button
            className="btn-ghost btn-xs text-xs text-accent bg-neutral border border-r-0 pl-2 border-secondary/50 w-28 transition-[width] duration-200"
            onClick={() => {
              components.SelectedRock.clear();
              components.Send.reset();
              components.Attack.reset();
            }}
          >
            <IconLabel imageUri="/img/icons/returnicon.png" className={``} text="CLOSE" />
          </Button>
        </div>
        <img src={imageUri} className="scale-75" />
      </div>
    </div>
  );
};

export const AsteroidTarget = () => {
  const selectedAsteroid = components.SelectedRock.use()?.value;
  if (!selectedAsteroid) return <></>;
  return <_AsteroidTarget selectedAsteroid={selectedAsteroid} />;
};
