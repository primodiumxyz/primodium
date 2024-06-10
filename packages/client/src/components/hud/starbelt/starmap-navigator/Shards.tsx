import { Badge } from "@/components/core/Badge";
import { Card } from "@/components/core/Card";
import { IconLabel } from "@/components/core/IconLabel";
import { useMud } from "@/react/hooks";
import { useShardAsteroid } from "@/react/hooks/primodium/useShardAsteroid";
import { useGame } from "@/react/hooks/useGame";
import { components } from "@/network/components";
import { EntityType } from "@/util/constants";
import { formatResourceCount, formatTimeShort } from "@/util/number";
import { useEntityQuery } from "@latticexyz/react";
import { Entity, Has } from "@latticexyz/recs";
import { ResourceImages } from "@primodiumxyz/assets";
import { Button } from "src/components/core/Button";
import { getAsteroidImage } from "src/util/asteroid";
import { entityToRockName } from "src/util/name";

export const Shards = ({ className = "" }: { className?: string }) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const query = [Has(components.ShardAsteroid)];
  const shards = useEntityQuery(query).sort((a) => {
    const aOwner = components.OwnedBy.get(a)?.value;
    if (!aOwner) return 0;
    if (aOwner === playerEntity) return -1;
    return -1;
  });
  const game = useGame();

  const handleSelectShard = (entity: Entity) => {
    const position = components.Position.get(entity);
    if (!position) return;
    const { pan, zoomTo } = game.STARMAP.camera;

    components.SelectedRock.set({ value: entity });

    pan({
      x: position.x,
      y: position.y,
    });

    zoomTo(0.9);
  };
  return (
    <Card className={className}>
      {shards.length === 0 && (
        <p className="w-full h-full text-xs grid place-items-center opacity-50 uppercase">
          no volatile shards detected
        </p>
      )}
      <div className="grid grid-cols-2 gap-1 mb-4 h-full auto-rows-max overflow-auto hide-scrollbar">
        {shards.map((entity) => {
          return <Shard key={entity} shardEntity={entity} onClick={() => handleSelectShard(entity)} />;
        })}
      </div>
      {shards.length > 0 && (
        <Badge variant="info" className="absolute bottom-3 right-3 text-sm">
          {shards.length} Shard{shards.length > 1 ? "s" : ""}
        </Badge>
      )}
    </Card>
  );
};

const Shard = ({
  shardEntity,
  onClick,
  className = "",
}: {
  className?: string;
  shardEntity: Entity;
  onClick: () => void;
}) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const game = useGame();
  const imageUri = getAsteroidImage(game, shardEntity);
  const position = components.Position.get(shardEntity);
  const shardData = useShardAsteroid(shardEntity);
  const selected = components.SelectedRock.use()?.value === shardEntity;
  if (!position || !shardData) return null;

  return (
    <Button
      size="content"
      selected={selected}
      className={`flex-col text-balance h-full ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-around w-full">
        <img src={imageUri} className=" w-10 h-10" />
        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-sm text-wrap">{entityToRockName(shardEntity)}</p>
          {shardData.owner ? (
            shardData.owner === playerEntity ? (
              <p className="text-xs text-success flex gap-2">
                <IconLabel imageUri={ResourceImages.Primodium} className={`pixel-images w-3 h-3`} />
                {formatResourceCount(EntityType.Iron, shardData.dripPerSec * 60n * 60n, {
                  fractionDigits: 1,
                })}
                /HR
              </p>
            ) : (
              <p className="text-xs text-warning">occupied</p>
            )
          ) : (
            <p className="opacity-50 text-xs">Unoccupied</p>
          )}
        </div>
      </div>
      <div className="text-xs">
        EXPLODES{" "}
        <span className="text-error">
          {shardData.canExplode ? "NOW" : ` IN ${formatTimeShort(shardData.timeUntilExplode)}`}
        </span>
      </div>
    </Button>
  );
};
