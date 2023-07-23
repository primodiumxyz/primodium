import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { useEffect } from "react";
import { useGameStore } from "../../store/GameStore";
import { InfoBox } from "./InfoBox";

import { AnimatePresence, motion } from "framer-motion";

import { Camera } from "./Camera";
import { Inventory } from "./Inventory";
import Hotbar from "./hotbar/Hotbar";
import { TileInfo } from "./tile-info/TileInfo";
import NotificationBox from "../NotificationBox";
import { BrandingLabel } from "./BrandingLabel";
import { GameReady } from "src/network/components/clientComponents";

function GameUI() {
  const [showUI, toggleShowUI] = useGameStore((state) => [
    state.showUI,
    state.toggleShowUI,
  ]);

  const gameReady = GameReady.use();
  useEffect(() => {
    if (!gameReady) return;

    const listener = primodium.input.addListener(
      KeybindActions.ToggleUI,
      toggleShowUI
    );

    return () => {
      listener.dispose();
    };
  }, [gameReady]);

  return (
    <div>
      {gameReady && (
        <div className="screen-container">
          <div className="fixed top-0 bottom-0 screen-container pointer-events-none vignette opacity-20 mix-blend-overlay" />
          <BrandingLabel />
          <Camera />
          <AnimatePresence>
            {showUI && (
              <motion.div>
                <Hotbar />
                <TileInfo />
                <InfoBox />
                <NotificationBox />
                {/* <ResourceBox /> */}
                {/* <TooltipBox /> */}
                {/* <SideMenu /> */}
                <Inventory />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default GameUI;
