import React from "react";
import styled from "@emotion/styled";

interface RollingpaperMessageProp {
  content: string;
  author: string;
}

const RollingpaperMessage = ({ content, author }: RollingpaperMessageProp) => {
  return (
    <StyledMessage>
      <StyledMessageContent>{content}</StyledMessageContent>
      <StyledMessageAuthor>{author}</StyledMessageAuthor>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;

  width: 130px;
  height: 130px;
  padding: 20px 15px 10px;

  background-color: #c5ff98;

  @media only screen and (min-width: 600px) {
    width: 180px;
    height: 180px;
  }
`;

const StyledMessageContent = styled.div`
  height: 64px;
  overflow: hidden;

  font-size: 14px;
  line-height: 16px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;

  @media only screen and (min-width: 600px) {
    height: 126px;

    font-size: 14px;
    line-height: 18px;

    -webkit-line-clamp: 7;
  }
`;

const StyledMessageAuthor = styled.div`
  align-self: flex-end;

  font-size: 12px;
  color: #8d8d8d;
`;

export default RollingpaperMessage;
