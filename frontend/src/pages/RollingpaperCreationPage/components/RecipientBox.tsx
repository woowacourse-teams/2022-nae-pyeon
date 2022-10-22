import React from "react";
import styled from "@emotion/styled";

import { RECIPIENT } from "@/constants";

import { Recipient } from "@/types";

const CONTENTS = {
  [RECIPIENT.TEAM]: {
    to: "👨‍👦‍👦 모임",
    description: "모임 친구들과 다같이 공유하는 롤링페이퍼",
  },
  [RECIPIENT.MEMBER]: {
    to: "🙋‍♂️ 멤버",
    description: "모임 친구 한명에게 쓰는 롤링페이퍼",
  },
};

interface RecipientBoxProps {
  type: Recipient;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

interface StyledRecipientBoxProps {
  type: Recipient;
  selected: boolean;
}

const RecipientBox = ({ type, onClick, selected }: RecipientBoxProps) => {
  const { to, description } = CONTENTS[type];

  return (
    <StyledRecipientBox type={type} onClick={onClick} selected={selected}>
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
    type === RECIPIENT.TEAM
      ? theme.colors.YELLOW_200
      : theme.colors.LIGHT_GREEN_200};

  border-radius: 8px;

  cursor: pointer;

  border: ${(props) =>
    props.selected && `solid 4px ${props.theme.colors.PURPLE_400}`};

  &:hover {
    background-color: ${({ theme, type }) =>
      type === RECIPIENT.TEAM
        ? theme.colors.YELLOW_300
        : theme.colors.LIGHT_GREEN_300};
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

export default RecipientBox;
