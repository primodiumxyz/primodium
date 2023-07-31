import { EntityIndex } from "@latticexyz/recs";
import { useMud } from "src/hooks";
import useResourceCount from "src/hooks/useResourceCount";
import { BlockType } from "src/util/constants";
import { PassiveResourceLabel } from "./PassiveResourceLabel";

export const AllPassiveResourceLabels = ({
  entityIndex,
}: {
  entityIndex?: EntityIndex;
}) => {
  const { components } = useMud();
  const maxStorage = useResourceCount(
    components.MaxStorage,
    BlockType.ElectricityPassiveResource,
    entityIndex
  );
  if (!maxStorage)
    return (
      <div className="flex justify-center items-center text-lg">
        No Utilities
      </div>
    );
  return (
    <>
      <PassiveResourceLabel
        name={"Electricity"}
        entityIndex={entityIndex}
        resourceId={BlockType.ElectricityPassiveResource}
      />
    </>
  );
};
