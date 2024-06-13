import { Button } from "@/components/core/Button";
import { OwnedAsteroids } from "@/components/hud/starbelt/starmap-navigator/OwnedAsteroids";
import { OwnedColonyShips } from "@/components/hud/starbelt/starmap-navigator/OwnedColonyShips";
import { OwnedFleets } from "@/components/hud/starbelt/starmap-navigator/OwnedFleets";
import { Shards } from "@/components/hud/starbelt/starmap-navigator/Shards";
import { usePersistentStore } from "@/game/stores/PersistentStore";
import { useGame } from "@/hooks/useGame";
import { EntityToUnitImage } from "@/util/image";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { EntityType } from "@primodiumxyz/core";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const StarmapNavigatorPane = () => {
  const [visibleDiv, setVisibleDiv] = useState(0);
  const [arePanesExpanded, setArePanesExpanded] = useState(false);
  const game = useGame();
  const {
    hooks: { useKeybinds },
    input: { addListener },
  } = useRef(game.STARMAP).current;
  const keybinds = useKeybinds();
  const [hideHotkeys] = usePersistentStore(useShallow((state) => [state.hideHotkeys]));

  // Shows a specific div
  const showDiv = (index: number) => {
    setVisibleDiv(index);
    setArePanesExpanded(false);
  };

  // Toggles the expand/collapse state
  const togglePanes = () => {
    setArePanesExpanded(!arePanesExpanded);
  };

  useEffect(() => {
    const cycle = addListener("Cycle", () => {
      setVisibleDiv((prev) => (prev + 1) % 4);
    });

    return () => {
      cycle.dispose();
    };
  }, [addListener]);

  const labels = ["Asteroids", "Fleets", "Colony Ships", "Volatile Shards"];

  const imagePaths = [
    InterfaceIcons.Asteroid,
    InterfaceIcons.Fleet,
    EntityToUnitImage[EntityType.ColonyShip],
    InterfaceIcons.Shard,
  ];

  const Content = ({ index }: { index: number }) => {
    const className = "h-96 w-96";
    if (index === 0) return <OwnedAsteroids className={className} />;
    if (index === 1) return <OwnedFleets className={className} />;
    if (index === 2) return <OwnedColonyShips className={className} />;
    if (index === 3) return <Shards className={className} />;
  };

  return (
    <div className="flex gap-0">
      {/* Menu Buttons (hidden when expanded) */}
      <div>
        {/* Pane */}
        <div className={`grid ${arePanesExpanded ? "grid-cols-2" : "grid-cols-1"}`}>
          {labels.map(
            (label, index) =>
              // Show only the selected div or all when expanded
              (arePanesExpanded || visibleDiv === index) && (
                <div key={index} className={`flex bg-neutral border border-secondary gap-1`}>
                  <Content index={index} />
                  {/* Show title when expanded */}
                  {arePanesExpanded && (
                    <span
                      className={`text-sm pt-2 text-vert px-1 border-l border-secondary/50 ${
                        label === "Production"
                          ? "text-yellow-500"
                          : label === "Military"
                          ? "text-lime-600"
                          : label === "Storage"
                          ? "text-violet-400"
                          : label === "Infrastructure"
                          ? "text-sky-500"
                          : ""
                      }`}
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {label}
                    </span>
                  )}
                </div>
              )
          )}
        </div>

        {/* Toggle Expand/Collapse button ${arePanesExpanded ? 'mr-0' : 'mr-11'} */}
        <div className={`flex justify-end`}>
          <Button onClick={togglePanes} variant={"ghost"} size={"xs"} className="text-[.7rem] px-2 m-1">
            {arePanesExpanded ? "- Collapse" : "+ Expand"}
          </Button>
        </div>
      </div>
      {!arePanesExpanded && (
        <div className="flex flex-col">
          {labels.map((label, index) => (
            <Button
              key={index}
              onClick={() => showDiv(index)}
              className={`!flex !items-center !bg-neutral/100 !border !border-secondary !py-3 px-4 ${
                index === 3 ? "rounded-bl-lg" : ""
              }`}
              style={{ writingMode: "vertical-rl" }}
            >
              <img src={imagePaths[index]} alt={label} className="w-4 h-4" />
              {/* Show title when active */}
              {visibleDiv === index && (
                <span
                  className={` ${
                    label === "Asteroids"
                      ? "text-yellow-500"
                      : label === "Fleets"
                      ? "text-lime-600"
                      : label === "Colony Ships"
                      ? "text-violet-400"
                      : label === "Volatile Shards"
                      ? "text-rose-400"
                      : ""
                  }`}
                >
                  {label}
                </span>
              )}
            </Button>
          ))}
          {!hideHotkeys && (
            <p className="flex text-xs kbd kbd-xs py-2 w-fit self-end" style={{ writingMode: "vertical-rl" }}>
              {keybinds["Cycle"]?.entries().next().value[0] ?? "?"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
