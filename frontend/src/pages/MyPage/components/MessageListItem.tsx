import React from "react";
import styled from "@emotion/styled";

import { SentMessage } from "@/types";
import { Link } from "react-router-dom";

type StyledMessageProp = Pick<SentMessage, "color">;

const MessageListItem = ({
  rollingpaperId,
  rollingpaperTitle,
  to,
  teamId,
  teamName,
  content,
  color,
}: SentMessage) => {
  return (
    <li>
      <Link to={`/team/${teamId}/rollingpaper/${rollingpaperId}`}>
        <StyledMessage color={color}>
          <StyledTitle>{rollingpaperTitle}</StyledTitle>
          <StyledTo>
            To. <span>{to}</span>
            <span>({teamName})</span>
          </StyledTo>
          <StyledContent>{content}</StyledContent>
        </StyledMessage>
      </Link>
    </li>
  );
};

const StyledMessage = styled.div<StyledMessageProp>`
  display: flex;
  flex-direction: column;

  gap: 4px;

  padding: 10px 16px;
  background-color: ${(props) => `${props.color}AB`};

  border-radius: 4px;
  height: 90px;

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
  -webkit-line-clamp: 1;
`;

export default MessageListItem;
