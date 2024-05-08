import { useClaimPrimodium } from "@/hooks/primodium/useClaimPrimodium";
import { useGame } from "@/hooks/useGame";
import { Mode } from "@/util/constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Entity } from "@latticexyz/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { EResource } from "contracts/config/enums";
import { useMemo, useRef } from "react";
import { Marker } from "src/components/core/Marker";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { DepthLayers } from "src/game/lib/constants/common";
import { useMud } from "src/hooks";
import { useOrbitingFleets } from "src/hooks/useOrbitingFleets";
import { useUnitCounts } from "src/hooks/useUnitCount";
import { components } from "src/network/components";
import { claimPrimodium } from "src/network/setup/contractCalls/claimPrimodium";
import { getAsteroidImage } from "src/util/asteroid";
import { getCanAttackSomeone } from "src/util/unit";
import { Hex } from "viem";
import { Button } from "../../../core/Button";
import { IconLabel } from "../../../core/IconLabel";
import { Modal } from "../../../core/Modal";
import { Fleets } from "../../widgets/fleets/Fleets";
import { _ShardAsteroidTarget } from "./ShardAsteroidTarget";

export const _AsteroidTarget: React.FC<{ selectedAsteroid: Entity }> = ({ selectedAsteroid }) => {
  const mud = useMud();
  const {
    playerAccount: { entity: playerEntity },
  } = mud;
  const game = useGame();
  const {
    config,
    hooks: { useCamera },
  } = useRef(game.STARMAP).current;

  const ownedBy = components.OwnedBy.use(selectedAsteroid)?.value;
  const mapOpen = components.SelectedMode.use()?.value !== Mode.Asteroid;
  const position = components.Position.use(selectedAsteroid);
  const imageUri = getAsteroidImage(game, selectedAsteroid);

  const { zoom } = useCamera();
  const ownedByPlayer = ownedBy === playerEntity;
  const canAddFleets =
    ownedByPlayer &&
    0n <
      (components.ResourceCount.getWithKeys({ entity: selectedAsteroid as Hex, resource: EResource.U_MaxFleets })
        ?.value ?? 0n);

  const canTransfer = useOrbitingFleets(selectedAsteroid).length > 0 && ownedByPlayer;
  const noUnits = [...useUnitCounts(selectedAsteroid).entries()].every(([, count]) => count === 0n);

  const claimConquerTime = useClaimPrimodium(selectedAsteroid);
  const selectingDestination = !!components.Attack.use()?.originFleet;

  const hideAttack = useMemo(
    () => !ownedByPlayer || selectingDestination || noUnits || !getCanAttackSomeone(selectedAsteroid),
    [ownedByPlayer, selectingDestination, noUnits, selectedAsteroid]
  );

  const [coord, defaultZoom, minZoom] = useMemo(() => {
    const {
      tilemap: { tileHeight, tileWidth },
      camera: { defaultZoom, minZoom },
    } = config;

    const pixelCoord = tileCoordToPixelCoord(position ?? { x: 0, y: 0 }, tileWidth, tileHeight);

    return [{ x: pixelCoord.x, y: -pixelCoord.y }, defaultZoom, minZoom];
  }, [position, config]);

  if (!mapOpen) return <></>;

  return (
    <Marker
      scene={"STARMAP"}
      coord={coord}
      id={`asteroid-target`}
      offScreenIconUri={InterfaceIcons.Attack}
      depth={DepthLayers.Path - 5}
    >
      <div
        className="w-14 h-14 border-2 border-error flex items-center justify-center pointer-events-auto"
        style={{
          background: `rgba(0,0,0, ${Math.max(0, (defaultZoom - zoom) / (defaultZoom - minZoom))}`,
        }}
      >
        <div className="absolute top-0 right-0 translate-x-full w-24">
          <Button
            className="btn-ghost btn-xs text-xs text-accent bg-slate-900 border border-l-0 border-secondary/50"
            onClick={async () => {
              components.Send.reset();
              components.ActiveRock.set({ value: selectedAsteroid });
              ownedBy === playerEntity
                ? components.SelectedMode.set({ value: Mode.Asteroid })
                : components.SelectedMode.set({ value: Mode.Spectate });
            }}
          >
            {!ownedByPlayer && <IconLabel imageUri={InterfaceIcons.Spectate} className={``} text="VIEW" />}
            {ownedByPlayer && <IconLabel imageUri={InterfaceIcons.Build} className={``} text="BUILD" />}
          </Button>
        </div>
        {ownedByPlayer && !selectingDestination && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Button
              disabled={hideAttack}
              onClick={() => components.Attack.setOrigin(selectedAsteroid)}
              className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
            >
              <IconLabel imageUri={InterfaceIcons.Crosshairs} text="Attack" />
            </Button>
          </div>
        )}
        {ownedByPlayer && selectingDestination && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Button
              onClick={() => components.Attack.reset()}
              className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
            >
              <IconLabel imageUri={InterfaceIcons.Return} text="CANCEL" />
            </Button>
          </div>
        )}
        {ownedByPlayer && (
          <div className="absolute top-0 left-0 -translate-x-full">
            <Modal>
              <Modal.Button
                onClick={() => components.ActiveRock.set({ value: selectedAsteroid })}
                disabled={selectingDestination || !canTransfer}
                className="btn-ghost btn-xs text-xs text-accent bg-neutral border border-r-0 pl-2 border-secondary/50 w-28 transition-[width] duration-200"
              >
                <IconLabel imageUri={InterfaceIcons.Trade} text={"Transfer"} />
              </Modal.Button>
              <Modal.Content className="w-3/4 h-[800px]">
                <Fleets initialState="transfer" from={selectedAsteroid} />
              </Modal.Content>
            </Modal>
          </div>
        )}
        {ownedByPlayer && claimConquerTime?.canConquer && (
          <TransactionQueueMask
            queueItemId={"Primodium " as Entity}
            className="absolute bottom-0 left-0 -translate-x-full w-28"
          >
            <Button
              onClick={() => claimPrimodium(mud, selectedAsteroid)}
              className="victory-bg btn-xs w-full text-xs text-black border border-r-0 border-secondary/50"
            >
              CLAIM
            </Button>
          </TransactionQueueMask>
        )}
        {ownedByPlayer && !claimConquerTime?.canConquer && (
          <div className="absolute bottom-0 left-0 -translate-x-full w-28">
            <Modal title="Create Fleet">
              <Modal.Button
                disabled={!canAddFleets}
                className="btn-ghost btn-xs w-full text-xs text-accent bg-slate-900 border border-r-0 border-secondary/50"
              >
                <IconLabel imageUri={InterfaceIcons.Add} text="ADD FLEET" />
              </Modal.Button>
              <Modal.Content className="w-3/4 h-[800px]">
                <Fleets initialState="transfer" from={selectedAsteroid} to={"newFleet"} />
              </Modal.Content>
            </Modal>
          </div>
        )}
        <img
          src={imageUri}
          className="scale-75"
          style={{ opacity: `${Math.max(0, ((defaultZoom - zoom) / (defaultZoom - minZoom)) * 100)}%` }}
        />
      </div>
    </Marker>
  );
};

export const AsteroidTarget = () => {
  const selectedAsteroid = components.SelectedRock.use()?.value;
  if (!selectedAsteroid) return <></>;
  if (components.ShardAsteroid.has(selectedAsteroid))
    return <_ShardAsteroidTarget selectedAsteroid={selectedAsteroid} />;
  return <_AsteroidTarget selectedAsteroid={selectedAsteroid} />;
};
