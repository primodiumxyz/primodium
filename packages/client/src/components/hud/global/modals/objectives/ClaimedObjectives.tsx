import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Hex } from "viem";

import { ObjectiveEntityLookup } from "@primodiumxyz/core";
import { useCore } from "@primodiumxyz/core/react";
import { defaultEntity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";

import { Objective } from "./Objective";

export const ClaimedObjectives: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const core = useCore();
  const { tables } = core;
  const itemsPerPage = 6;

  const player = tables.Account.use()?.value ?? tables.Account.get()?.value ?? defaultEntity;
  const asteroidEntity = tables.ActiveRock.use()?.value ?? tables.ActiveRock.get()?.value;

  const filteredObjectiveEntities = Object.values(ObjectiveEntityLookup).filter((objective) => {
    const claimed =
      tables.CompletedObjective.getWithKeys({ entity: player as Hex, objective: objective as Hex })?.value ?? false;

    return claimed;
  });

  const paginatedObjectiveEntities = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredObjectiveEntities.slice(start, end);
  }, [filteredObjectiveEntities, currentPage]);

  const startIdx = currentPage * itemsPerPage + 1;
  const endIdx = Math.min(startIdx + itemsPerPage - 1, filteredObjectiveEntities.length);

  if (!asteroidEntity || player === defaultEntity) return <></>;
  if (filteredObjectiveEntities.length === 0)
    return (
      <SecondaryCard className="w-full h-full items-center justify-center text-xs">
        <p className="opacity-50 font-bold">NO COMPLETED OBJECTIVES</p>
      </SecondaryCard>
    );

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="grid grid-cols-2 grid-rows-3 gap-2 w-full h-full">
        {paginatedObjectiveEntities.map((objectiveEntity, i) => (
          <Objective key={i} objectiveEntity={objectiveEntity} asteroidEntity={asteroidEntity} claimed />
        ))}
      </div>
      {filteredObjectiveEntities.length > 6 && (
        <div className="flex items-center gap-2">
          <Button
            className="btn-sm btn-primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <FaChevronLeft />
          </Button>
          <Button
            className="btn-sm btn-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * itemsPerPage >= filteredObjectiveEntities.length - 1}
          >
            <FaChevronRight />
          </Button>
          <p className="text-xs font-bold opacity-50 inline">
            {startIdx} - {endIdx} / {filteredObjectiveEntities.length}
          </p>
        </div>
      )}
    </div>
  );
};
