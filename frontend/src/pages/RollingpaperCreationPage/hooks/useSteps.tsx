import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";
import useCreateTeamRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateTeamRollingpaper";

import { RECIPIENT, REGEX } from "@/constants";

import { Recipient, Rollingpaper, Team, TeamMember } from "@/types";

interface RollingpaperCreateForm {
  team: Team["id"] | null;
  recipient: { type: Recipient | null; to: TeamMember["id"] | null } | null;
  title: Rollingpaper["title"] | null;
}

const initialRollingpaperCreateForm = {
  team: null,
  recipient: { type: null, to: null },
  title: null,
};

const useSteps = () => {
  const [searchParams] = useSearchParams();
  const selectedTeamId = searchParams.get("team-id");
  const [rollingpaperCreateForm, setRollingpaperCreateForm] =
    useState<RollingpaperCreateForm>(
      selectedTeamId
        ? { ...initialRollingpaperCreateForm, team: +selectedTeamId }
        : initialRollingpaperCreateForm
    );
  const [step, setStep] = useState<number>(selectedTeamId ? 1 : 0);
  const pageRef = useRef<HTMLDivElement>(null);

  const { mutate: createMemberRollingpaper } = useCreateMemberRollingpaper();
  const { mutate: createTeamRollingpaper } = useCreateTeamRollingpaper();

  const goToNextPage = () => {
    const width = window.innerWidth;
    let left = width;

    if (width >= 1280) {
      left = 1020;
    } else if (width >= 960) {
      left = 760;
    } else if (width >= 600) {
      left = 500;
    }

    pageRef.current?.scrollBy({ top: 0, left: left - 48, behavior: "smooth" });
  };

  const handleRollingpaperCreateSubmit = () => {
    const { team: teamId, recipient, title } = rollingpaperCreateForm;

    if (!teamId || !recipient || !title) {
      return;
    }

    if (recipient.type === RECIPIENT.MEMBER) {
      const { to } = recipient;
      if (!to) {
        return;
      }

      createMemberRollingpaper({ teamId, title, addresseeId: to });
      return;
    }

    createTeamRollingpaper({ teamId, title });
  };

  const handleTeamClick = (id: Team["id"]) => {
    if (step < 1) {
      setStep((prev) => prev + 1);
    }
    setRollingpaperCreateForm((prev) => ({
      ...prev,
      team: id,
    }));

    goToNextPage();
  };

  const handleRecipientClick = (recipientType: Recipient) => {
    if (step < 1.5) {
      setStep((prev) => prev + 0.5);
    }
    setRollingpaperCreateForm((prev) => ({
      ...prev,
      recipient: { type: recipientType, to: null },
    }));

    if (recipientType === RECIPIENT.TEAM) {
      if (step < 1.5) {
        setStep((prev) => prev + 0.5);
      }

      goToNextPage();
    }
  };

  const handleMemberClick = (memberId: TeamMember["id"]) => {
    if (step < 2) {
      setStep((prev) => prev + 0.5);
    }
    setRollingpaperCreateForm((prev) => ({
      ...prev,
      recipient: { type: RECIPIENT.MEMBER, to: memberId },
    }));

    goToNextPage();
  };

  const handleTitleChange = (title: Rollingpaper["title"]) => {
    if (!REGEX.ROLLINGPAPER_TITLE.test(title)) {
      setStep(2);
      return;
    }

    if (step < Object.keys(rollingpaperCreateForm).length) {
      setStep((prev) => prev + 1);
    }

    setRollingpaperCreateForm((prev) => ({
      ...prev,
      title: title,
    }));
  };

  return {
    pageRef,
    rollingpaperCreateForm,
    step,
    selectedTeamId,
    handleTeamClick,
    handleRecipientClick,
    handleMemberClick,
    handleTitleChange,
    handleRollingpaperCreateSubmit,
  };
};

export default useSteps;
