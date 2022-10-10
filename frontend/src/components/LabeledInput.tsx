import React from "react";
import styled from "@emotion/styled";

import ErrorIcon from "@/assets/icons/bxs-error.svg";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  errorMessage?: string;
  showValueLength?: boolean;
}

const LabeledInput = ({
  value = "",
  maxLength,
  labelText,
  errorMessage,
  showValueLength = false,
  ...prop
}: LabeledInputProps) => {
  return (
    <StyledLabel>
      {labelText}
      <input {...prop} />
      <div>
        <ErrorIcon />
        {errorMessage}
      </div>
      {showValueLength && (
        <StyledValueLength>
          {value.toString().length}/{maxLength}
        </StyledValueLength>
      )}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }

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
      fill: ${({ theme }) => theme.colors.RED_300};
    }
  }
`;

const StyledValueLength = styled.span`
  position: absolute;
  right: 0;
`;

export default LabeledInput;
