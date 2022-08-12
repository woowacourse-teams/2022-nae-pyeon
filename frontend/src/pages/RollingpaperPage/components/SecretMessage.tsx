import React from "react";
import styled from "@emotion/styled";

interface SecretMessageProp {
  author: string;
}

const SecretMessage = ({ author }: SecretMessageProp) => {
  return (
    <StyledSecretMessageContainer>
      <StyledContent>
        <StyledGuideTextTitle>🔒 비밀글입니다.</StyledGuideTextTitle>
        <StyledGuideText>
          작성자와 받은 사람만 확인할 수 있어요.
        </StyledGuideText>
      </StyledContent>
      <StyledMessageAuthor>{author}</StyledMessageAuthor>
    </StyledSecretMessageContainer>
  );
};

const StyledSecretMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;

  width: 100%;
  aspect-ratio: 1;
  min-width: 180px;
  padding: 20px 20px 12px;

  color: ${({ theme }) => theme.colors.GRAY_700};
  background-color: ${({ theme }) => theme.colors.GRAY_300};
`;

const StyledContent = styled.div`
  padding: 100px 0;
`;
const StyledGuideText = styled.div`
  font-size: 14px;
`;

const StyledGuideTextTitle = styled.h3`
  margin-bottom: 10px;
`;

const StyledMessageAuthor = styled.div`
  width: 50%;
  text-align: right;
  margin-left: auto;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export default SecretMessage;
