import { FC, ReactNode, createContext, memo, useContext, useEffect, useState } from "react";

interface HUDProps {
  children?: ReactNode;
  scale?: number;
  pad?: boolean;
}

interface HUDElementProps {
  children?: ReactNode;
  className?: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const ScaleContext = createContext<number | undefined>(undefined);

const useScale = () => {
  const scale = useContext(ScaleContext);
  if (scale === undefined) {
    throw new Error("useScale must be used within a ScaleProvider");
  }
  return scale;
};

const CursorFollower: FC<HUDElementProps> = ({ children, className }) => {
  const scale = useScale();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: mousePosition.x,
        top: mousePosition.y,
        transform: `scale(${scale})`,
        zIndex: 1001,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const TopRight: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "top right" }}
      className={`absolute top-0 right-0 ${className}`}
    >
      {children}
    </div>
  );
});

const TopLeft: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      className={`absolute top-0 left-0 ${className}`}
    >
      {children}
    </div>
  );
});

const BottomRight: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom right" }}
      className={`absolute bottom-0 right-0 ${className}`}
    >
      {children}
    </div>
  );
});

const BottomLeft: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom left" }}
      className={`absolute bottom-0 left-0 ${className}`}
    >
      {children}
    </div>
  );
});

const TopMiddle: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "top center",
      }}
      className={`absolute top-0 left-1/2 ${className}`}
    >
      {children}
    </div>
  );
});

const BottomMiddle: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: "bottom center",
      }}
      className={`absolute bottom-0 left-1/2 ${className}`}
    >
      {children}
    </div>
  );
});

const Left: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateY(50%) scale(${scale})`,
        transformOrigin: "left center",
      }}
      className={`absolute left-0 bottom-1/2 ${className}`}
    >
      {children}
    </div>
  );
});

const Right: FC<HUDElementProps> = memo(({ children, className }) => {
  const scale = useScale();
  return (
    <div
      style={{
        transform: `translateY(50%) scale(${scale})`,
        transformOrigin: "right center",
      }}
      className={`absolute right-0 bottom-1/2 ${className}`}
    >
      {children}
    </div>
  );
});

export const HUD: FC<HUDProps> & {
  CursorFollower: typeof CursorFollower;
  TopRight: typeof TopRight;
  TopLeft: typeof TopLeft;
  BottomRight: typeof BottomRight;
  BottomLeft: typeof BottomLeft;
  TopMiddle: typeof TopMiddle;
  BottomMiddle: typeof BottomMiddle;
  Left: typeof Left;
  Right: typeof Right;
} = ({ children, scale = 1, pad = false }) => {
  const paddingClass = pad ? "p-3" : "";
  return (
    <ScaleContext.Provider value={scale}>
      <div className={`screen-container ${paddingClass} fixed top-0 right-0 pointer-events-none`}>
        <div className={`h-full relative`}>{children}</div>
      </div>
    </ScaleContext.Provider>
  );
};

HUD.CursorFollower = CursorFollower;
HUD.TopRight = TopRight;
HUD.TopLeft = TopLeft;
HUD.BottomRight = BottomRight;
HUD.BottomLeft = BottomLeft;
HUD.TopMiddle = TopMiddle;
HUD.BottomMiddle = BottomMiddle;
HUD.Left = Left;
HUD.Right = Right;
