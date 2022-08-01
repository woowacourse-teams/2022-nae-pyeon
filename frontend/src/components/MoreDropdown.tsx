import React, { useState } from "react";
import styled from "@emotion/styled";

import IconButton from "./IconButton";

import DotsIcon from "@/assets/icons/bx-dots-horizontal-rounded.svg";

interface optionList {
  option: string;
  callback: () => void;
}
interface MoreDropdownProp {
  optionList: optionList[];
}

const MoreDropdown = ({ optionList }: MoreDropdownProp) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleButtonClick = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <StyledMoreDropdown>
      <IconButton size="small" onClick={handleButtonClick}>
        <DotsIcon />
      </IconButton>
      {isOpened && (
        <StyledDropdown>
          {optionList.map(({ option, callback }, index) => (
            <React.Fragment key={option}>
              <StyledOption onClick={callback}>{option}</StyledOption>
              {index < optionList.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </StyledDropdown>
      )}
    </StyledMoreDropdown>
  );
};

const StyledMoreDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  top: 24px;
  width: 120px;
  padding: 8px;

  z-index: 99;

  text-align: center;

  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0 4px 4px rgba(89, 87, 87, 0.25);
  border-radius: 8px;

  hr {
    border: 0.5px solid ${({ theme }) => theme.colors.GRAY_400};
  }
`;

const StyledOption = styled.li`
  font-size: 14px;

  cursor: pointer;
`;

export default MoreDropdown;
