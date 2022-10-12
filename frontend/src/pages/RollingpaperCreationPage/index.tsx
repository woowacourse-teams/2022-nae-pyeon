import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

import ControlDots from "@/components/ControlDots";

import useCreateMemberRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateMemberRolliingpaper";
import useCreateTeamRollingpaper from "@/pages/RollingpaperCreationPage/hooks/useCreateTeamRollingpaper";

import Step1 from "@/pages/RollingpaperCreationPage/components/Step1";
import Step2 from "@/pages/RollingpaperCreationPage/components/Step2";
import Step3 from "@/pages/RollingpaperCreationPage/components/Step3";

import { Recipient, Rollingpaper, Team, TeamMember } from "@/types";
import { RECIPIENT } from "@/constants";

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

  const [step, setStep] = useState<number>(0);
  const [selectedSteps, setSelectedSteps] = useState<Step>(
    selectedTeamId
      ? { ...initialSelectedSteps, step1: +selectedTeamId }
      : initialSelectedSteps
  );
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

    setStep((prev) => {
      const target = prev + 1;
      changePage(target);
      return target;
    });
  };

  const goToPrevPage = () => {
    if (step < 0) {
      return;
    }

    setStep((prev) => {
      const target = prev - 1;
      changePage(target);
      return target;
    });
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

  const validateMoveNextStep = () => {
    if (step === 0) {
      return !!selectedSteps["step1"];
    }
    if (step === 1) {
      return !!selectedSteps["step2"]?.type;
    }

    return false;
  };

  const handleRightButtonClick = () => {
    if (!validateMoveNextStep()) {
      return;
    }

    goToNextPage();
  };

  const handleLeftButtonClick = () => {
    if (step === 1) {
      setSelectedSteps((prev) => ({
        ...prev,
        step2: initialSelectedSteps["step2"],
      }));
    }
    if (step === 2) {
      setSelectedSteps((prev) => ({
        ...prev,
        step3: initialSelectedSteps["step3"],
      }));
    }

    goToPrevPage();
  };

  return (
    <StyledMain>
      <StyledStepsWithMoveButton>
        <StyledSteps>
          <Step1
            ref={(el: HTMLDivElement) => (pageRef.current[0] = el)}
            onClick={handleStep1Click}
            selected={selectedSteps.step1}
          />
          <Step2
            ref={(el: HTMLDivElement) => (pageRef.current[1] = el)}
            teamId={selectedSteps.step1}
            onClick={handleStep2Click}
            selected={selectedSteps.step2?.type ?? null}
          />
          <Step3
            ref={(el: HTMLDivElement) => (pageRef.current[2] = el)}
            onClick={handleStep3Click}
          />
        </StyledSteps>
      </StyledStepsWithMoveButton>
      <ControlDots pages={StepLength} step={step} />
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 90px);
`;

const StyledStepsWithMoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px 0 20px;

  button {
    &:disabled {
      svg {
        pointer-events: none;
        fill: ${({ theme }) => theme.colors.GRAY_300};
      }
    }

    svg {
      font-size: 30px;
      fill: ${({ theme }) => theme.colors.SKY_BLUE_200};

      &:hover {
        fill: ${({ theme }) => theme.colors.SKY_BLUE_400};
      }
    }
  }
`;

const StyledSteps = styled.div`
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledSpace = styled.div`
  width: 30px;
`;

export default RollingpaperCreationPage;
