import React from "react";
import styled from "@emotion/styled";

interface MessageCardProp {
  rollingpaperTitle: string;
  to: string;
  team: string;
  content: string;
  color: string;
}

type StyledMessageProp = Pick<MessageCardProp, "color">;

const MessageCard = ({
  rollingpaperTitle,
  to,
  team,
  content,
  color,
}: MessageCardProp) => {
  return (
    <StyledMessage color={color}>
      <StyledTitle>{rollingpaperTitle}</StyledTitle>
      <StyledTo>
        To. <span>{to}</span>
        <span>({team})</span>
      </StyledTo>
      <StyledContent>{content}</StyledContent>
    </StyledMessage>
  );
};

const StyledMessage = styled.div<StyledMessageProp>`
  display: flex;
  flex-direction: column;

  gap: 4px;

  padding: 16px;
  background-color: ${(props) => `${props.color}AB`};

  border-radius: 4px;
  height: 125px;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.color};
  }
`;

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const StyledTo = styled.div`
  font-size: 12px;
`;

const StyledContent = styled.div`
  margin-top: 4px;

  font-size: 14px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default MessageCard;
