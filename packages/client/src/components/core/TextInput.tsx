import { useEffect, useRef } from "react";
import { usePrimodium } from "src/hooks/usePrimodium";

export const TextInput: React.FC<{
  topLeftLabel?: string;
  bottomLeftLabel?: string;
  topRightLabel?: string;
  bottomRightLabel?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  requirePattern?: string;
}> = ({
  placeholder,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  className,
  maxLength,
  onChange,
  requirePattern,
}) => {
  const primodium = usePrimodium();
  const input = primodium.api("UI").input;
  const input2 = primodium.api("ASTEROID").input;
  const input3 = primodium.api("STARMAP").input;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (!inputRef.current || event.key !== "Escape") return;

      inputRef.current.blur();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!inputRef.current || inputRef.current.contains(event.target as Node)) return;

      inputRef.current.blur();
    };

    document.addEventListener("keydown", handleEscPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-control w-full max-w-xs pointer-events-auto">
      <label className="label">
        {topLeftLabel && <span className="label-text opacity-90">{topLeftLabel}</span>}
        {topRightLabel && <span className="label-text-alt opacity-75">{topRightLabel}</span>}
      </label>
      <input
        ref={inputRef}
        type="text"
        onChange={onChange}
        maxLength={maxLength}
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
        required={!!requirePattern}
        pattern={requirePattern}
        placeholder={placeholder ?? "Type here"}
        className={`${className} input w-full max-w-xs`}
      />
      <label className="label">
        {bottomLeftLabel && <span className="label-text-alt opacity-75">{bottomLeftLabel}</span>}
        {bottomRightLabel && <span className="label-text-alt opacity-75"> {bottomRightLabel} </span>}
      </label>
    </div>
  );
};
