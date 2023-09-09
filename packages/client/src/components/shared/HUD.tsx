import { ReactNode, memo, createContext, useContext, FC } from "react";

interface HUDProps {
  children?: ReactNode;
  scale?: number;
  pad?: boolean;
}

const ScaleContext = createContext<number | undefined>(undefined);

const useScale = () => {
  const scale = useContext(ScaleContext);
  if (scale === undefined) {
    throw new Error("useScale must be used within a ScaleProvider");
  }
  return scale;
};

const TopRight: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "top right" }}
      className="absolute top-0 right-0"
    >
      {children}
    </div>
  );
});

const TopLeft: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      className="absolute top-0 left-0"
    >
      {children}
    </div>
  );
});

const BottomRight: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom right" }}
      className="absolute bottom-0 right-0"
    >
      {children}
    </div>
  );
});

const BottomLeft: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom left" }}
      className="absolute bottom-0 left-0"
    >
      {children}
    </div>
  );
});

const TopMiddle: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "top center",
      }}
      className="absolute top-0 left-1/2"
    >
      {children}
    </div>
  );
});

const BottomMiddle: FC<HUDProps> = memo(({ children }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "bottom center",
      }}
      className="absolute bottom-0 left-1/2"
    >
      {children}
    </div>
  );
});

export const HUD: FC<HUDProps> & {
  TopRight: typeof TopRight;
  TopLeft: typeof TopLeft;
  BottomRight: typeof BottomRight;
  BottomLeft: typeof BottomLeft;
  TopMiddle: typeof TopMiddle;
  BottomMiddle: typeof BottomMiddle;
} = ({ children, scale = 1, pad = false }) => {
  const paddingClass = pad ? "p-3" : "";
  return (
    <ScaleContext.Provider value={scale}>
      <div
        className={`screen-container ${paddingClass} absolute top-0 right-0 pointer-events-none`}
      >
        <div className={`h-full relative`}>{children}</div>
      </div>
    </ScaleContext.Provider>
  );
};

HUD.TopRight = TopRight;
HUD.TopLeft = TopLeft;
HUD.BottomRight = BottomRight;
HUD.BottomLeft = BottomLeft;
HUD.TopMiddle = TopMiddle;
HUD.BottomMiddle = BottomMiddle;
