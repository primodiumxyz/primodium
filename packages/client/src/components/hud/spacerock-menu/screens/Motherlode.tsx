import { Navigator } from "src/components/core/Navigator";
import { Header } from "../widgets/Header";
import { getSpaceRockInfo } from "src/util/spacerock";
import { Invade } from "../widgets/Invade";
import { Reinforce } from "../widgets/Reinforce";
import { StationedUnits } from "../widgets/StationedUnits";
import { Land } from "../widgets/Land";

export const Motherlode: React.FC<{
  data: ReturnType<typeof getSpaceRockInfo>;
}> = ({ data }) => {
  return (
    <Navigator.Screen title={data.entity} className="w-full">
      <Header name={data.name} imageUri={data.imageUri} />
      <div className="grid grid-cols-2 w-full">
        <Invade />
        <Reinforce />
      </div>
      <StationedUnits />
      <Land destination={data.entity} rockType={data.type} />
    </Navigator.Screen>
  );
};
