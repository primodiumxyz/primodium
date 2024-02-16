import { bigIntMax, bigIntMin } from "@latticexyz/common/utils";
import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { EResource } from "contracts/config/enums";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "src/components/core/Button";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { useFullResourceCounts } from "src/hooks/useFullResourceCount";
import { useUnitCounts } from "src/hooks/useUnitCount";
import { components } from "src/network/components";
import { createFleet } from "src/network/setup/contractCalls/createFleet";
import { transferFleet } from "src/network/setup/contractCalls/fleetTransfer";
import { ResourceEntityLookup, UnitStorages } from "src/util/constants";
import { formatResourceCount, parseResourceCount } from "src/util/number";
import { ResourceIcon } from "../../modals/fleets/ResourceIcon";
import { useFleetNav } from "../fleets/Fleets";
import { TransferConfirmAsteroid, TransferConfirmFleet } from "./TransferConfirm";
import { TransferFrom } from "./TransferFrom";
import { TransferSelect } from "./TransferSelect";
import { TransferSwap } from "./TransferSwap";
import { TransferTo } from "./TransferTo";

type To = Entity | "newFleet";
export const Transfer: React.FC<{ from?: Entity | undefined; to?: To | undefined }> = ({
  from: initialFrom,
  to: initialTo,
}) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState<Entity | undefined | "newFleet">(initialTo);

  const [deltas, setDeltas] = useState<Map<Entity, bigint>>(new Map());

  const selectedRock = components.ActiveRock.use()?.value;
  if (!selectedRock) throw new Error("No selected rock");
  const Nav = useFleetNav();
  const [dragging, setDragging] = useState<{ entity: Entity; count: bigint } | null>(null);
  const [dragLocation, setDragLocation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveringArea, setHoveringArea] = useState<"from" | "to" | null>(null);

  useEffect(() => {
    if (to === "newFleet" && !from) setTo(undefined);
  }, [from, to]);

  // Resources
  const transportables = components.P_Transportables.use()?.value ?? [];

  const fromInitialResourceCounts = useFullResourceCounts(from);
  const fromResourceCounts = transportables.reduce((acc, transportable) => {
    const entity = ResourceEntityLookup[transportable as EResource];
    const resourceCount = fromInitialResourceCounts.get(entity)?.resourceCount ?? 0n;
    if (resourceCount == 0n) return acc;
    const delta = deltas.get(entity) ?? 0n;
    const draggingCount = dragging?.entity === entity ? dragging.count : 0n;
    const total = resourceCount - delta - draggingCount;
    acc.set(entity, total);
    return acc;
  }, new Map<Entity, bigint>());

  const toEntity = to === "newFleet" ? singletonEntity : to;
  const toIsFleet = to === "newFleet" || components.IsFleet.has(toEntity);

  const toInitialResourceCounts = useFullResourceCounts(toEntity);
  const toResourceCounts = transportables.reduce((acc, transportable) => {
    const entity = ResourceEntityLookup[transportable as EResource];
    const resourceCount = toInitialResourceCounts.get(entity)?.resourceCount;
    const delta = deltas.get(entity) ?? 0n;
    const total = (resourceCount ?? 0n) + delta;
    if (total == 0n) return acc;
    acc.set(entity, total);
    return acc;
  }, new Map<Entity, bigint>());

  // Units
  const fromInitialUnitCounts = useUnitCounts(from);
  const toInitialUnitCounts = useUnitCounts(toEntity);

  const fromUnitCounts = useMemo(() => {
    return [...UnitStorages].reduce((acc, unit) => {
      const count = fromInitialUnitCounts.get(unit) ?? 0n;
      if (count == 0n) return acc;
      const delta = deltas.get(unit) ?? 0n;
      const draggingCount = dragging?.entity === unit ? dragging.count : 0n;
      const total = count - delta - draggingCount;
      acc.set(unit, total);
      return acc;
    }, new Map<Entity, bigint>());
  }, [dragging, fromInitialUnitCounts, deltas]);

  const toUnitCounts = useMemo(() => {
    return [...UnitStorages].reduce((acc, unit) => {
      const count = toInitialUnitCounts.get(unit) ?? 0n;
      const delta = deltas.get(unit) ?? 0n;
      if (count + delta > 0n) acc.set(unit, count + delta);
      return acc;
    }, new Map<Entity, bigint>());
  }, [deltas, toInitialUnitCounts]);

  const units = components.Hangar.use(from);
  const allResources = useFullResourceCounts();

  const initDragging = (e: React.MouseEvent, entity: Entity, count: bigint) => {
    document.body.style.userSelect = "none";
    setDragging({ entity, count });
    setDragLocation({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", (e) => setDragLocation({ x: e.clientX, y: e.clientY }));
  };

  const stopDragging = useCallback(() => {
    document.body.style.userSelect = "";
    setDragging(null);
    if (hoveringArea === "to" && dragging) {
      if (UnitStorages.has(dragging.entity)) {
        const newMap = new Map(deltas);
        newMap.set(dragging.entity, (deltas.get(dragging.entity) ?? 0n) + dragging.count);
        setDeltas(newMap);
      } else {
        const newMap = new Map(deltas);
        newMap.set(dragging.entity, (deltas.get(dragging.entity) ?? 0n) + dragging.count);
        setDeltas(newMap);
      }
    }
    setHoveringArea(null);
    window.removeEventListener("mousemove", (e) => setDragLocation({ x: e.clientX, y: e.clientY }));
  }, [dragging, deltas, hoveringArea]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!dragging) return;
      if (e.key === "e" || e.key === "E") {
        const delta = parseResourceCount(dragging.entity, e.key === "E" ? "10" : "1");
        const maxCount = UnitStorages.has(dragging.entity)
          ? units
            ? units.counts[units.units.indexOf(dragging.entity)]
            : 0n
          : allResources.get(dragging.entity)?.resourceCount ?? 0n;
        setDragging({
          ...dragging,
          count: bigIntMin(maxCount, dragging.count + delta),
        });
      } else if (e.key === "q" || e.key == "Q") {
        const delta = parseResourceCount(dragging.entity, e.key === "Q" ? "10" : "1");
        setDragging({ ...dragging, count: bigIntMax(0n, dragging.count - delta) });
      }
    },
    [allResources, dragging, units]
  );

  const mud = useMud();
  const handleSubmit = () => {
    if (!from || !to) return;
    if (to === "newFleet") createFleet(mud, from, deltas, deltas);
    else transferFleet(mud, from, to, { resources: deltas, units: deltas });
    setDeltas(new Map());
    setDeltas(new Map());
  };

  useEffect(() => {
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, stopDragging]);

  return (
    <TransactionQueueMask queueItemId={"TRANSFER" as Entity} className="w-full h-full flex flex-col gap-2 p-2">
      {dragging && <Dragging {...dragging} location={dragLocation} />}
      <div className="grid grid-cols-[1fr_3rem_1fr]  w-full h-full">
        {/*Left Side */}
        {from ? (
          <TransferFrom
            entity={from}
            dragging={!!dragging}
            unitCounts={fromUnitCounts}
            resourceCounts={fromResourceCounts}
            deltas={deltas}
            setDragging={initDragging}
            remove={() => setFrom(undefined)}
          />
        ) : (
          <TransferSelect
            rockEntity={selectedRock}
            activeEntity={to}
            setEntity={(entity) => entity !== "newFleet" && setFrom(entity)}
            hideNotOwned
          />
        )}

        {/*Middle*/}
        <div className="grid grid-rows-3 h-full w-full place-items-center">
          <div className="grid place-items-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-secondary rotate-90"></div>
          </div>
          <TransferSwap
            from={from}
            to={to}
            onClick={(newFrom, newTo) => {
              setDeltas(new Map());
              setDeltas(new Map());
              setFrom(newFrom);
              setTo(newTo);
            }}
          />
          <div className="grid place-items-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-secondary rotate-90"></div>
          </div>
        </div>

        {/* Right Side */}
        {to ? (
          <TransferTo
            unitCounts={toUnitCounts}
            entity={to}
            hovering={hoveringArea === "to"}
            deltas={deltas}
            resourceCounts={toResourceCounts}
            onMouseOver={() => dragging && setHoveringArea("to")}
            onMouseLeave={() => setHoveringArea(null)}
            clearUnit={(entity) => {
              const newMap = new Map(deltas);
              newMap.delete(entity);
              setDeltas(newMap);
            }}
            clearResource={(entity) => {
              const newMap = new Map(deltas);
              newMap.delete(entity);
              setDeltas(newMap);
            }}
            clearAll={() => {
              setDeltas(new Map());
            }}
            remove={() => setTo(undefined)}
          />
        ) : (
          <TransferSelect rockEntity={selectedRock} activeEntity={from} setEntity={setTo} showNewFleet />
        )}
      </div>
      <div className="flex gap-4 w-full justify-center items-center">
        <Nav.BackButton className="absolute left-0 bottom-0">Back</Nav.BackButton>
        {(!from || !to) && (
          <Button className="btn-primary w-48" disabled onClick={handleSubmit}>
            {"Select"}
          </Button>
        )}
        {!!from &&
          !!to &&
          (toIsFleet ? (
            <TransferConfirmFleet
              entity={to}
              toUnits={toUnitCounts}
              toResources={toResourceCounts}
              handleSubmit={handleSubmit}
            />
          ) : (
            <TransferConfirmAsteroid
              entity={to}
              toUnits={toUnitCounts}
              toResources={toResourceCounts}
              handleSubmit={handleSubmit}
            />
          ))}
      </div>
    </TransactionQueueMask>
  );
};

const Dragging = ({
  entity,
  count,
  location,
}: {
  entity: Entity;
  count: bigint;
  location: { x: number; y: number };
}) => {
  return ReactDOM.createPortal(
    <div className={`font-mono fixed pointer-events-none`} style={{ left: location.x, top: location.y, zIndex: 1002 }}>
      <ResourceIcon resource={entity} amount={formatResourceCount(entity, count, { fractionDigits: 0 })} />
    </div>,
    document.body
  );
};
