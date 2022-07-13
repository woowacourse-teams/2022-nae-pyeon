import React from "react";
import styled from "@emotion/styled";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LineButton = ({
  type = "button",
  onClick,
  children,
}: ButtonAttributes) => {
  return (
    <StyledLineButton type={type} onClick={onClick}>
      {children}
    </StyledLineButton>
  );
};

const StyledLineButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.SKY_BLUE_200};
  color: ${({ theme }) => theme.colors.SKY_BLUE_200};
  border-radius: 8px;
  padding: 10px 20px;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }
`;

export default LineButton;
