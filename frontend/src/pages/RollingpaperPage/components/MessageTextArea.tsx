import React from "react";
import styled from "@emotion/styled";
import { useMessageTextArea } from "../hooks/useMessageTextArea";

type MessageTextAreaProps = {
  backgroundColor: string;
  value: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type StyledMessageContainerProps = {
  backgroundColor: string;
};

export const MessageTextArea = ({
  value,
  onChange,
  children,
  placeholder,
  backgroundColor,
}: MessageTextAreaProps) => {
  const { textareaRef, handleTextAreaChange } = useMessageTextArea(onChange);

  return (
    <StyledMessageContainer backgroundColor={backgroundColor}>
      <StyledTextArea
        ref={textareaRef}
        value={value}
        onChange={handleTextAreaChange}
        placeholder={placeholder}
        maxLength={500}
      >
        {children}
      </StyledTextArea>
    </StyledMessageContainer>
  );
};

const StyledMessageContainer = styled.div<StyledMessageContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  aspect-ratio: 1;
  min-width: 180px;
  padding: 20px 20px 68px;

  font-size: 16px;
  line-height: 22px;

  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: inset 2px 2px ${({ theme }) => theme.colors.GRAY_700},
    inset -2px -2px ${({ theme }) => theme.colors.GRAY_700};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0;

  border: none;
  background-color: transparent;

  resize: none;

  font-size: inherit;
  line-height: inherit;

  &:focus {
    outline: none;
  }
`;

export default MessageTextArea;
