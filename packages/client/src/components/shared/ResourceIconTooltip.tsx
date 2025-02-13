import { formatNumber, getScale, ResourceType } from "@primodiumxyz/core";
import { useHasEnoughOfResource } from "@primodiumxyz/core/react";
import { Entity } from "@primodiumxyz/reactive-tables";
import { IconLabel } from "@/components/core/IconLabel";

type ResourceIconProps<V extends boolean | undefined> = {
  image: string;
  resource: Entity;
  resourceType?: ResourceType;
  name: string;
  amount: bigint;
  inline?: boolean;
  fontSize?: string;
  direction?: "top" | "bottom" | "right" | "left";
  className?: string;
  validate?: V;
  short?: boolean;
  fractionDigits?: number;
} & (V extends true ? { spaceRock: Entity } : { spaceRock?: never });

const suffixes = {
  [ResourceType.Utility]: "",
  [ResourceType.ResourceRate]: "/MIN",
  [ResourceType.Resource]: "",
  [ResourceType.Multiplier]: "x",
};

const ResourceIconTooltipContent = <V extends boolean>({
  resourceType,
  amount,
  image,
  fontSize = "md",
  className,
  hasEnough,
  short = false,
  fractionDigits = 0,
  resource,
}: ResourceIconProps<V> & { hasEnough: boolean }) => {
  let value = Number(amount);
  if (resourceType == ResourceType.Multiplier) value = (value + 100) / 100;
  else {
    const scale = getScale(resource);
    value = value / Number(scale);
    if (resourceType == ResourceType.ResourceRate) value = value * 60;
  }

  const label =
    formatNumber(value, { short: short && resourceType !== ResourceType.Multiplier, fractionDigits }) +
    suffixes[resourceType || ResourceType.Resource];

  return (
    <IconLabel
      imageUri={image}
      text={label}
      className={`text-${fontSize} font-bold ${className} ${!hasEnough ? `text-error animate-pulse ` : ""}`}
    />
  );
};

const ResourceIconTooltipValidate = (props: ResourceIconProps<true>) => {
  const hasEnough = useHasEnoughOfResource(props.resource, props.amount, props.spaceRock, props.resourceType);
  return <ResourceIconTooltipContent {...props} hasEnough={hasEnough} />;
};

export const ResourceIconTooltip = <V extends boolean | undefined>(props: ResourceIconProps<V>) => {
  if (props.validate === true) {
    const trueProps = props as ResourceIconProps<true>;
    return <ResourceIconTooltipValidate {...trueProps} />;
  } else {
    return <ResourceIconTooltipContent {...props} hasEnough />;
  }
};
