import React, { useRef } from "react";
import styled from "@emotion/styled";

export const MessageTextArea = () => {
  const textareaRef = useRef(null);

  const handleTextAreaChange = () => {
    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <StyledMessage ref={textareaRef} onChange={handleTextAreaChange}>
      MessageWrite
    </StyledMessage>
  );
};

const StyledMessage = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
  overflow: hidden;

  width: 130px;
  min-height: 130px;
  padding: 20px 15px;

  background-color: ${({ theme }) => theme.colors.YELLOW_300};

  @media only screen and (min-width: 600px) {
    width: 180px;
    min-height: 180px;
  }
`;

export default MessageTextArea;
