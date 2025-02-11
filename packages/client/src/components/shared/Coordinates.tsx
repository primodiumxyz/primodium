import { useEffect, useState } from "react";
import { FaLocationArrow, FaSquare } from "react-icons/fa";
import { FaCropSimple, FaSquareXmark } from "react-icons/fa6";

import { Mode } from "@primodiumxyz/core";
import { useCore } from "@primodiumxyz/core/react";
import { Coord, DepthLayers } from "@primodiumxyz/game";
import { Tile } from "@primodiumxyz/game/src/lib/objects/Tile";
import { usePersistentStore } from "@primodiumxyz/game/src/stores/PersistentStore";
import { SecondaryCard } from "@/components/core/Card";
import { useGame } from "@/hooks/useGame";
import { cn } from "@/util/client";

// This will show tile and region coordinates in the starmap, and tile coordinates when hovering a tile in asteroid
// In dev mode, this will be slightly above the "MUD Dev Tools" button, and be clickable in starmap for more info (pixel coordinates as well)
export const Coordinates = () => {
  const DEV = import.meta.env.PRI_DEV === "true";
  const [uiScale] = usePersistentStore((state) => [state.uiScale]);
  const { tables } = useCore();

  const selectedMode = tables.SelectedMode.use()?.value;
  const asteroidMode = selectedMode === Mode.Asteroid || selectedMode === Mode.Spectate;
  const starmapMode = selectedMode === Mode.Starmap;

  if (!asteroidMode && !starmapMode) return null;
  return (
    <SecondaryCard
      className={cn(
        "flex flex-col gap-1 min-h-9 justify-center text-xs bg-secondary/15 p-0",
        DEV ? "pointer-events-auto" : "bottom-2 pointer-events-none",
        uiScale < 0.7 && "text-[10px]",
      )}
    >
      {asteroidMode ? DEV ? <CoordsAsteroidDev /> : <CoordsAsteroid /> : <CoordsStarmap DEV={DEV} />}
    </SecondaryCard>
  );
};

/* ---------------------------------- USER ---------------------------------- */
export const CoordsAsteroid = () => {
  const { tables } = useCore();
  const tileCoord = tables.HoverTile.use();

  return (
    <div className="grid grid-cols-[12px_40px_48px] items-center gap-2 bg-black bg-opacity-30 p-2 rounded-sm">
      <FaSquareXmark opacity={0.7} />
      <CoordCaption caption="tile" />
      <CoordDisplay coord={{ x: tileCoord?.x ?? 0, y: tileCoord?.y ?? 0 }} />
    </div>
  );
};

export const CoordsStarmap = ({ DEV }: { DEV: boolean }) => {
  const scene = useGame().STARMAP;

  const [pixelCoord, setPixelCoord] = useState<Coord | undefined>(undefined);
  const [tileCoord, setTileCoord] = useState<Coord | undefined>(undefined);
  const [chunkCoord, setChunkCoord] = useState<Coord | undefined>(undefined);

  useEffect(() => {
    const pointerMoveSub = scene.input.pointermove$.pipe().subscribe((event) => {
      const pixelCoord = { x: event.worldX, y: event.worldY };

      setTileCoord(scene.utils.pixelCoordToTileCoord({ x: pixelCoord.x, y: -pixelCoord.y }));
      setChunkCoord(scene.utils.pixelCoordToChunkCoord({ x: pixelCoord.x, y: -pixelCoord.y }));
      if (DEV) setPixelCoord({ x: Math.round(pixelCoord.x), y: Math.round(pixelCoord.y) });
    });

    return () => pointerMoveSub.unsubscribe();
  }, []);

  if (DEV)
    return (
      <div className="grid grid-cols-[12px_70px_minmax(100px,auto)] items-center gap-2  p-2 rounded-sm">
        <FaLocationArrow opacity={0.7} />
        <CoordCaption caption="tile" />
        <CoordDisplay coord={tileCoord} />
        <FaCropSimple opacity={0.7} />
        <CoordCaption caption="region" />
        <CoordDisplay coord={chunkCoord} />
        <FaSquare opacity={0.7} size={8} className="ml-[2px]" />
        <CoordCaption caption="px" />
        <CoordDisplay coord={pixelCoord} />
      </div>
    );

  return (
    <div className="grid grid-cols-[12px_70px_minmax(100px,auto)] items-center gap-y-2 gap-x-4  p-2 rounded-sm">
      <FaLocationArrow opacity={0.7} className="min-w-[12px]" />
      <CoordCaption caption="coords" />
      <CoordDisplay coord={tileCoord} />
      <FaCropSimple opacity={0.7} className="min-w-[12px]" />
      <CoordCaption caption="region" />
      <CoordDisplay coord={chunkCoord} />
    </div>
  );
};

/* ----------------------------------- DEV ---------------------------------- */
export const CoordsAsteroidDev = () => {
  const { tables } = useCore();
  const scene = useGame().ASTEROID;
  const [tileCoord, setTileCoord] = useState<Coord | undefined>(undefined);

  const originalTile = tables.HoverTile.use();
  let devTile: Tile | undefined;

  useEffect(() => {
    const pointerMoveSub = scene.input.pointermove$.pipe().subscribe((event) => {
      const { x, y } = scene.utils.pixelCoordToTileCoord({ x: event.worldX, y: event.worldY });
      const coord = { x, y: -y };
      setTileCoord(coord);

      // show coordinates outside the buildable area in dev
      // if the original tile is present destroy the dev one
      if (originalTile && devTile) {
        devTile.destroy();
        devTile = undefined;
      }

      if (originalTile) return;
      // create the tile or update its position
      if (devTile) {
        devTile.setCoordPosition(coord);
      } else {
        devTile = new Tile(scene, coord, 0xffffff, 0.05).setDepth(DepthLayers.Tile).spawn();
      }
    });

    return () => {
      pointerMoveSub.unsubscribe();
      devTile?.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-[12px_40px_48px] items-center gap-2  p-2 rounded-sm">
      <FaSquareXmark opacity={0.7} />
      <CoordCaption caption="tile" />
      <CoordDisplay coord={tileCoord} />
    </div>
  );
};

/* ---------------------------------- UTILS --------------------------------- */
const CoordCaption = ({ caption }: { caption: string }) => <span className="mr-2 opacity-70">{caption}</span>;
const CoordDisplay = ({ coord }: { coord?: Coord }) =>
  coord ? (
    <span className="whitespace-nowrap">
      {coord.x}, {coord.y}
    </span>
  ) : (
    <span className="opacity-50">—</span>
  );
