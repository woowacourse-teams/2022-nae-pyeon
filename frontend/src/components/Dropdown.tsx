import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface optionList {
  option: string;
  callback: () => void;
}
interface DropdownProp {
  DropdownButton: React.ReactNode;
  optionList: optionList[];
}

const Dropdown = ({ DropdownButton, optionList }: DropdownProp) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleButtonClick = () => {
    setIsOpened((prev) => !prev);
  };

  const handleOptionClick = (callback: () => void) => {
    setIsOpened(false);
    callback();
  };

  return (
    <StyledDropdown>
      <button onClick={handleButtonClick}>{DropdownButton}</button>
      {isOpened && (
        <StyledDropdownList>
          {optionList.map(({ option, callback }, index) => (
            <React.Fragment key={option}>
              <StyledOption onClick={() => handleOptionClick(callback)}>
                {option}
              </StyledOption>
              {index < optionList.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </StyledDropdownList>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    margin-top: -10px;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const StyledDropdownList = styled.ul`
  position: absolute;
  top: 24px;
  width: 120px;
  padding: 8px;

  z-index: 99;

  text-align: center;

  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0 4px 4px rgba(89, 87, 87, 0.25);
  border-radius: 8px;

  animation: ${fadeInDown} 0.3s;

  hr {
    border: 0.5px solid ${({ theme }) => theme.colors.GRAY_400};
  }
`;

const StyledOption = styled.li`
  font-size: 14px;

  cursor: pointer;
`;

export default Dropdown;
