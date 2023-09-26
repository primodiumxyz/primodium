import { SingletonID } from "@latticexyz/network";
import { Account, HomeAsteroid } from "src/network/components/clientComponents";
import { Join } from "../../core/Join";
import { Tabs } from "../../core/Tabs";
import { BattleReports } from "./battle-reports/BattleReports";
import { HostileFleets } from "./hostile-fleets/HostileFleets";
import { Leaderboard } from "./Leaderboard";
import { Settings } from "./Settings";
import { Divider } from "src/components/core/Divider";
import { Outgoingfleets } from "./OutgoingFleets";
import { Reinforcementfleets } from "./ReinforcementFleet";
import { OwnedMotherlodes } from "./OwnedMotherlodes";

export const Panes: React.FC = () => {
  const playerAstroid = HomeAsteroid.use()?.value;
  const player = Account.use()?.value;

  return (
    <Tabs className="flex gap-2" defaultIndex={-1}>
      <Tabs.Pane index={0} className="w-96">
        <Outgoingfleets user={player ?? SingletonID} />
      </Tabs.Pane>
      <Tabs.Pane index={1} className="w-96">
        <Reinforcementfleets user={player ?? SingletonID} />
      </Tabs.Pane>
      <Tabs.Pane index={2} className="w-96">
        <HostileFleets spacerock={playerAstroid ?? SingletonID} />
      </Tabs.Pane>
      <Tabs.Pane index={3} className="w-96">
        <BattleReports />
      </Tabs.Pane>
      <Tabs.Pane index={5} className="w-96">
        <OwnedMotherlodes />
      </Tabs.Pane>
      <Tabs.Pane index={6} className="w-96">
        <Leaderboard />
      </Tabs.Pane>
      <Tabs.Pane index={7} className="w-96">
        <Settings />
      </Tabs.Pane>
      <div className="flex flex-col gap-2">
        <div>
          <Join direction="vertical" className="z-10 border-secondary">
            <Tabs.IconButton
              index={0}
              imageUri="/img/icons/outgoingicon.png"
              text="Outgoing Fleets"
              hideText
              tooltipText="Outgoing Fleets"
              tooltipDirection="left"
            />
            <Tabs.IconButton
              index={1}
              imageUri="/img/icons/reinforcementicon.png"
              text="Reinforcements"
              hideText
              tooltipText="Reinforcements"
              tooltipDirection="left"
            />
            <Tabs.IconButton
              index={2}
              imageUri="/img/icons/attackicon.png"
              hideText
              text="Attacking Fleets"
              tooltipText="Attacking Fleets"
              tooltipDirection="left"
            />
            <Tabs.IconButton
              index={3}
              imageUri="/img/icons/reportsicon.png"
              hideText
              text="Battle Reports"
              tooltipDirection="left"
              tooltipText="Battle Reports"
            />
          </Join>
        </div>

        <Divider />
        <Join direction="vertical" className="z-10 border-secondary">
          <Tabs.IconButton
            index={4}
            imageUri="/img/icons/objectiveicon.png"
            hideText
            text="Objectives"
            tooltipText="Objectives"
            tooltipDirection="left"
          />
          <Tabs.IconButton
            index={5}
            imageUri="/img/icons/asteroidicon.png"
            text="Owned Asteroids"
            hideText
            tooltipDirection="left"
            tooltipText="Owned Motherlodes"
          />
          <Tabs.IconButton
            index={6}
            imageUri="/img/icons/leaderboardicon.png"
            hideText
            text="Leaderboard"
            tooltipText="Leaderboard"
            tooltipDirection="left"
          />
          <Tabs.IconButton
            index={7}
            imageUri="/img/icons/settingsicon.png"
            hideText
            text="Settings"
            tooltipText="Settings"
            tooltipDirection="left"
          />
        </Join>
      </div>
    </Tabs>
  );
};
