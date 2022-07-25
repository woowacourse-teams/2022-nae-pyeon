import React from "react";
import styled from "@emotion/styled";

import { BiError } from "react-icons/bi";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  errorMessage?: string;
  setValue: (value: string) => void;
}

const LabeledInput = ({
  type = "text",
  labelText,
  placeholder,
  pattern,
  errorMessage,
  value,
  setValue,
}: LabeledInputProps) => {
  return (
    <StyledLabel>
      {labelText}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        pattern={pattern}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>
        <BiError />
        {errorMessage}
      </div>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  input {
    height: 48px;
    margin-top: 8px;
    padding: 0 10px;

    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.GRAY_100};
    font-size: 16px;

    &:focus {
      outline: none;
    }

    &:invalid {
      border: none;
      background-color: ${({ theme }) => theme.colors.RED_100};
      border: 3px solid ${({ theme }) => theme.colors.RED_300};
    }

    &:invalid + div {
      visibility: visible;
    }
  }

  div {
    visibility: hidden;

    margin-top: 8px;
    color: ${({ theme }) => theme.colors.RED_300};

    svg {
      position: relative;
      top: 2px;
      margin-right: 4px;
    }
  }
`;

export default LabeledInput;
