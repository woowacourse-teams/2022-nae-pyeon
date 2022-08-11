import React from "react";
import styled from "@emotion/styled";

interface LabeledRadioProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
  setValue: (value: string) => void;
}

const LabeledTextArea = ({
  labelText,
  placeholder,
  setValue,
}: LabeledRadioProps) => {
  return (
    <StyledLabel>
      {labelText}
      <StyledTextarea
        maxLength={100}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  @media only screen and (min-width: 400px) {
    font-size: 16px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  margin: 8px 0 28px 0;

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
