import React from "react";
import styled from "@emotion/styled";

interface RoundButtonWithDescripionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  description?: string;
}

const RoundButtonWithDescription = ({
  type = "button",
  onClick,
  description,
  children,
}: RoundButtonWithDescripionProps) => {
  return (
    <StyledRoundButtonWithDescription>
      <StyledRoundButton type={type} onClick={onClick}>
        {children}
      </StyledRoundButton>
      <StyledDescription>{description}</StyledDescription>
    </StyledRoundButtonWithDescription>
  );
};

const StyledRoundButtonWithDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  font-weight: 600;
`;

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

const StyledDescription = styled.div`
  text-align: center;
  width: 70px;

  white-space: pre-wrap;
`;

export default RoundButtonWithDescription;
