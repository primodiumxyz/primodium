import { ReactNode, createContext } from "react";
import { Game } from "src/network/types";

export const MudContext = createContext<Game | null>(null);

type Props = Game & {
  children: ReactNode;
};

export const MudProvider = ({ children, ...value }: Props) => {
  return <MudContext.Provider value={value}>{children}</MudContext.Provider>;
};
