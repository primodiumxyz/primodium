import { Join } from "src/components/core/Join";
import { Tabs } from "src/components/core/Tabs";
import { Widget } from "src/components/core/Widget";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { Channel } from "./Channel";

export const Chat = () => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const playerAlliance = components.PlayerAlliance.use(playerEntity)?.alliance;

  return (
    <Widget
      id="chat"
      title="chat"
      icon="/img/icons/chaticon.png"
      defaultLocked
      lockable
      defaultVisible
      persist
      hotkey={"Chat"}
      draggable
      defaultCoord={{ x: 0, y: 0 }}
      scene={"UI"}
    >
      <Tabs defaultIndex={0}>
        <Join className="w-full border border-secondary/25 border-b-0">
          <Tabs.Button index={0} className="w-1/2 btn-xs">
            GENERAL
          </Tabs.Button>
          <Tabs.Button index={1} disabled={!playerAlliance} className="w-1/2 btn-xs">
            ALLIANCE
          </Tabs.Button>
        </Join>

        <Tabs.Pane index={0} fragment>
          <Channel channel="general" />
        </Tabs.Pane>
        {playerAlliance && (
          <Tabs.Pane index={1} fragment>
            <Channel channel={playerAlliance} />
          </Tabs.Pane>
        )}
      </Tabs>
    </Widget>
  );
};
