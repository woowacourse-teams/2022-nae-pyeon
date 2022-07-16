import React, { useState } from "react";
import styled from "@emotion/styled";

import { BiShow, BiHide } from "react-icons/bi";

interface PasswordInput extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

const PasswordInput = ({ value, setValue }: PasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledLabel>
      비밀번호
      <StyledPasswordInput>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showPassword && <BiShow onClick={handleShowClick} />}
        {!showPassword && <BiHide onClick={handleShowClick} />}
      </StyledPasswordInput>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
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
