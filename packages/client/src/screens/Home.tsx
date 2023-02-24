import InfoBox from "../components/InfoBox";
import ResourceBox from "../components/ResourceBox";
import SideMenu from "../components/SideMenu";
import TooltipBox from "../components/TooltipBox";

import LeafletMap from "./LeafletMap";

export default function Home() {
  return (
    <>
      <div className="leaflet-container">
        <LeafletMap />
      </div>
      <InfoBox />
      <ResourceBox />
      <SideMenu />
      <TooltipBox />
    </>
  );
}
