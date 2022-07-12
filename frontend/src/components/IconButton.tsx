import React from "react";
import styled from "@emotion/styled";

interface ButtonAttributes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "large";
}

const IconButton = ({
  type,
  onClick,
  size = "large",
  children,
}: ButtonAttributes) => {
  return (
    <StyledIconButton type={type} onClick={onClick} size={size}>
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button<ButtonAttributes>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${(props) => (props.size === "small" ? "20px" : "40px")};
`;

export default IconButton;
