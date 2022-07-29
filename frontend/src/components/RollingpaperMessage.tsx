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
  min-height: 130px;
  padding: 20px 15px 10px;

  background-color: ${({ theme }) => theme.colors.YELLOW_300};

  @media only screen and (min-width: 600px) {
    width: 180px;
    min-height: 180px;
  }
`;

const StyledMessageContent = styled.div`
  overflow: hidden;

  font-size: 14px;
  line-height: 16px;

  @media only screen and (min-width: 600px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const StyledMessageAuthor = styled.div`
  align-self: flex-end;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export default RollingpaperMessage;
