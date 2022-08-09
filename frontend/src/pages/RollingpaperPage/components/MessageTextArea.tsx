import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";

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
  const textareaRef = useRef(null);

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (onChange) {
      onChange(e);
    }

    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current as unknown as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

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
      <StyledTextLength>{value.length}/500</StyledTextLength>
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
  padding: 20px 15px 10px;

  font-size: 14px;
  line-height: 16px;

  border: 2px solid ${({ theme }) => theme.colors.GRAY_700};
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media only screen and (min-width: 600px) {
    min-width: 300px;

    font-size: 14px;
    line-height: 18px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;

  border: none;
  background-color: transparent;

  resize: none;

  font-size: inherit;
  line-height: inherit;

  &:focus {
    outline: none;
  }
`;

const StyledTextLength = styled.div`
  display: inline;
  align-self: flex-end;

  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export default MessageTextArea;
