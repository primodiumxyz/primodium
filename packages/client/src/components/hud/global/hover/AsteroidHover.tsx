import { HealthBar } from "@/components/shared/HealthBar";
import { EntityToResourceImage } from "@/util/mappings";
import { Entity } from "@latticexyz/recs";
import { InterfaceIcons, ResourceImages } from "@primodiumxyz/assets";
import { Badge } from "src/components/core/Badge";
import { IconLabel } from "src/components/core/IconLabel";
import { Loader } from "src/components/core/Loader";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { useClaimPrimodium } from "src/hooks/primodium/useClaimPrimodium";
import { useAsteroidStrength } from "src/hooks/useAsteroidStrength";
import { useFullResourceCount, useFullResourceCounts } from "src/hooks/useFullResourceCount";
import { useInGracePeriod } from "src/hooks/useInGracePeriod";
import { useSyncStatus } from "src/hooks/useSyncStatus";
import { components } from "src/network/components";
import { getAsteroidDescription } from "src/util/asteroid";
import { EntityType, Keys } from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { entityToRockName } from "src/util/name";
import { formatResourceCount, formatTime, formatTimeShort } from "src/util/number";

export const AsteroidHover: React.FC<{ entity: Entity; hideResources?: boolean }> = ({
  entity,
  hideResources = false,
}) => {
  const { loading } = useSyncStatus(hashEntities(Keys.SELECTED, entity));
  const name = entityToRockName(entity);
  const wormhole = components.Asteroid.get(entity)?.wormhole;
  const desc = getAsteroidDescription(entity);
  const { inGracePeriod, duration } = useInGracePeriod(entity, loading);
  const { resourceCount: encryption, resourceStorage: maxEncryption } = useFullResourceCount(
    EntityType.Encryption,
    entity,
    loading
  );

  const ownedBy = components.OwnedBy.use(entity)?.value as Entity | undefined;
  const { strength, maxStrength } = useAsteroidStrength(entity, loading);
  const claimConquerTime = useClaimPrimodium(entity);

  if (loading)
    return (
      <div className="relative w-56 h-24 px-auto uppercase font-bold">
        <div className="flex h-full justify-center items-center gap-2">
          <Loader />
          Loading Data
        </div>
      </div>
    );

  return (
    <div className="w-60 relative">
      <div className="absolute top-0 left-0 w-full h-full topographic-background-sm opacity-50 " />
      <div className="flex flex-col gap-1 z-10">
        <div className="grid grid-cols-2 gap-1">
          <div className="flex gap-1 items-center">
            <IconLabel imageUri={InterfaceIcons.Asteroid} className={`pixel-images w-3 h-3 bg-base-100`} />
            <p className="text-sm font-bold uppercase">{name}</p>
          </div>
        </div>
        {wormhole && (
          <div className="flex rainbow-bg uppercase text-primary font-bold border border-secondary/50 text-sm justify-center items-center">
            WORMHOLE DETECTED
          </div>
        )}
        {desc.primodium > 0n && !!claimConquerTime && (
          <div className="flex victory-bg uppercase text-primary font-bold border border-secondary/50 text-sm justify-center items-center">
            CLAIM
            {!claimConquerTime.canConquer
              ? ` IN ${formatTime(claimConquerTime.timeUntilClaim)}`
              : ` ${claimConquerTime.points} PTS`}
          </div>
        )}
        <div className="flex gap-1">
          <div className="flex bg-primary uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4 max-w-48">
            {ownedBy ? <AccountDisplay className="w-12" noColor player={ownedBy} raw /> : "DROID INFESTED"}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex bg-neutral uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
            {desc.size}
          </div>
          <div className="flex bg-neutral uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
            {desc.type}
          </div>
          <div className="flex bg-neutral uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
            {/* todo replace PRI with icon */}
            <IconLabel imageUri={ResourceImages.Primodium} />
            {desc.primodium.toLocaleString()}
          </div>
        </div>
        {inGracePeriod && (
          <div className="flex bg-success/25 font-bold border border-success/50 gap-2 text-xs p-1 items-center h-4 w-fit">
            <IconLabel imageUri={InterfaceIcons.Grace} className={`pixel-images w-3 h-3`} />
            {formatTimeShort(duration)}
          </div>
        )}
        {!inGracePeriod && (
          <>
            <div className="grid grid-cols-2 gap-1">
              <Badge className="w-full text-xs text-accent bg-base-100 p-1 border border-secondary">
                <HealthBar
                  imgUrl={EntityToResourceImage[EntityType.Encryption]}
                  health={Number(formatResourceCount(EntityType.Encryption, encryption, { notLocale: true }))}
                  maxHealth={Number(formatResourceCount(EntityType.Encryption, maxEncryption, { notLocale: true }))}
                />
              </Badge>
              <Badge className="w-full text-xs text-accent bg-base-100 p-1 border border-secondary">
                <HealthBar
                  imgUrl={EntityToResourceImage[EntityType.HP]}
                  health={Number(formatResourceCount(EntityType.HP, strength, { notLocale: true, showZero: true }))}
                  maxHealth={Number(
                    formatResourceCount(EntityType.HP, maxStrength, { notLocale: true, showZero: true })
                  )}
                />
              </Badge>
            </div>
            {!hideResources && <AsteroidResources entity={entity} />}
          </>
        )}
      </div>
    </div>
  );
};

const ResourceDisplay = ({ type, count }: { type: Entity; count: bigint }) => {
  if (count == 0n) return null;
  return (
    <IconLabel
      key={`show-resource-${type}`}
      imageUri={EntityToResourceImage[type]}
      text={formatResourceCount(type, count, { short: true })}
    />
  );
};

const AsteroidResources = ({ entity }: { entity: Entity }) => {
  const resources = useFullResourceCounts(entity);
  return (
    <div className="text-xs grid grid-cols-3 gap-1 divide-x divide-primary/50 pt-1 border-t border-t-primary/50">
      <div className="uppercase font-bold flex flex-col gap-1 p-1">
        {[EntityType.Iron, EntityType.Copper, EntityType.Lithium].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
      <div>
        {[EntityType.IronPlate, EntityType.PVCell, EntityType.Alloy].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
      <div>
        {[EntityType.Titanium, EntityType.Platinum, EntityType.Iridium, EntityType.Kimberlite].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
    </div>
  );
};
