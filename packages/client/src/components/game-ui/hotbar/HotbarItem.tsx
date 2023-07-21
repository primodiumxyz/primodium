import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { useComponentValue } from "@latticexyz/react";
import { EntityID, getComponentValue } from "@latticexyz/recs";
import { SingletonID } from "@latticexyz/network";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useMud } from "src/context/MudContext";
import { Key } from "src/engine/lib/core/createInput";
import { useAccount } from "src/hooks/useAccount";
import { singletonIndex, contractComponents, world } from "src/network/world";
import { calcDims, convertToCoords } from "src/util/building";
import { getBlockTypeName } from "src/util/common";
import { Action, BackgroundImage, KeyImages } from "src/util/constants";
import { hashKeyEntityAndTrim } from "src/util/encode";

const HotbarItem: React.FC<{
  blockType: EntityID;
  action: Action;
  index: number;
}> = ({ blockType, action, index }) => {
  const network = useMud();
  const { RequiredResearchComponent, Research } = contractComponents;
  const { address } = useAccount();
  const selectedBuilding = primodium.hooks.useSelectedBuilding();
  const [isResearched, setIsResearched] = useState(false);

  const keybinds = primodium.hooks.useKeybinds();
  let dimensions: { width: number; height: number } | undefined;
  const buildingTypeEntity = world.entityToIndex.get(blockType);

  const requiredResearch = useComponentValue(
    RequiredResearchComponent,
    buildingTypeEntity
  )?.value as unknown as EntityID | undefined;

  const entity = hashKeyEntityAndTrim(
    requiredResearch ?? SingletonID,
    address.toString().toLowerCase()
  ) as EntityID;

  const researched = getComponentValue(
    Research,
    world.entityToIndex.get(entity) ?? singletonIndex
  )?.value;

  useEffect(() => {
    if (!requiredResearch) {
      setIsResearched(true);
      return;
    }

    setIsResearched(researched ?? false);
  }, [researched, requiredResearch]);

  const keybindAction = useMemo(() => {
    if (!keybinds) return;

    if (!KeybindActions[`Hotbar${index}` as keyof typeof KeybindActions])
      return;

    return KeybindActions[`Hotbar${index}` as keyof typeof KeybindActions];
  }, [keybinds]);

  const keyImage = useMemo(() => {
    if (!keybinds || !keybindAction) return;

    return KeyImages.get(
      keybinds[keybindAction]?.entries().next().value[0] as Key
    );
  }, [keybinds, keybindAction]);

  useEffect(() => {
    if (!keybinds || !isResearched || !keybindAction) return;

    const listener = primodium.input.addListener(keybindAction, () => {
      if (selectedBuilding === blockType) {
        primodium.components.selectedBuilding(network).remove();
        primodium.components.selectedAction().remove();
        return;
      }

      primodium.components.selectedBuilding(network).set(blockType);
      primodium.components.selectedAction().set(action);
    });

    return () => {
      listener.dispose();
    };
  }, [
    keybinds,
    selectedBuilding,
    action,
    blockType,
    isResearched,
    keybindAction,
  ]);

  if (buildingTypeEntity) {
    const blueprint = getComponentValue(
      network.components.RawBlueprint,
      buildingTypeEntity
    )?.value;

    dimensions = blueprint
      ? calcDims(buildingTypeEntity, convertToCoords(blueprint))
      : undefined;
  }

  const handleSelectBuilding = () => {
    if (selectedBuilding === blockType) {
      primodium.components.selectedBuilding(network).remove();
      primodium.components.selectedAction().remove();
      return;
    }

    primodium.components.selectedBuilding(network).set(blockType);
    primodium.components.selectedAction().set(action);
  };

  if (!isResearched) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.5 },
      }}
    >
      <div
        className={`relative flex flex-col text-sm items-center cursor-pointer crt w-16 ${
          selectedBuilding === blockType ? "scale-110" : ""
        }`}
      >
        <img
          src={BackgroundImage.get(blockType)}
          onClick={handleSelectBuilding}
          className={`w-16 h-16 pixel-images border border-cyan-700
          ${
            selectedBuilding === blockType
              ? " ring-4 ring-amber-400 transistion-all duration-100"
              : ""
          }
          `}
        />
        {selectedBuilding === blockType && (
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              opacity: { duration: 3 },
            }}
            className="absolute flex items-center -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 px-1"
          >
            {getBlockTypeName(selectedBuilding)}
          </motion.p>
        )}
        {keyImage && (
          <img
            src={keyImage}
            className={`absolute -top-2 -left-2 w-8 h-8 pixel-images ${
              selectedBuilding === blockType ? "opacity-30" : ""
            }`}
          />
        )}
        {dimensions && (
          <div className="absolute bottom-0 right-0 text-xs bg-black bg-opacity-50">
            {dimensions.width}x{dimensions.height}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HotbarItem;
