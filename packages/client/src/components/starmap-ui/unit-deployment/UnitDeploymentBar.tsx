import { useState } from "react";
import { HangarPane } from "./HangarPane";
import { FleetPane } from "./FleetPane";
import { AnimatePresence } from "framer-motion";

export const UnitDeploymentBar: React.FC = () => {
  const [showHangar, setShowHangar] = useState(false);

  return (
    <div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen pointer-events-auto flex items-center justify-center px-4">
        <AnimatePresence>
          <FleetPane key="fleet" setShowHangar={setShowHangar} />
        </AnimatePresence>
      </div>
      <div className="absolute top-0 right-0 pointer-events-auto">
        <AnimatePresence>
          <HangarPane key="hanger" show={showHangar} setShow={setShowHangar} />
        </AnimatePresence>
      </div>
    </div>
  );
};
