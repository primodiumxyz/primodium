import { FaArrowRight } from "react-icons/fa";
import { components } from "src/network/components";
import { Action } from "src/util/constants";
import { HUD } from "../core/HUD";
import { BrandingLabel } from "../shared/BrandingLabel";
// import { GracePeriod } from "./GracePeriod";
// import { LoadingIndication } from "./LoadingIndication";
import { Profile } from "./Profile";
// import { PrototypeInfo } from "./PrototypeInfo";
import { useMud } from "src/hooks";
import { IconLabel } from "../core/IconLabel";
import { Modal } from "../core/Modal";
import { Tabs } from "../core/Tabs";
import { Blueprints } from "./Blueprints";
import { CurrentObjective } from "./CurrentObjective";
import { Minimap } from "./Minimap";
import { Score } from "./Score";
import { SelectAction } from "./SelectAction";
import { BuildingMenu } from "./building-menu/BuildingMenu";
import { Chat } from "./chat/Chat";
import { Leaderboard } from "./modals/leaderboard/Leaderboard";
import { Settings } from "./modals/settings/Settings";
import { ReinforcementFleets } from "./panes/FriendlyFleets";
import { OwnedMotherlodes } from "./panes/OwnedMotherlodes";
import { BattleReports } from "./panes/battle-reports/BattleReports";
import { HostileFleets } from "./panes/hostile-fleets/HostileFleets";
import { SpacerockMenu } from "./spacerock-menu/SpacerockMenu";

export const GameHUD = () => {
  const playerEntity = useMud().network.playerEntity;
  const activeRock = components.ActiveRock.use()?.value;
  const ownedBy = components.OwnedBy.use(activeRock ?? undefined)?.value;
  const isSpectating = ownedBy !== playerEntity;

  const mapOpen = components.MapOpen.use(undefined, {
    value: false,
  }).value;

  // const isSpectating = spectatingAccount !== playerEntity;

  return (
    <div className="screen-container font-mono">
      <HUD>
        <HUD.TopMiddle>
          <TopActions isSpectating={isSpectating} />
        </HUD.TopMiddle>

        {!isSpectating && (
          <HUD.TopLeft>
            <Profile />
          </HUD.TopLeft>
        )}

        {!isSpectating && <HUD.TopRight>{mapOpen ? <Minimap /> : <CurrentObjective />}</HUD.TopRight>}

        {!isSpectating && <HUD.Right>{mapOpen ? <Motherlodes /> : <BuildingSelection />}</HUD.Right>}

        <HUD.Left>
          <Tabs className="flex flex-row justify-center items-center gap-0" defaultIndex={-1}>
            <Tabs.Pane index={0} className="rounded-l-none border-l-0 z-10">
              <Chat />
            </Tabs.Pane>
            <Tabs.Button
              index={0}
              togglable
              className="rounded-l-none m-0 border-l-0 btn-md border-secondary relative py-4 hover:text-accent group"
            >
              <IconLabel imageUri="img/icons/chaticon.png" className="text-2xl" />
              <p
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "sideways",
                }}
                className=" absolute tracking-widest uppercase font-bold -rotate-180 left-0 bottom-full my-4 ml-2 opacity-75 bg-secondary/25 rounded-box backdrop-blur-md p-2 group-hover:ring-1"
              >
                chat
              </p>
            </Tabs.Button>
          </Tabs>
        </HUD.Left>

        <HUD.BottomMiddle>
          <SpacerockMenu />
        </HUD.BottomMiddle>
      </HUD>

      <HUD>
        <HUD.BottomRight>
          <BrandingLabel />
        </HUD.BottomRight>
      </HUD>
    </div>
  );
};

const BuildingSelection = () => {
  const selectedBuilding = components.SelectedBuilding.use()?.value;
  const action = components.SelectedAction.use()?.value;
  return (
    <>
      {(!selectedBuilding || action === Action.PlaceBuilding) && (
        <Tabs className="flex flex-row justify-center items-center gap-0">
          <Tabs.Button
            index={0}
            togglable
            onClick={() => {
              components.SelectedBuilding.remove();
              components.SelectedAction.remove();
            }}
            className="rounded-r-none m-0 border-r-0 btn-md border-warning relative py-4 hover:text-accent group"
          >
            <IconLabel imageUri="img/icons/minersicon.png" className="text-2xl" />
            <p
              style={{
                writingMode: "vertical-rl",
                textOrientation: "sideways",
              }}
              className=" absolute tracking-widest uppercase font-bold -rotate-180 right-0 bottom-full my-4 mr-2 opacity-75 bg-secondary/25 rounded-box backdrop-blur-md p-2 group-hover:ring-1"
            >
              blueprints
            </p>
          </Tabs.Button>

          <Tabs.Pane index={0} className="rounded-r-none border-r-0 z-10 overflow-y-visible relative">
            <Blueprints />
          </Tabs.Pane>
        </Tabs>
      )}
      {selectedBuilding && (!action || action === Action.MoveBuilding) && (
        <Tabs className="flex flex-row justify-center items-center gap-0">
          <Tabs.Button
            index={0}
            togglable
            onClick={() => components.SelectedBuilding.remove()}
            className="rounded-r-none m-0 border-r-0 btn-md border-accent relative hover:text-accent group"
          >
            <FaArrowRight />
          </Tabs.Button>

          <Tabs.Pane index={0} className="rounded-r-none border-r-0 z-10 overflow-y-visible">
            <BuildingMenu />
          </Tabs.Pane>
        </Tabs>
      )}
    </>
  );
};

