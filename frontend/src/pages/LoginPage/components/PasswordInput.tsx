import React, { useState } from "react";
import styled from "@emotion/styled";

import ShowIcon from "@/assets/icons/bx-show.svg";
import HideIcon from "@/assets/icons/bx-hide.svg";

interface PasswordInput extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  setValue: (value: string) => void;
}

const PasswordInput = ({ labelText, value, setValue }: PasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledLabel>
      {labelText}
      <StyledPasswordInput>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showPassword && <ShowIcon onClick={handleShowClick} />}
        {!showPassword && <HideIcon onClick={handleShowClick} />}
      </StyledPasswordInput>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
`;

const StyledPasswordInput = styled.div`
  display: flex;
  justify-content: center;
  height: 48px;
  margin-top: 8px;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.colors.GRAY_100};

  border-radius: 8px;

  svg {
    margin-top: 8px;
    font-size: 24px;

    fill: ${({ theme }) => theme.colors.GRAY_600};

    cursor: pointer;
  }

  input {
    width: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.GRAY_100};
    border: none;
    font-size: 16px;

    margin-right: 8px;

    &:focus {
      outline: none;
    }
  }
`;

export default PasswordInput;
