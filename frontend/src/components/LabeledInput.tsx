import React from "react";
import styled from "@emotion/styled";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  setValue: (value: string) => void;
}

const LabeledInput = ({ labelText, value, setValue }: LabeledInputProps) => {
  return (
    <StyledLabel>
      {labelText}
      <input
        value={value}
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
  width: 100%;

  font-size: 12px;
  color: #595959;

  input {
    height: 48px;
    margin-top: 8px;
    padding: 0 10px;

    border: none;
    border-radius: 8px;
    background-color: #f7f7f7;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }
`;

export default LabeledInput;
