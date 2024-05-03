import { Button } from "@/components/core/Button";
import { RadioGroup } from "@/components/core/Radio";
// import { TextArea } from "@/components/core/TextArea";
import { Tooltip } from "@/components/core/Tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Navigator } from "src/components/core/Navigator";
import { TextInput } from "src/components/core/TextInput";
import { useMud } from "src/hooks";
import { createAlliance } from "src/network/setup/contractCalls/alliance";
import { isProfane } from "src/util/profanity";

const ALLIANCE_TAG_SIZE = 6;

export const CreateScreen = () => {
  const mud = useMud();
  const [inviteOnly, setInviteOnly] = useState(true);
  const [allianceTag, setAllianceTag] = useState("");

  // TODO: implement description when implemented in backend
  return (
    <Navigator.Screen
      title="create"
      className="flex flex-col w-full text-sm pointer-events-auto h-full py-6 px-20 gap-8"
    >
      <div className="self-center text-base">CREATE ALLIANCE</div>
      <div className="grid grid-cols-[min-content_1fr] gap-5 whitespace-nowrap">
        <div className="mt-1">ALLIANCE TAG</div>
        <Tooltip tooltipContent={`MAX ${ALLIANCE_TAG_SIZE} CHAR.`} direction="right">
          <TextInput
            placeholder=""
            maxLength={ALLIANCE_TAG_SIZE}
            onChange={(e) => setAllianceTag(e.target.value)}
            className="w-48 uppercase h-8 text-sm"
          />
        </Tooltip>
        {/* <div className="mt-1">DESCRIPTION</div>
        <TextArea placeholder="" className="min-h-20 text-sm" /> */}
        <div className="self-start mt-[10px]">RESTRICTION</div>
        <RadioGroup
          name="create-alliance-restriction"
          value={inviteOnly ? "closed" : "open"}
          options={[
            { id: "open", label: "OPEN" },
            { id: "closed", label: "CLOSED", bottomLabel: "BY INVITATION ONLY" },
          ]}
          onChange={(value) => setInviteOnly(value === "closed")}
        />
      </div>

      <Button
        disabled={!allianceTag || isProfane(allianceTag)}
        onClick={() => createAlliance(mud, allianceTag, inviteOnly)}
        variant="primary"
        className="btn-sm border-2 border-secondary mt-auto self-center flex gap-2"
      >
        <FaPlus />
        CREATE
      </Button>
    </Navigator.Screen>
  );
};
