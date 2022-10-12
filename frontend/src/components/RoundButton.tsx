import React from "react";
import styled from "@emotion/styled";

interface RoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RoundButton = ({
  type = "button",
  onClick,
  children,
}: RoundButtonProps) => {
  return (
    <StyledRoundButton type={type} onClick={onClick}>
      {children}
    </StyledRoundButton>
  );
};

const StyledRoundButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.SKY_BLUE_200};
  border-radius: 50%;

  font-size: 28px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }
`;

export default RoundButton;
