import React from "react";
import styled from "@emotion/styled";

interface LabeledRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

const LabeledTextArea = ({ labelText }: LabeledRadioProps) => {
  return (
    <StyledLabel>
      {labelText}
      <StyledTextarea maxLength={100} />
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 8px;

  font-size: 16px;

  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.GRAY_100};

  resize: none;
  overflow: hidden;

  :focus {
    outline: none;
  }
`;

export default LabeledTextArea;
