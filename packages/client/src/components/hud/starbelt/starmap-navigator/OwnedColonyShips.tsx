import { InterfaceIcons } from "@primodiumxyz/assets";
import { entityToFleetName, entityToRockName, EntityType } from "@primodiumxyz/core";
import { useAccountClient, useColonySlots, useCore } from "@primodiumxyz/core/react";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { Card } from "@/components/core/Card";
import { DeferredAsteroidsRenderContainer } from "@/game/lib/objects/Asteroid/DeferredAsteroidsRenderContainer";
import { useGame } from "@/hooks/useGame";
import { EntityToUnitImage } from "@/util/image";

export const OwnedColonyShip: React.FC<{ parentEntity: Entity; onClick?: () => void }> = ({
  parentEntity,
  onClick,
}) => {
  const { tables } = useCore();
  const isFleet = tables.IsFleet.has(parentEntity);
  const name = isFleet ? entityToFleetName(parentEntity) : entityToRockName(parentEntity);

  const image = isFleet ? InterfaceIcons.Fleet : InterfaceIcons.Asteroid;
  const Selected = isFleet ? tables.SelectedFleet : tables.SelectedRock;

  const selected = Selected.use()?.value === parentEntity;

  return (
    <Button size="content" selected={selected} onClick={onClick} className="!gap-1">
      <div className="grid grid-cols-5 gap-1 justify-around w-full items-center min-h-16">
        <img src={EntityToUnitImage[EntityType.ColonyShip]} className="w-10" />
        <img src={image} className="w-10" />
        <div className="flex flex-col col-span-3 text-wrap">
          <p className="text-xs opacity-70">{isFleet ? "Deployed to" : "Idling on"}</p>
          <p className="">{name}</p>
        </div>
      </div>
    </Button>
  );
};

export const OwnedColonyShips: React.FC<{ className?: string }> = ({ className }) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useAccountClient();
  const { tables, utils } = useCore();
  const game = useGame();

  const colonyShips = useColonySlots(playerEntity).occupiedSlots.filter((slot) => slot.type === "ship");

  const handleSelectRock = (entity: Entity) => {
    const { position } = utils.getAsteroidInfo(entity);
    const { pan, zoomTo } = game.STARMAP.camera;

    tables.SelectedRock.set({ value: entity });

    pan({
      x: position.x,
      y: position.y,
    });

    zoomTo(2);
  };

  const handleSelectFleet = (entity: Entity) => {
    const { pan, zoomTo } = game.STARMAP.camera;
    const arrivalTime = tables.FleetMovement.get(entity)?.arrivalTime ?? 0n;
    const time = tables.Time.get()?.value ?? 0n;

    if (arrivalTime < time) tables.SelectedFleet.set({ value: entity });

    const objects = game.STARMAP.objects;
    const fleet = objects.fleet.get(entity);
    let position = fleet?.getTileCoord();

    if (!position) {
      // the fleet might be around a non-spawned asteroid, so we need to check if it's registered
      const deferredRenderContainer = objects.deferredRenderContainer.getContainer(
        EntityType.Asteroid,
      ) as DeferredAsteroidsRenderContainer;
      const asteroidPosition = deferredRenderContainer.getFleetCoord(entity);

      if (!asteroidPosition) return;
      position = asteroidPosition;
    }

    pan({
      x: position.x,
      y: position.y,
    });

    zoomTo(2);
  };
  return (
    <Card noDecor className={className}>
      {colonyShips.length === 0 && (
        <p className="w-full h-full text-xs grid place-items-center opacity-50 uppercase">
          you control no colony ships
        </p>
      )}
      <div className="grid grid-cols-2 gap-1 mb-4 h-full auto-rows-max overflow-auto hide-scrollbar">
        {colonyShips.map((shipData, i) => (
          <OwnedColonyShip
            key={`colonyship-${shipData.parentEntity}-${i}`}
            parentEntity={shipData.parentEntity}
            onClick={() =>
              tables.IsFleet.has(shipData.parentEntity)
                ? handleSelectFleet(shipData.parentEntity)
                : handleSelectRock(shipData.parentEntity)
            }
          />
        ))}
      </div>
      {colonyShips.length > 0 && (
        <Badge variant="info" className="absolute bottom-3 right-3 text-sm">
          {colonyShips.length} Colony Ship{colonyShips.length > 1 ? "s" : ""}
        </Badge>
      )}
    </Card>
  );
};
