import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface SwitchProp {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isChecked: boolean;
}

interface StyledCircleProp {
  checked: boolean;
}

const Switch = ({ onClick, isChecked }: SwitchProp) => {
  return (
    <StyledSwitch onClick={onClick}>
      <StyledCircle checked={isChecked} />
    </StyledSwitch>
  );
};

const StyledSwitch = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 30px;
  margin-top: 4px;

  border-radius: 20px;
  border: none;

  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.GRAY_300};

  transition: all 0.5s ease-in-out;
`;

const StyledCircle = styled.div<StyledCircleProp>`
  background-color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.checked &&
    css`
      transform: translate(30px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

export default Switch;
