import React from "react";
import styled from "@emotion/styled";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  font-size: 20px;
`;

const IconButton = ({ type, onClick, children }: ButtonAttributes) => {
  return (
    <StyledIconButton type={type} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
