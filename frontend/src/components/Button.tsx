import React from "react";
import styled from "@emotion/styled";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ type = "button", onClick, children }: ButtonAttributes) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.SKY_BLUE_200};
  color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  padding: 10px 0;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }
`;

export default Button;
