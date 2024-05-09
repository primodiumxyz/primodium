import { GlassCard } from "@/components/core/Card";
import { IconLabel } from "@/components/core/IconLabel";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { components } from "@/network/components";
import { Mode } from "@/util/constants";
import { Modal } from "@/components/core/Modal";
import { UnitUpgrades } from "@/components/hud/asteroid/building-menu/screens/UnitUpgrades";
import { Tabs } from "@/components/core/Tabs";
import { usePrimodium } from "@/hooks/usePrimodium";
import { commandCenterScene } from "@/game/lib/config/commandCenterScene";

const btnClass = "group hover:scale-[115%] bg-gradient-to-r border-l-accent from-secondary/25 to-transparent";
const iconClass = "text-2xl";

export const CommandViewSelector = () => {
  const commandOpen = components.SelectedMode.use()?.value === Mode.CommandCenter;

  const { camera } = usePrimodium().api("COMMAND_CENTER")!;
  if (!commandOpen) return null;

  return (
    <GlassCard direction={"right"} className="h-fit w-12 px-5 animate-in slide-in-from-left-full fade-in">
      <div className="flex flex-col gap-2 items-center pointer-events-auto translate-x-[10px]">
        {/* Overview */}
        <Tabs.Button
          index={0}
          togglable
          className={btnClass}
          shape={"square"}
          size={"lg"}
          tooltip="Overview"
          tooltipDirection="right"
          onClick={() => camera.zoomTo(commandCenterScene.camera.defaultZoom)}
        >
          <IconLabel imageUri={InterfaceIcons.Asteroid} className={iconClass} />
        </Tabs.Button>
        <Tabs.Button
          index={1}
          className={btnClass}
          shape={"square"}
          size={"lg"}
          tooltip="Current Activities"
          tooltipDirection="right"
          onClick={() => camera.zoomTo(commandCenterScene.camera.defaultZoom)}
        >
          <IconLabel imageUri={InterfaceIcons.Fleet} className={iconClass} />
        </Tabs.Button>
        {/* Transfer */}
        <Tabs.Button
          index={2}
          className={btnClass}
          shape={"square"}
          size={"lg"}
          tooltip="Transfer Inventory"
          tooltipDirection="right"
          onClick={() => camera.zoomTo(1)}
        >
          <IconLabel imageUri={InterfaceIcons.Transfer} className={iconClass} />
        </Tabs.Button>
        <Modal title="Upgrade">
          <Modal.Button
            className={btnClass}
            tooltip="upgrade"
            shape={"square"}
            size={"lg"}
            tooltipDirection="right"
            onClick={() => camera.zoomTo(commandCenterScene.camera.defaultZoom)}
          >
            <IconLabel className={iconClass} imageUri={InterfaceIcons.Add} />
          </Modal.Button>
          <Modal.Content className="w-[62rem]">
            <UnitUpgrades />
          </Modal.Content>
        </Modal>
      </div>
    </GlassCard>
  );
};
