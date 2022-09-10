import React from "react";
import styled from "@emotion/styled";

interface LabeledTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  labelText: string;
  showValueLength?: boolean;
}

const LabeledTextArea = ({
  value,
  maxLength,
  labelText,
  showValueLength = false,
  ...props
}: LabeledTextAreaProps) => {
  return (
    <StyledLabel>
      {labelText}
      <StyledTextarea value={value} maxLength={maxLength} {...props} />
      {showValueLength && (
        <StyledValueLength>
          {value.length}/{maxLength}
        </StyledValueLength>
      )}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin: 12px 0 28px 0;

  font-size: 16px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.GRAY_100};

  resize: none;

  :focus {
    outline: none;
  }
`;

const StyledValueLength = styled.span`
  position: absolute;
  right: 0;
`;

export default LabeledTextArea;
