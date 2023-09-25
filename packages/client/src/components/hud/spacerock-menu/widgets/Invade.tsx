import { FaArrowRight } from "react-icons/fa";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { Send } from "src/network/components/clientComponents";
import { ESendType } from "src/util/web3/types";

export const Invade: React.FC = () => {
  return (
    <SecondaryCard className="w-full flex-row items-center gap-2 justify-between">
      <img src="/img/icons/attackicon.png" className="w-8 h-8" />
      <p className="uppercase text-xs font-bold">invade motherlode.</p>
      <Navigator.NavButton
        to="Send"
        className="btn-sm w-fit btn-error"
        onClick={() => Send.update({ sendType: ESendType.INVADE })}
      >
        <FaArrowRight />
      </Navigator.NavButton>
    </SecondaryCard>
  );
};
