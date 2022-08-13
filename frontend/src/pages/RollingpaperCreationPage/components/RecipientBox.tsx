import React from "react";
import styled from "@emotion/styled";

import { RecipientType } from "@/pages/RollingpaperCreationPage/index";

const boxInput = {
  team: {
    to: "모임",
    description: "모임을 대상으로 한 롤링페이퍼 작성하기",
  },
  member: {
    to: "개인",
    description: "모임 내의 멤버에게 롤링페이퍼 작성하기",
  },
};

interface RecipientBoxProps {
  type: RecipientType;
  onClick: VoidFunction;
}

interface StyledRecipientBoxProps {
  type: RecipientType;
}

export const RecipientBox = ({ type, onClick }: RecipientBoxProps) => {
  const { to, description } = boxInput[type];

  return (
    <StyledRecipientBox type={type} onClick={onClick}>
      <StyledTo>{to}</StyledTo>
      <StyledDescription>{description}</StyledDescription>
    </StyledRecipientBox>
  );
};

const StyledRecipientBox = styled.div<StyledRecipientBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 160px;
  height: 190px;

  padding: 10px;

  background-color: ${({ theme, type }) =>
    type === "team" ? theme.colors.YELLOW_200 : theme.colors.LIGHT_GREEN_200};

  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme, type }) =>
      type === "team" ? theme.colors.YELLOW_300 : theme.colors.LIGHT_GREEN_300};
  }
`;

const StyledTo = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const StyledDescription = styled.div`
  font-size: 16px;
  text-align: center;
`;
