import { ReactNode, FC } from "react";

interface JoinProps {
  className?: string;
  direction?: "vertical" | "horizontal";
  children?: ReactNode;
}

export const Join: FC<JoinProps> = ({
  className,
  direction = "horizontal",
  children,
}) => {
  return (
    <div
      className={`join ${className} ${
        direction === "horizontal" ? "join-horizontal" : "join-vertical"
      }`}
    >
      {children}
    </div>
  );
};
