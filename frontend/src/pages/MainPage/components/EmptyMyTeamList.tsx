import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import LineButton from "@/components/LineButton";

const EmptyState = () => {
  const navigate = useNavigate();

  const handleJoinTeamButtonClick = () => {
    navigate("/search");
  };

  const handleCreateTeamButtonClick = () => {
    navigate("/team/new");
  };

  return (
    <StyledEmptyCardList>
      <StyledMessage>아직 참여한 모임이 없어요!</StyledMessage>
      <LineButton onClick={handleJoinTeamButtonClick}>
        참가할 모임 찾기
      </LineButton>
      <LineButton onClick={handleCreateTeamButtonClick}>
        새 모임 만들기
      </LineButton>
    </StyledEmptyCardList>
  );
};

const StyledEmptyCardList = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;

  gap: 8px;

  @media only screen and (min-width: 600px) {
    height: 210px;
  }

  @media only screen and (min-width: 600px) {
    height: 250px;
  }

  @media only screen and (min-width: 960px) {
    height: 290px;
  }
`;

const StyledMessage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_400};

  margin-bottom: 20px;
`;

export default EmptyState;
