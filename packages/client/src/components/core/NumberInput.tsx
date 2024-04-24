import { usePrimodium } from "src/hooks/usePrimodium";
import { adjustDecimals } from "src/util/number";
import { Button } from "./Button";

export const NumberInput: React.FC<{
  min?: number;
  max?: number;
  toFixed?: number;
  onChange?: (val: string) => void;
  count: string;
}> = ({ count, min = 0, max = Infinity, onChange, toFixed = 0 }) => {
  const primodium = usePrimodium();
  const input = primodium.api("UI").input;
  const input2 = primodium.api("ASTEROID").input;
  const input3 = primodium.api("STARMAP").input;

  const handleUpdate = (newCount: string) => {
    newCount = adjustDecimals(newCount, toFixed);
    // const allZeroes = newCount.split("").every((digit) => digit == "0");

    if (isNaN(Number(newCount))) {
      onChange?.(min.toString());
      return;
    }

    const countNum = Number(newCount);
    if (countNum > max) {
      newCount = max.toString();
    } else if (countNum < min) {
      newCount = min.toString();
    }

    onChange?.(newCount);
  };

  return (
    <div className={`flex mb-4 relative`}>
      <Button
        className="btn-xs btn-ghost"
        disabled={Number(count) <= min}
        onClick={(e) => {
          e?.preventDefault();
          handleUpdate(Math.max(min, count == "" ? 0 : Number(count) - 1).toString());
        }}
      >
        -
      </Button>
      <input
        type="number"
        className={`bg-transparent text-center w-fit outline-none border-b border-pink-900 ${
          Number(count) > max ? "text-error" : ""
        }`}
        value={count}
        placeholder={min.toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          handleUpdate(e.target.value);
        }}
        onFocus={() => {
          input.disableInput();
          input2.disableInput();
          input3.disableInput();
        }}
        onBlur={() => {
          input.enableInput();
          input2.enableInput();
          input3.enableInput();
        }}
        min={0}
        max={max}
      />
      <Button
        className="btn-xs btn-ghost"
        disabled={Number(count) >= max}
        onClick={(e) => {
          e?.preventDefault();
          handleUpdate(Math.min(max, count == "" ? min + 1 : Number(count) + 1).toString());
        }}
      >
        +
      </Button>
      {max !== Infinity && (
        <div className="absolute right-1/2 -bottom-1/2 translate-x-1/2 translate-y-1/2">
          <Button
            className={`${Number(count) >= max ? "opacity-50" : ""} btn-xs btn-ghost  opacity-50`}
            disabled={Number(count) >= max}
            onClick={() => handleUpdate(max.toString())}
          >
            max
          </Button>
        </div>
      )}
    </div>
  );
};
