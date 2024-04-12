import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";
import { useMud } from "@/hooks";
import { components } from "@/network/components";
import { getRandomRange } from "@/util/common";
import { Modal } from "@/components/core/Modal";
import { Tooltip } from "@/components/core/Tooltip";
import { Widget } from "@/components/core/Widget";
import { AccountDisplay } from "@/components/shared/AccountDisplay";
import { Account } from "@/components/transfer/Account";
import { Score } from "@/components/hud/Score";
import { SpectatingDetails } from "@/components/hud/SpectatingDetails";

const ProfileContent = () => {
  const {
    playerAccount: { entity: playerEntity },
    sessionAccount,
  } = useMud();
  const sessionEntity = sessionAccount?.entity;

  return (
    <>
      <div className="flex gap-2 w-full items-center justify-center p-1.5 text-success text-md">
        <span className="text-white/50 text-xs">id:</span>
        <AccountDisplay player={playerEntity} />
        <Modal title="account">
          <Modal.Button className="btn-sm btn-neutral border-secondary !p-1 flex gap-2 text-accent text-xs w-fit">
            <Tooltip text={`${sessionEntity ? "" : "not"} authorizing`} direction="right">
              <div>
                {sessionEntity ? (
                  <FaHandshake className="text-success w-4 h-4" />
                ) : (
                  <FaHandshakeSlash className="text-error w-4 h-4" />
                )}
              </div>
            </Tooltip>
            <p>MANAGE</p>
          </Modal.Button>
          <Modal.Content className="w-[40rem] h-fit">
            <Account />
          </Modal.Content>
        </Modal>
      </div>

      <Score player={playerEntity} />
    </>
  );
};
export const Profile = () => {
  const isSpectating = components.ActiveRock.use()?.value !== components.BuildRock.use()?.value;

  return (
    <Widget
      id="account"
      title="account"
      icon="/img/icons/debugicon.png"
      defaultCoord={{
        x: window.innerWidth / 2 + getRandomRange(-50, 50),
        y: window.innerHeight / 2 + getRandomRange(-50, 50),
      }}
      hotkey={"Account"}
      scene={"UI"}
      minOpacity={0.5}
      defaultLocked
      defaultVisible
      lockable
      draggable
      persist
    >
      {isSpectating && <SpectatingDetails />}
      {!isSpectating && <ProfileContent />}
    </Widget>
  );
};
