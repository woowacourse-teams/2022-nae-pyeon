import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";

import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";
import useCreateTeamRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateTeamRollingpaper";

import Step1 from "@/pages/RollingpaperCreationPage/components/Step1";
import Step2 from "@/pages/RollingpaperCreationPage/components/Step2";
import Step3 from "@/pages/RollingpaperCreationPage/components/Step3";

import { RECIPIENT } from "@/constants";
import { Recipient, Rollingpaper, Team, TeamMember } from "@/types";
import ProgressBar from "@/components/ProgressBar";

const StepLength = 3;

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
  const [searchParams] = useSearchParams();
  const selectedTeamId = searchParams.get("team-id");

  const [step, setStep] = useState<number>(selectedTeamId ? 1 : 0);
  const [selectedSteps, setSelectedSteps] = useState<Step>(
    selectedTeamId
      ? { ...initialSelectedSteps, step1: +selectedTeamId }
      : initialSelectedSteps
  );
  const pageRef = useRef<HTMLDivElement>(null);

  const { mutate: createMemberRollingpaper } = useCreateMemberRollingpaper();
  const { mutate: createTeamRollingpaper } = useCreateTeamRollingpaper();

  const changePage = () => {
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

  const goToNextPage = () => {
    if (step >= StepLength) {
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

  return (
    <StyledMain>
      <StyledSteps ref={pageRef}>
        {!selectedTeamId && (
          <Step1 onClick={handleStep1Click} selected={selectedSteps.step1} />
        )}
        <Step2
          teamId={selectedSteps.step1}
          onClick={handleStep2Click}
          selected={selectedSteps.step2?.type ?? null}
          setStep={setStep}
        />
        <Step3 onClick={handleStep3Click} />
      </StyledSteps>
      <StyledProgressBar>
        <ProgressBar step={step} total={StepLength} />
      </StyledProgressBar>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 100px);
`;

const StyledSteps = styled.div`
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledProgressBar = styled.div`
  align-self: center;

  width: 70%;

  padding: 20px 0;
`;

export default RollingpaperCreationPage;
