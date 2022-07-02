import React from "react";
import styled from "@emotion/styled";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 40px;
`;

const IconButton = ({ type, onClick, children }: ButtonAttributes) => {
  return (
    <StyledIconButton type={type} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
