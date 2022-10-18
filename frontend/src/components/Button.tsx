import React from "react";
import styled from "@emotion/styled";

const Button = ({
  type = "button",
  onClick,
  disabled,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  padding: 10px 0;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_400};
  }

  &:disabled {
    cursor: default;
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export default Button;
