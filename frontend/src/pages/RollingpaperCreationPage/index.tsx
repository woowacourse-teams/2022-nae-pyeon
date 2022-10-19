import styled from "@emotion/styled";

import useSteps from "@/pages/RollingpaperCreationPage/hooks/useSteps";

import ProgressBar from "@/components/ProgressBar";
import Step1 from "@/pages/RollingpaperCreationPage/components/Step1";
import Step2 from "@/pages/RollingpaperCreationPage/components/Step2";
import Step3 from "@/pages/RollingpaperCreationPage/components/Step3";

const RollingpaperCreationPage = () => {
  const {
    pageRef,
    selectedSteps,
    step,
    selectedTeamId,
    setStep,
    handleStep1Click,
    handleStep2Click,
    handleStep3Click,
  } = useSteps();

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
        <ProgressBar step={step} total={Object.keys(selectedSteps).length} />
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

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const StyledProgressBar = styled.div`
  align-self: center;

  width: 70%;

  padding: 20px 0;
`;

export default RollingpaperCreationPage;
