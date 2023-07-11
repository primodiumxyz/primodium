import { useState } from "react";
import { EntityID, EntityIndex } from "@latticexyz/recs";
import { useComponentValue } from "src/hooks/useComponentValue";
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

import { useMud } from "../../context/MudContext";
import { useAccount } from "../../hooks/useAccount";

import StarterPackButton from "../StarterPackButton";
import AllResourceLabels from "./AllResourceLabels";
import { useGameStore } from "../../store/GameStore";
import { Coord } from "@latticexyz/utils";
import { encodeCoordEntity } from "src/util/encode";
import { BlockType } from "src/util/constants";
function ResourceBox() {
  const [minimized, setMinimize] = useState(false);
  const minimizeBox = () => {
    if (minimized) {
      setMinimize(false);
    } else {
      setMinimize(true);
    }
  };

  // Check if user has claimed starter pack
  const { components, world, singletonIndex } = useMud();
  const { address } = useAccount();

  const claimedStarterPack = useComponentValue(
    components.StarterPackInitialized,
    address
      ? world.entityToIndex.get(address.toString().toLowerCase() as EntityID)
      : singletonIndex
  );

  //TODO: TEMP DISABLED FOR TUTORIAL
  const [transactionLoading] = useGameStore((state) => [
    state.transactionLoading,
  ]);
  const mainBuildingCoord = useComponentValue(
    components.MainBaseInitialized,
    address
      ? world.entityToIndex.get(address.toString().toLowerCase() as EntityID)
      : singletonIndex
  );

  const mainBuildingLevel = useComponentValue(
    components.BuildingLevel,
    world.entityToIndex.get(
      encodeCoordEntity(
        { x: mainBuildingCoord?.x ?? 0, y: mainBuildingCoord?.y ?? 0 },
        BlockType.BuildingKey
      )
    )
  );

  const buildLimit = useComponentValue(
    components.BuildingLimit,
    world.entityToIndex.get(mainBuildingLevel?.value as unknown as EntityID)
  );

  const playerBuildingCount = useComponentValue(
    components.BuildingLimit,
    address
      ? world.entityToIndex.get(address.toString().toLowerCase() as EntityID)
      : singletonIndex
  );
  const buildLimitNumber = parseInt(buildLimit?.value.toString() ?? "0");
  const playerBuildingCountNumber = parseInt(
    playerBuildingCount?.value.toString() ?? "0"
  );
  if (transactionLoading) {
    return (
      <div className="z-[1000] viewport-container fixed top-4 right-4 h-64 w-64 flex flex-col bg-gray-700 text-white shadow-xl font-mono rounded">
        <div className="mt-4 ml-5 flex flex-col h-56">
          <button
            id="minimize-resource-box"
            onClick={minimizeBox}
            className="viewport-container fixed right-9"
          >
            <LinkIcon icon={<FaMinusSquare size="18" />} />
          </button>
          <p className="text-lg font-bold mb-3">
            Inventory {playerBuildingCountNumber} / {buildLimitNumber}
          </p>
          ...
          <div className="h-64 overflow-y-scroll scrollbar">
            {!claimedStarterPack ? <StarterPackButton /> : <></>}
          </div>
        </div>
      </div>
    );
  } else if (!minimized) {
    return (
      <div className="z-[1000] viewport-container fixed top-4 right-4 h-64 w-64 flex flex-col bg-gray-700 text-white shadow-xl font-mono rounded">
        <div className="mt-4 ml-5 flex flex-col h-56">
          <button
            id="minimize-resource-box"
            onClick={minimizeBox}
            className="viewport-container fixed right-9"
          >
            <LinkIcon icon={<FaMinusSquare size="18" />} />
          </button>
          <p className="text-lg font-bold mb-3">
            Inventory {playerBuildingCountNumber} / {buildLimitNumber}
          </p>
          <div className="h-64 overflow-y-scroll scrollbar">
            <AllResourceLabels />
            {!claimedStarterPack ? <StarterPackButton /> : <></>}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="z-[1000] viewport-container fixed top-4 right-4 h-14 w-64 flex flex-col bg-gray-700 text-white shadow-xl font-mono rounded">
        <div className="mt-4 ml-5 flex flex-col h-56">
          <button
            id="minimize-resource-box"
            onClick={minimizeBox}
            className="viewport-container fixed right-9"
          >
            <LinkIcon icon={<FaPlusSquare size="18" />} />
          </button>
          <p className="text-lg font-bold mb-3">
            Inventory {playerBuildingCountNumber} / {buildLimitNumber}
          </p>
        </div>
      </div>
    );
  }
}

const LinkIcon = ({ icon }: { icon: any }) => (
  <div className="link-icon inline-block my-auto align-middle">{icon}</div>
);

export default ResourceBox;
