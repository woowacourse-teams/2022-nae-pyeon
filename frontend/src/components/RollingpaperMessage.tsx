import React from "react";
import styled from "@emotion/styled";

interface RollingpaperMessageProp {
  content: string;
  author: string;
}
const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 130px;
  height: 130px;
  padding: 20px 15px 10px;

  background-color: #c5ff98;
`;

const StyledMessageContent = styled.div`
  height: 64px;
  overflow: hidden;

  font-size: 14px;
  line-height: 16px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

const StyledMessageAuthor = styled.div`
  align-self: flex-end;

  font-size: 12px;
  color: #8d8d8d;
`;

const RollingpaperMessage = ({ content, author }: RollingpaperMessageProp) => {
  return (
    <StyledMessage>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageAuthor>{author}</StyledMessageAuthor>
    </StyledMessage>
  );
};

export default RollingpaperMessage;
