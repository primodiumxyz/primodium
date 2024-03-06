import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import React, { memo, useMemo } from "react";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useHasEnoughResources } from "src/hooks/useHasEnoughResources";
import { components } from "src/network/components";
import { getBuildingLevelStorageUpgrades, transformProductionData } from "src/util/building";
import { getBlockTypeName } from "src/util/common";
import { ResourceImage, ResourceType } from "src/util/constants";
import { getRecipe } from "src/util/recipe";
import { Hex } from "viem";
import { Badge } from "../../../core/Badge";
import { Card, SecondaryCard } from "../../../core/Card";
import { IconLabel } from "../../../core/IconLabel";

export const RecipeDisplay: React.FC<{
  building: Entity;
  asteroid: Entity;
}> = memo(({ building, asteroid }) => {
  const recipe = getRecipe(building, 1n);

  // cost of the building
  return (
    <SecondaryCard className="items-center gap-1 w-full !border-error/50 bg-transparent p-1">
      <p className="font-bold absolute opacity-75 left-0 top-1/2 -translate-y-1/2 text-error text-sm ml-1">-</p>
      <div className="flex flex-wrap justify-center items-center gap-1 w-44">
        {recipe.length == 0 ? (
          <Badge className="font-bold">FREE</Badge>
        ) : (
          recipe.map((resource, i) => {
            const resourceImage = ResourceImage.get(resource.id)!;
            const resourceName = getBlockTypeName(resource.id);
            return (
              <Badge key={`recipe-chunk-${i}`} className="border border-secondary/75">
                <ResourceIconTooltip
                  key={resource.id + resource.type}
                  spaceRock={asteroid}
                  image={resourceImage}
                  resource={resource.id}
                  resourceType={resource.type}
                  name={resourceName}
                  amount={resource.amount}
                  validate
                  fontSize={"xs"}
                  short
                  direction="top"
                  fractionDigits={1}
                />
              </Badge>
            );
          })
        )}
      </div>
    </SecondaryCard>
  );
});

export const BlueprintInfo: React.FC<{
  building: Entity;
}> = memo(({ building }) => {
  const spaceRock = components.ActiveRock.use()?.value;
  if (!spaceRock) throw new Error("No space rock found");
  const rawProduction = components.P_Production.useWithKeys({ prototype: building as Hex, level: 1n });
  const production = useMemo(() => transformProductionData(rawProduction), [rawProduction]);

  const unitProduction = components.P_UnitProdTypes.useWithKeys({ prototype: building as Hex, level: 1n });
  const storageUpgrades = useMemo(
    () => (building ? getBuildingLevelStorageUpgrades(building, 1n) : undefined),
    [building]
  );

  const hasEnough = useHasEnoughResources(getRecipe(building ?? singletonEntity, 1n), spaceRock);

  if (!building) return <div className="items-center p-0 w-full z-100 h-24">Select a building</div>;
  if (!getBlockTypeName(building)) return <></>;

  return (
    <Card>
      <div className="items-center p-0 w-full z-100">
        <div className="flex flex-col items-center w-full h-full text-xs relative gap-1 ">
          <div className="absolute top-0 w-full h-full topographic-background opacity-25" />

        
          
          {/* Version 0.10: The cost of the building */}
          {/* <RecipeDisplay building={building} asteroid={spaceRock} /> */}

          {/* Version 0.10: The effect/production of building */}
          {/* <SecondaryCard className="flex flex-col items-center gap-1 w-full relative bg-transparent border-success/50 p-1">
            <p className="font-bold absolute opacity-75 left-0 top-1/2 -translate-y-1/2 text-success text-sm ml-1">+</p>
            {production.map(({ resource, amount, type }) => (
              <Badge key={`prototypeproduction-${resource}`} className="text-xs gap-2 border border-secondary/75">
                <ResourceIconTooltip
                  name={getBlockTypeName(resource)}
                  image={ResourceImage.get(resource) ?? ""}
                  resource={resource}
                  amount={amount}
                  resourceType={type}
                  short
                  fontSize="xs"
                  direction="top"
                  fractionDigits={3}
                />
              </Badge>
            ))}
            {!!unitProduction && (
              <div className="gap-1 flex flex-wrap">
                {unitProduction?.value.map((unit) => (
                  <Badge key={`unitProduction-${unit}`} className="text-xs gap-2 border border-secondary/75">
                    <IconLabel
                      className={`text-xs font-bold justify-center`}
                      imageUri={ResourceImage.get(unit as Entity) ?? ""}
                      tooltipDirection={"top"}
                      tooltipText={getBlockTypeName(unit as Entity)}
                      text={""}
                      hideText
                    />
                  </Badge>
                ))}
              </div>
            )}
            {!!storageUpgrades?.length && (
              <div className="flex flex-col items-center">
                <p className="text-left font-bold opacity-50 mt-1">STORAGE</p>
                <div className="flex flex-wrap gap-1 w-56 justify-center">
                  {storageUpgrades.map(({ resource, amount }) => (
                    <Badge key={`storage-${resource}`} className="text-xs py-3 border border-secondary/75">
                      <ResourceIconTooltip
                        name={getBlockTypeName(resource)}
                        image={ResourceImage.get(resource) ?? ""}
                        resource={resource}
                        amount={amount}
                        resourceType={ResourceType.Resource}
                        short
                        fontSize="xs"
                        direction="top"
                        fractionDigits={3}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </SecondaryCard> */}

          {/* New: blueprint building tooltip */}
          <SecondaryCard className="flex flex-col gap-4 p-1">
              {/* Building Title */}
              <div className="text-sm font-bold"> Shield Generator</div>

              {/* Function Box */}
              <div className="flex flex-col">
                <span className="mb-2">Effect</span>
                <div className="flex items-center gap-2 w-56">
                  <img src="UI_defense.png" alt="Defense Icon" className="w-4 h-4 m-1" />
                  <span className="text-xs text-success/50"> Increase shield strength by 5% </span>
                </div>
              </div>
              
               {/* Cost Box */}
              <div className="flex flex-col">
                <span className="mb-2">Cost</span>
                <div className="flex flex-wrap items-center w-56 gap-2">
                  
                  <div className="flex items-center gap-1 px-1 bg-gray-800 rounded">
                    <img src="Alloy_Resource.png" alt="Resource Icon" className="w-4 h-4" />
                    <span className="text-xs text-error">5000</span>
                  </div>
                  <div className="flex items-center gap-1 px-1 bg-gray-800 rounded">
                    <img src="Alloy_Resource.png" alt="Resource Icon" className="w-4 h-4" />
                    <span className="text-xs text-error">5000</span>
                  </div>
                  <div className="flex items-center gap-1 px-1 bg-gray-800 rounded">
                    <img src="Alloy_Resource.png" alt="Resource Icon" className="w-4 h-4" />
                    <span className="text-xs text-error">100</span>
                  </div>
                  
                </div>

                {/* if not enough resources */}
                {!hasEnough && <p className="text-error animate-pulse duration-2000 text-xs text-center mt-2">NOT ENOUGH RESOURCES</p>}
              </div>

              {/* Size Tile */}
              <div className="mt-auto self-end">
                <span className="text-xs text-gray-400">4x4 tiles</span>
              </div>


             
          </SecondaryCard>

          
        </div>
      </div>
    </Card>
  );
});