const Motherlodes = () => {
  return (
    <Tabs className="flex flex-row justify-center items-center gap-0" defaultIndex={-1}>
      <Tabs.Button
        index={0}
        togglable
        className="rounded-r-none m-0 border-r-0 btn-md border-warning relative py-4 hover:text-accent group"
      >
        <IconLabel imageUri="img/icons/asteroidicon.png" className="text-2xl" />
        <p
          style={{
            writingMode: "vertical-rl",
            textOrientation: "sideways",
          }}
          className=" absolute tracking-widest uppercase font-bold -rotate-180 right-0 bottom-full my-4 mr-2 opacity-75 bg-secondary/25 rounded-box backdrop-blur-md p-2 group-hover:ring-1"
        >
          motherlodes
        </p>
      </Tabs.Button>
      <Tabs.Pane index={0} className="rounded-r-none border-r-0 z-10 h-[400px] w-[350px] overflow-x-hidden">
        <OwnedMotherlodes />
      </Tabs.Pane>
    </Tabs>
  );
};

const FleetsPane = () => (
  <Tabs className="flex flex-col items-center gap-2 w-full h-full">
    <div className="flex gap-1 w-full">
      <Tabs.Button index={0} showActive className="flex-1 btn-md hover:text-accent hover:bg-accent">
        Friendly
      </Tabs.Button>
      <Tabs.Button index={1} showActive className="flex-1 btn-md hover:text-accent hover:bg-accent">
        Hostile
      </Tabs.Button>
    </div>
    <Tabs.Pane index={0} className="rounded-r-none z-10 w-full h-full">
      <ReinforcementFleets />
    </Tabs.Pane>

    <Tabs.Pane index={1} className="rounded-r-none z-10 w-full h-full">
      <HostileFleets />
    </Tabs.Pane>
  </Tabs>
);

const TopActions: React.FC<{ isSpectating: boolean }> = ({ isSpectating }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex z-10">
        {
          <span className="flex flex-col gap-1 mt-1">
            <Modal title="leaderboard">
              <Modal.Button className="rounded-r-none border border-secondary btn-sm">
                <IconLabel
                  imageUri="/img/icons/leaderboardicon.png"
                  tooltipText="leaderboard"
                  tooltipDirection="left"
                />
              </Modal.Button>
              <Modal.Content className="w-[40rem] h-[50rem]">
                <Leaderboard />
              </Modal.Content>
            </Modal>
            <Modal title="battles">
              <Modal.Button className="rounded-r-none border border-secondary btn-sm">
                <IconLabel imageUri="/img/icons/reportsicon.png" tooltipText="battles" tooltipDirection="left" />
              </Modal.Button>
              <Modal.Content className="w-[30rem] h-[50rem]">
                <BattleReports />
              </Modal.Content>
            </Modal>
          </span>
        }
        <SelectAction isSpectating={isSpectating} />
        <span className="flex flex-col gap-1 mt-1">
          <Modal title="Fleets">
            <Modal.Button className="rounded-l-none border border-secondary btn-sm">
              <IconLabel imageUri="/img/icons/outgoingicon.png" tooltipText="Fleets" tooltipDirection="right" />
            </Modal.Button>
            <Modal.Content className="w-[50rem] h-[50rem]">
              <FleetsPane />
            </Modal.Content>
          </Modal>
          <Modal title="settings">
            <Modal.Button className="rounded-l-none border border-secondary btn-sm">
              <IconLabel imageUri="/img/icons/settingsicon.png" tooltipText="settings" tooltipDirection="right" />
            </Modal.Button>
            <Modal.Content className="w-132 h-96">
              <Settings />
            </Modal.Content>
          </Modal>
        </span>
      </div>
      {!isSpectating && <Score />}
    </div>
  );
};
