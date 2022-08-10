import React from "react";
import styled from "@emotion/styled";

import ErrorIcon from "@/assets/icons/bxs-error.svg";

interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const UnderlineInput = ({ errorMessage, ...props }: UnderlineInputProps) => {
  return (
    <StyledInputContainer>
      <StyledInput {...props} />
      <div>
        <ErrorIcon />
        {errorMessage}
      </div>
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 8px 0;

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

const StyledInput = styled.input`
  height: 32px;
  padding: 0 8px;

  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_700};

  font-size: 16px;

  &:focus {
    outline: none;
  }

  &:invalid {
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.RED_300};
  }

  &:invalid + div {
    visibility: visible;
  }
`;

export default UnderlineInput;
