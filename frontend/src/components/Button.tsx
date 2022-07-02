import React from "react";
import styled from "@emotion/styled";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  font-size: 16px;
  font-weight: 600;
`;

const Button = ({ type, onClick, children }: ButtonAttributes) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
