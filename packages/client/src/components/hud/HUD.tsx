import { HUD } from "@/components/core/HUD";
import { AsteroidLoading } from "@/components/hud/AsteroidLoading";
import { Dock } from "@/components/hud/Dock";
import { ModeSelector } from "@/components/hud/ModeSelector";
import { HoverTarget } from "@/components/hud/markers/HoverTarget";
import { BlueprintInfoMarker } from "@/components/hud/markers/asteroid/BlueprintInfoMarker";
import { BuildingMenuPopup } from "@/components/hud/markers/asteroid/BuildingMenuPopup";
import { FleetTarget } from "@/components/hud/markers/starmap/FleetTarget";
import { Intro } from "@/components/hud/modals/Intro";
import { FavoriteAsteroids } from "@/components/hud/widgets/FavoriteAsteroids";
import { WarshipPopulation } from "@/components/hud/widgets/WarshipPopulation";
import { Blueprints } from "@/components/hud/widgets/blueprints/Blueprints";
import { Resources } from "@/components/hud/widgets/resources/Resources";
import { StarmapNavigator } from "@/components/hud/widgets/starmap-navigator/StarmapNavigator";
import { BrandingLabel } from "@/components/shared/BrandingLabel";
import { usePersistentStore } from "@game/stores/PersistentStore";
import { memo } from "react";
import { useShallow } from "zustand/react/shallow";
import { HoverInfo } from "./hover/HoverInfo";
import { AsteroidMenuPopup } from "@/components/hud/markers/starmap/AsteroidMenuPopup";

export const GameHUD = memo(() => {
  const uiScale = usePersistentStore(useShallow((state) => state.uiScale));

  return (
    <div className={`screen-container relative`}>
      <HUD scale={uiScale}>
        <div className="absolute top-0 left-0 h-32 w-screen bg-gradient-to-b from-black to-transparent" />
        {/* MARKERS */}
        {/* <AsteroidTarget /> */}
        <AsteroidMenuPopup />
        <FleetTarget />
        <HoverTarget />
        <BuildingMenuPopup />
        <BlueprintInfoMarker />
        <Intro />

        {/* Widgets */}
        <HUD.TopLeft>
          <WarshipPopulation />
        </HUD.TopLeft>

        <HUD.TopMiddle className="flex flex-col items-center gap-2">
          <ModeSelector />
        </HUD.TopMiddle>
        <HUD.TopRight className="flex flex-col items-end gap-2">
          <FavoriteAsteroids />
          {/* <Hangar />
          <OwnedAsteroids />
          <OwnedFleets /> */}
        </HUD.TopRight>

        <HUD.Right>
          <Resources />
          <StarmapNavigator />
        </HUD.Right>

        <HUD.Left>
          <Blueprints />
        </HUD.Left>

        <HUD.BottomMiddle>
          <Dock />
        </HUD.BottomMiddle>
        <HUD.BottomRight>{/* <Chat /> */}</HUD.BottomRight>
      </HUD>
      <HUD>
        <HUD.CursorFollower>
          <HoverInfo />
        </HUD.CursorFollower>
        <HUD.BottomRight>
          <BrandingLabel />
        </HUD.BottomRight>
      </HUD>
      <AsteroidLoading />
    </div>
  );
});
