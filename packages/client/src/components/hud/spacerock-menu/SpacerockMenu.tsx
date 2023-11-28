import { singletonEntity } from "@latticexyz/store-sync/recs";
import { ERock } from "contracts/config/enums";
import { useEffect } from "react";
import { Button } from "src/components/core/Button";
import { Navigator } from "src/components/core/Navigator";
import { useMud } from "src/hooks";
import { components } from "src/network/components";

import { Card } from "src/components/core/Card";
import { Resources } from "./widgets/resources/Resources";
import { getSpaceRockImage, getSpaceRockName } from "src/util/spacerock";
import { IconLabel } from "src/components/core/IconLabel";
import { Tabs } from "src/components/core/Tabs";
import { FaCaretUp } from "react-icons/fa";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { Entity } from "@latticexyz/recs";
import { GracePeriod } from "../GracePeriod";

export const SpacerockMenu: React.FC = () => {
  const playerEntity = useMud().network.playerEntity;
  const selectedSpacerock = components.SelectedRock.use()?.value;
  const ownedBy = components.OwnedBy.use(selectedSpacerock ?? singletonEntity)?.value ?? playerEntity;
  const img = getSpaceRockImage(selectedSpacerock ?? singletonEntity);
  const name = getSpaceRockName(selectedSpacerock ?? singletonEntity);

  return (
    <div className="w-screen px-2 flex justify-center">
      <Tabs className="w-fit flex flex-col items-center gap-0">
        <Tabs.Button
          index={0}
          togglable
          onClick={() => {
            components.SelectedBuilding.remove();
            components.SelectedAction.remove();
          }}
          className="rounded-b-none border-b-0 btn-md border-secondary relative py-2 hover:text-accent group w-fit"
        >
          {/* <FaCaretUp size={22} className="text-accent absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full" /> */}
          <IconLabel imageUri={img} className="" text={name} />
        </Tabs.Button>
        <Tabs.Pane index={0} className="w-full border-b-0 rounded-x-none rounded-b-none relative">
          <Resources />
          <AccountDisplay
            player={ownedBy as Entity}
            className="absolute right-6 text-xs bg-base-100 p-2 rounded-box rounded-t-none"
          />
          <GracePeriod
            player={ownedBy as Entity}
            className="absolute left-6 text-xs p-2 bg-base-100 rounded-box rounded-t-none"
          />
        </Tabs.Pane>
      </Tabs>
    </div>
  );
};
