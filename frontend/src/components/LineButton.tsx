import React from "react";
import styled from "@emotion/styled";

interface ButtonAttributes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LineButton = ({
  type = "button",
  onClick,
  disabled,
  children,
}: ButtonAttributes) => {
  return (
    <StyledLineButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledLineButton>
  );
};

const StyledLineButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.SKY_BLUE_300};
  color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  border-radius: 8px;
  padding: 10px 20px;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.SKY_BLUE_400};
    color: ${({ theme }) => theme.colors.SKY_BLUE_400};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
    color: ${({ theme }) => theme.colors.GRAY_400};
  }
`;

export default LineButton;
