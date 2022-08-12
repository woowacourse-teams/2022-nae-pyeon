import React from "react";
import styled from "@emotion/styled";

const SecretMessage = () => {
  return (
    <StyledSecretMessageContainer>
      <StyledGuideTextTitle>🔒 비밀글입니다.</StyledGuideTextTitle>
      <StyledGuideText>작성자와 받은 사람만 확인할 수 있어요.</StyledGuideText>
    </StyledSecretMessageContainer>
  );
};

const StyledSecretMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  width: 100%;
  aspect-ratio: 1;
  min-width: 180px;
  padding: 20px 20px 12px;

  color: ${({ theme }) => theme.colors.GRAY_700};
  background-color: ${({ theme }) => theme.colors.GRAY_300};
`;

const StyledGuideText = styled.div`
  font-size: 14px;
`;

const StyledGuideTextTitle = styled.h3`
  margin-bottom: 10px;
`;

export default SecretMessage;
