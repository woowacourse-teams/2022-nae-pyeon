import React from "react";
import styled from "@emotion/styled";

interface ButtonAttributes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
}

const IconButton = ({
  type,
  onClick,
  size = "large",
  disabled,
  children,
}: ButtonAttributes) => {
  return (
    <StyledIconButton
      type={type}
      onClick={onClick}
      size={size}
      disabled={disabled}
    >
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button<ButtonAttributes>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${(props) =>
    props.size === "small"
      ? "24px"
      : props.size === "medium"
      ? "30px"
      : "40px"};

  &:disabled {
    cursor: default;
  }
`;

export default IconButton;
