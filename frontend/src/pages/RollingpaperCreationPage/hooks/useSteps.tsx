import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";
import useCreateTeamRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateTeamRollingpaper";

import { RECIPIENT } from "@/constants";
import { Recipient, Rollingpaper, Team, TeamMember } from "@/types";

interface Step {
  step1: Team["id"] | null;
  step2: { type: Recipient | null; to: TeamMember["id"] | null } | null;
  step3: Rollingpaper["title"] | null;
}

const initialSelectedSteps = {
  step1: null,
  step2: { type: null, to: null },
  step3: null,
};

const useSteps = () => {
  const [searchParams] = useSearchParams();
  const selectedTeamId = searchParams.get("team-id");
  const [selectedSteps, setSelectedSteps] = useState<Step>(
    selectedTeamId
      ? { ...initialSelectedSteps, step1: +selectedTeamId }
      : initialSelectedSteps
  );
  const [step, setStep] = useState<number>(selectedTeamId ? 1 : 0);
  const pageRef = useRef<HTMLDivElement>(null);

  const { mutate: createMemberRollingpaper } = useCreateMemberRollingpaper();
  const { mutate: createTeamRollingpaper } = useCreateTeamRollingpaper();

  const changePage = () => {
    const width = window.innerWidth;
    let left = width;

    console.log(step);
    if (width >= 1280) {
      left = 1020;
    } else if (width >= 960) {
      left = 760;
    } else if (width >= 600) {
      left = 500;
    }

    pageRef.current?.scrollBy({ top: 0, left: left - 48, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (step >= Object.keys(selectedSteps).length) {
      endSteps(selectedSteps);
      return;
    }

    setStep((prev) => {
      changePage();
      return prev + 1;
    });
  };

  const endSteps = (result: Step) => {
    const { step1: teamId, step2: recipient, step3: title } = result;

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

  const handleStep1Click = (id: Team["id"]) => {
    setSelectedSteps((prev) => ({
      ...prev,
      step1: id,
    }));

    goToNextPage();
  };

  const handleStep2Click = (recipient: Recipient, to?: TeamMember["id"]) => {
    setSelectedSteps((prev) => ({
      ...prev,
      step2: {
        type: recipient,
        to: to ? to : null,
      },
    }));

    goToNextPage();
  };

  const handleStep3Click = (title: Rollingpaper["title"]) => {
    setSelectedSteps((prev) => {
      const result = {
        ...prev,
        step3: title,
      };
      endSteps(result);
      return result;
    });

    goToNextPage();
  };

  return {
    pageRef,
    selectedSteps,
    step,
    selectedTeamId,
    setStep,
    handleStep1Click,
    handleStep2Click,
    handleStep3Click,
  };
};

export default useSteps;
