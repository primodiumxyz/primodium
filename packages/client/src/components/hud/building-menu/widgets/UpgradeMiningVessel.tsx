import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { EUnit } from "contracts/config/enums";
import { Badge } from "src/components/core/Badge";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useMud } from "src/hooks";
import { useHasEnoughResources } from "src/hooks/useHasEnoughResources";
import { components } from "src/network/components";
import { Account } from "src/network/components/clientComponents";
import { useGameStore } from "src/store/GameStore";
import { getBlockTypeName } from "src/util/common";
import { EntityType, RESOURCE_SCALE, ResourceImage, ResourceType } from "src/util/constants";
import { getUpgradeInfo } from "src/util/upgrade";
import { upgradeUnit } from "src/util/web3/contractCalls/upgradeUnit";

export const UpgradeMiningVessel: React.FC = () => {
  const network = useMud();
  const transactionLoading = useGameStore((state) => state.transactionLoading);
  const player = Account.use()?.value ?? singletonEntity;

  const mainBaseEntity = (components.Home.use(player)?.mainBase as Entity) ?? singletonEntity;
  const mainBaseLevel = components.Level.use(mainBaseEntity, {
    value: 0n,
  }).value;

  const { level, maxLevel, mainBaseLvlReq, recipe } = getUpgradeInfo(EntityType.MiningVessel, player);

  const hasEnough = useHasEnoughResources(recipe, player);

  const canUpgrade = hasEnough && mainBaseLevel >= mainBaseLvlReq && level < maxLevel;

  let error = "";
  if (!hasEnough) {
    error = "Not enough resources";
  } else if (mainBaseLevel < mainBaseLvlReq) {
    error = `Mainbase lvl. ${mainBaseLvlReq} required`;
  } else if (level >= maxLevel) {
    error = "reached max upgrade";
  }

  return (
    <SecondaryCard className="w-full items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <img src="img/icons/minersicon.png" className="pixel-images h-8 w-8" />
          <div>
            {recipe.length !== 0 && <p className="text-xs opacity-75 px-2 mb-1">UPGRADE VESSEL COST</p>}
            <div className="flex flex-wrap gap-1 px-2">
              {recipe.length !== 0 &&
                recipe.map((resource) => {
                  return (
                    <Badge key={resource.id + resource.type} className="text-xs gap-2">
                      <ResourceIconTooltip
                        playerEntity={player}
                        name={getBlockTypeName(resource.id)}
                        image={ResourceImage.get(resource.id) ?? ""}
                        resource={resource.id}
                        amount={resource.amount}
                        resourceType={resource.type}
                        scale={resource.type === ResourceType.Utility ? 1n : RESOURCE_SCALE}
                        direction="top"
                        validate
                      />
                    </Badge>
                  );
                })}
            </div>
          </div>
        </div>

        <Button
          className="w-fit btn-secondary btn-sm"
          disabled={!canUpgrade}
          loading={transactionLoading}
          onClick={() => upgradeUnit(EUnit.MiningVessel, network.network)}
        >
          UPGRADE
        </Button>
      </div>
      {error && <p className="animate-pulse text-error text-xs uppercase mt-2">{error}</p>}
      <div className="flex gap-1 mt-1">
        {Array(Number(maxLevel))
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${Number(level) - 1 >= index ? "bg-green-600" : "bg-slate-500"}`}
              />
            );
          })}
      </div>
    </SecondaryCard>
  );
};
