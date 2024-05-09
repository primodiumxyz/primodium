import { Button } from "@/components/core/Button";
import { IconLabel } from "@/components/core/IconLabel";
import { useMud } from "@/hooks";

import { Mode } from "@/util/constants";
import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from "react-icons/fa6";

export const ModeSelector = () => {
  const { components } = useMud();
  const playerEntity = components.Account.use()?.value;
  const playerHome = components.Home.use(playerEntity)?.value;
  const currentMode = components.SelectedMode.use()?.value;
  const selectedRock = components.SelectedRock.use()?.value;
  const ownedBy = components.OwnedBy.use(selectedRock)?.value;
  const isShard = !!components.ShardAsteroid.use(selectedRock);
  const ownedByPlayer = ownedBy === playerEntity;

  return (
    <div className="flex flex-col items-center pointer-events-auto p-4 relative">
      <div className="flex flex-col items-center gap-2 relative">
        {(currentMode === Mode.Asteroid || currentMode === Mode.Spectate) && (
          <>
            <Button
              variant="info"
              size="md"
              keybind="NextHotbar"
              onClick={() => {
                components.SelectedMode.set({
                  value: Mode.CommandCenter,
                });
              }}
            >
              <div className="flex flex-start px-1 gap-3 w-full">
                <IconLabel className="text-lg drop-shadow-lg" imageUri={InterfaceIcons.Command} />
                <div className="flex flex-col items-start">
                  <p>
                    COMMAND CENTER <FaMagnifyingGlassMinus size={12} className="inline opacity-50" />
                  </p>
                  {ownedByPlayer && <p className="block text-xs opacity-75">CREATE/MANAGE WITH FLEETS IN ORBIT</p>}
                  {!ownedByPlayer && <p className="block text-xs opacity-75">ENGAGE WITH FLEETS IN ORBIT</p>}
                </div>
              </div>
            </Button>
            <Button
              variant="neutral"
              size="sm"
              keybind="PrevHotbar"
              onClick={() => {
                components.SelectedMode.set({
                  value: Mode.Starmap,
                });
              }}
            >
              <div className="flex flex-start px-1 gap-3 w-full">
                <IconLabel className="text-sm drop-shadow-lg" imageUri={InterfaceIcons.Starmap} />
                <div className="flex flex-col items-start">
                  <p>
                    STARBELT <FaMagnifyingGlassMinus size={12} className="inline opacity-50" />
                  </p>
                </div>
              </div>
            </Button>
          </>
        )}
        {currentMode === Mode.CommandCenter && (
          <>
            <Button
              variant="secondary"
              size="md"
              keybind="NextHotbar"
              onClick={() => {
                components.SelectedMode.set({
                  value: Mode.Starmap,
                });
              }}
            >
              <div className="flex flex-start px-1 gap-3 w-full">
                <IconLabel className="text-lg drop-shadow-lg" imageUri={InterfaceIcons.Starmap} />
                <div className="flex flex-col items-start">
                  <p>
                    STARBELT <FaMagnifyingGlassMinus size={12} className="inline opacity-50" />
                  </p>
                  <p className="block text-xs opacity-75">VIEW AND TRAVEL TO ASTEROIDS</p>
                </div>
              </div>
            </Button>
            {ownedByPlayer && (
              <Button
                variant="neutral"
                size="sm"
                keybind="PrevHotbar"
                onClick={() => {
                  components.ActiveRock.set({ value: selectedRock ?? singletonEntity });
                  components.SelectedMode.set({
                    value: Mode.Asteroid,
                  });
                }}
              >
                <div className="flex flex-start px-1 gap-3 w-full">
                  <IconLabel className="text-sm drop-shadow-lg" imageUri={InterfaceIcons.Build} />
                  <div className="flex flex-col items-start">
                    <p>
                      BUILD <FaMagnifyingGlassPlus size={12} className="inline opacity-50" />
                    </p>
                  </div>
                </div>
              </Button>
            )}
            {!ownedByPlayer && !isShard && (
              <Button
                variant="neutral"
                size="sm"
                keybind="PrevHotbar"
                onClick={() => {
                  components.ActiveRock.set({ value: selectedRock ?? singletonEntity });
                  components.SelectedMode.set({
                    value: Mode.Spectate,
                  });
                }}
              >
                <div className="flex flex-start px-1 gap-3 w-full">
                  <IconLabel className="text-sm drop-shadow-lg" imageUri={InterfaceIcons.Spectate} />
                  <div className="flex flex-col items-start">
                    <p>
                      SPECTATE <FaMagnifyingGlassPlus size={12} className="inline opacity-50" />
                    </p>
                  </div>
                </div>
              </Button>
            )}
          </>
        )}
        {currentMode === Mode.Starmap && (
          <>
            <Button
              variant="error"
              size="md"
              keybind="NextHotbar"
              onClick={() => {
                components.ActiveRock.set({ value: (playerHome ?? singletonEntity) as Entity });
                components.SelectedMode.set({
                  value: Mode.Asteroid,
                });
              }}
            >
              <div className="flex flex-start px-1 gap-3 w-full">
                <IconLabel className="text-lg drop-shadow-lg" imageUri={InterfaceIcons.Build} />
                <div className="flex flex-col items-start">
                  <p>
                    HOME <FaMagnifyingGlassPlus size={12} className="inline opacity-50" />
                  </p>
                  <p className="block text-xs opacity-75">RETURN TO HOME ASTEROID</p>
                </div>
              </div>
            </Button>
            <Button
              variant="neutral"
              size="sm"
              keybind="PrevHotbar"
              onClick={() => {
                components.SelectedMode.set({
                  value: Mode.CommandCenter,
                });
              }}
            >
              <div className="flex flex-start px-1 gap-3 w-full">
                <IconLabel className="text-sm drop-shadow-lg" imageUri={InterfaceIcons.Command} />
                <div className="flex flex-col items-start">
                  <p>
                    COMMAND CENTER <FaMagnifyingGlassPlus size={12} className="inline opacity-50" />
                  </p>
                </div>
              </div>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
