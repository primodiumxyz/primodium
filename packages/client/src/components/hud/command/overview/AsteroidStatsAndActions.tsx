import { Button } from "@/components/core/Button";
import { CapacityBar } from "@/components/core/CapacityBar";
import { HUD } from "@/components/core/HUD";
import { Tabs } from "@/components/core/Tabs";
import { useAsteroidStrength } from "@/hooks/useAsteroidStrength";
import { useFullResourceCount } from "@/hooks/useFullResourceCount";
import { components } from "@/network/components";
import { EntityType } from "@/util/constants";
import { EntityToResourceImage } from "@/util/mappings";
import { formatResourceCount } from "@/util/number";
import { Entity } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export const AsteroidStats = ({ asteroid, segments = 10 }: { asteroid: Entity; segments?: number }) => {
  const { resourceCount: encryption, resourceStorage: maxEncryption } = useFullResourceCount(
    EntityType.Encryption,
    asteroid
  );
  const { strength, maxStrength } = useAsteroidStrength(asteroid);
  const encryptionImg = EntityToResourceImage[EntityType.Encryption] ?? "";
  const strengthImg = EntityToResourceImage[EntityType.HP] ?? "";
  return (
    <div className="flex flex-row gap-4 justify-end">
      <div className="flex gap-2 items-center">
        <img src={encryptionImg} className="w-4 h-4" alt="encryption" />
        <CapacityBar current={encryption} max={maxEncryption} segments={segments} className="w-24" />
        <p>{formatResourceCount(EntityType.Encryption, encryption, { short: true })}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src={strengthImg} className="w-4 h-4" alt="strength" />
        <CapacityBar current={strength} max={maxStrength} segments={segments} className="w-24" />
        <p className="min-w-5">{formatResourceCount(EntityType.Defense, strength, { short: true })}</p>
      </div>
    </div>
  );
};

const Hints = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //handle click outside and set show to false
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest(".dropdown")) setShow(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex items-center text-xs z-50">
      <div className="dropdown dropdown-top">
        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs" onClick={() => setShow(!show)}>
          <FaInfoCircle size={16} />
        </label>
        {show && (
          <div
            tabIndex={0}
            className="absolute card compact dropdown-content z-[1] shadow bg-base-100 w-60 p-2 m-1 border border-secondary gap-1"
          >
            <p className="text-accent">To attack a fleet/asteroid</p>
            <p className="opacity-70">Select an enemy fleet or asteroid to initiate an attack</p>
            <hr className="opacity-70 col-span-2" />
            <p className="text-accent col-span-2">Manage fleet</p>
            <p className="opacity-70">
              Select a friendly fleet to set its stance, set a new home base, or clear its inventory
            </p>
            <hr className="opacity-70 col-span-2" />
            <p className="text-accent col-span-2">Create Fleet/Transfer Resources</p>
            <p className="opacity-70 flex">
              You can create a new fleet or manage existing fleets by visiting the Transfer Inventory tab
            </p>
            <hr className="opacity-70 col-span-2" />
            <p className="text-accent col-span-2">Abandon</p>
            <p className="opacity-70 flex">
              Abandoning this asteroid will remove all fleets and resources. You will lose ownership of this asteroid
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Tabs.Button index={1} variant="secondary" size="sm">
        + CREATE FLEET
      </Tabs.Button>
      <Button variant="error" size="sm">
        ABANDON
      </Button>
      <Hints />
    </div>
  );
};

export const AsteroidStatsAndActions = () => {
  const playerEntity = components.Account.use()?.value;
  const selectedAsteroid = components.SelectedRock.use()?.value;
  const homeAsteroid = components.Home.use(playerEntity)?.value;

  if (!selectedAsteroid && !homeAsteroid) return null;

  return (
    <HUD.BottomMiddle className="mb-36 flex flex-col items-center gap-4">
      <AsteroidStats asteroid={(selectedAsteroid ?? homeAsteroid) as Entity} />
      <ActionButtons />
    </HUD.BottomMiddle>
  );
};
