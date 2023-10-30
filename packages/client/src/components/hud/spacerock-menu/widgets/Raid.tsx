import { singletonEntity } from "@latticexyz/store-sync/recs";
import { ESendType } from "contracts/config/enums";
import { FaArrowRight } from "react-icons/fa";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { useMud } from "src/hooks";
import { useFleetMoves } from "src/hooks/useFleetMoves";
import { components } from "src/network/components";

export const Raid: React.FC = () => {
  const playerEntity = useMud().network.playerEntity;
  const origin = components.Send.get()?.origin;
  const destination = components.Send.get()?.destination;
  const units = components.Hangar.use(origin, {
    units: [],
    counts: [],
  }).units;
  const ownedBy = components.OwnedBy.get(destination, {
    value: singletonEntity,
  }).value;

  const fleetMoves = useFleetMoves();

  return (
    <SecondaryCard
      className={`w-full flex-row items-center gap-2 justify-between ${
        units.length === 0 || ownedBy === playerEntity || !fleetMoves ? "opacity-20" : "0"
      }`}
    >
      <img src="/img/icons/attackicon.png" className="w-8 h-8" />
      <p className="uppercase text-xs font-bold">raid</p>
      <Navigator.NavButton
        to="Send"
        className="btn-sm w-fit btn-error"
        disabled={units.length === 0 || ownedBy === playerEntity || !fleetMoves}
        onClick={() => components.Send.update({ sendType: ESendType.Raid })}
      >
        <FaArrowRight />
      </Navigator.NavButton>
    </SecondaryCard>
  );
};
