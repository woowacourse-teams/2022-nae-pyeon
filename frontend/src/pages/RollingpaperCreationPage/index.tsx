import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

import { Recipient, Rollingpaper, Team, TeamMember } from "@/types";
import { RECIPIENT } from "@/constants";
import useCreateMemberRollingpaper from "./hooks/useCreateMemberRolliingpaper";
import useCreateTeamRollingpaper from "./hooks/useCreateTeamRollingpaper";

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

const RollingpaperCreationPage = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedSteps, setSelectedSteps] =
    useState<Step>(initialSelectedSteps);
  const pageRef = useRef<HTMLDivElement[]>([]);

  const createMemberRollingpaper = useCreateMemberRollingpaper();
  const createTeamRollingpaper = useCreateTeamRollingpaper();

  const changePage = (page: number) => {
    pageRef.current[page]?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const goToNextPage = () => {
    if (step >= pageRef.current.length) {
      endSteps();
      return;
    }

    setStep((prev) => prev + 1);
    changePage(step);
  };

  const endSteps = () => {
    const { step1: teamId, step2: recipient, step3: title } = selectedSteps;

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
    setSelectedSteps((prev) => ({
      ...prev,
      step3: title,
    }));

    goToNextPage();
  };

  return (
    <StyledMain>
      <Step1
        ref={(el: HTMLDivElement) => (pageRef.current[0] = el)}
        onClick={handleStep1Click}
      />
      <Step2
        ref={(el: HTMLDivElement) => (pageRef.current[1] = el)}
        teamId={selectedSteps.step1}
        onClick={handleStep2Click}
      />
      <Step3
        ref={(el: HTMLDivElement) => (pageRef.current[2] = el)}
        onClick={handleStep3Click}
      />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;

  overflow: hidden;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default RollingpaperCreationPage;
