import styled from "@emotion/styled";

import useSteps from "@/pages/RollingpaperCreationPage/hooks/useSteps";

import ProgressBar from "@/components/ProgressBar";
import Step1 from "@/pages/RollingpaperCreationPage/components/Step1";
import Step2 from "@/pages/RollingpaperCreationPage/components/Step2";
import Step3 from "@/pages/RollingpaperCreationPage/components/Step3";

const RollingpaperCreationPage = () => {
  const {
    pageRef,
    rollingpaperCreateForm,
    step,
    selectedTeamId,
    handleTeamClick,
    handleRecipientClick,
    handleMemberClick,
    handleTitleChange,
    handleRollingpaperCreateSubmit,
  } = useSteps();

  return (
    <StyledMain>
      <StyledSteps ref={pageRef}>
        {!selectedTeamId && (
          <Step1
            onSelectTeam={handleTeamClick}
            selected={rollingpaperCreateForm.team}
          />
        )}
        <Step2
          teamId={rollingpaperCreateForm.team}
          onSelectRecipient={handleRecipientClick}
          onSelectMember={handleMemberClick}
          selected={rollingpaperCreateForm.recipient?.type ?? null}
        />
        <Step3
          onChangeTitle={handleTitleChange}
          onSubmitRollingpaperCreate={handleRollingpaperCreateSubmit}
        />
      </StyledSteps>
      <StyledProgressBar>
        <ProgressBar
          step={step}
          total={Object.keys(rollingpaperCreateForm).length}
        />
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
