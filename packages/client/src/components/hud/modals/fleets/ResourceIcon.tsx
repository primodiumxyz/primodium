import { EntityToResourceImage } from "@/util/mappings";
import { Entity } from "@latticexyz/recs";
import React from "react";
import { FaSync } from "react-icons/fa";
import { Button } from "src/components/core/Button";
import { formatResourceCount } from "src/util/number";

export const ResourceIcon = ({
  resource,
  amount,
  delta,
  className,
  setDragging = () => null,
  onClear,
  disableClear,
  size = "md",
  disabled,
}: {
  resource: Entity;
  amount: string;
  delta?: bigint;
  className?: string;
  setDragging?: (e: React.MouseEvent, entity: Entity) => void;
  onClear?: (entity: Entity) => void;
  disableClear?: boolean;
  size?: "sm" | "md";
  disabled?: boolean;
}) => (
  <div
    onMouseDown={(e) => !disabled && setDragging(e, resource)}
    className={`relative flex ${
      size == "md" ? "flex-col" : "gap-6"
    } gap-1 items-center justify-center cursor-pointer bg-neutral border border-primary w-full h-full p-2 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    } ${className}`}
  >
    <img
      src={EntityToResourceImage[resource]}
      className={`pixel-images ${size == "md" ? "w-12" : "w-10"} scale-200 font-bold text-lg pointer-events-none`}
    />
    <p className={`${size == "sm" ? "text-sm" : ""} font-bold`}>{amount}</p>
    <p className={`text-xs ${delta && delta < 0n ? "text-error" : "text-success"}`}>
      {!!delta && delta !== 0n && `(${delta > 0n ? "+" : ""}${formatResourceCount(resource, delta)})`}
    </p>
    {onClear && (
      <Button
        className="btn-ghost btn-xs absolute bottom-0 right-0"
        disabled={disableClear}
        onClick={() => onClear(resource)}
        tooltip={"Clear"}
        tooltipDirection="bottom"
      >
        <FaSync className="text-error scale-x-[-1]" />
      </Button>
    )}
  </div>
);
