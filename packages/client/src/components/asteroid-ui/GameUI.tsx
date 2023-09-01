import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { AnimatePresence, motion } from "framer-motion";

import { primodium } from "@game/api";
import { AsteroidMap, KeybindActions } from "@game/constants";

import { useGameStore } from "../../store/GameStore";
import { InfoBox } from "./InfoBox";

import Hotbar from "./hotbar/Hotbar";
// import { TileInfo } from "./tile-info/TileInfo";
import NotificationBox from "./NotificationBox";
import { BrandingLabel } from "./BrandingLabel";
import { AiOutlineRotateRight } from "react-icons/ai";
import { useOrientation } from "src/hooks/useOrientation";
import { UserPanel } from "./user-panel/UserPanel";
import Notifications from "./Notifications";

function AsteroidUI() {
  const [showUI, toggleShowUI] = useGameStore((state) => [
    state.showUI,
    state.toggleShowUI,
  ]);
  const { addListener } = primodium.api(AsteroidMap.KEY)!.input;
  const { isPortrait } = useOrientation();

  useEffect(() => {
    const listener = addListener(KeybindActions.ToggleUI, toggleShowUI);

    return () => {
      listener.dispose();
    };
  }, []);

  return (
    <div>
      <div className="screen-container">
        {isMobile && isPortrait && (
          <div className="fixed flex-col top-0 bottom-0 screen-container pointer-events-none bg-gray-700 z-[1000] flex items-center justify-center font-mono font-bold text-white text-lg space-y-4">
            <AiOutlineRotateRight size="64" />
            <p> Please play in landscape </p>
          </div>
        )}
        <BrandingLabel />
        <AnimatePresence>
          {showUI && (
            <motion.div>
              <Hotbar />
              {/* <TileInfo /> */}
              <InfoBox />
              <NotificationBox />
              <UserPanel />
              <Notifications />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AsteroidUI;
