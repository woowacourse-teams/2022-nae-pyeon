import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants";

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickRadio: (value: string) => void;
  color: string;
}

interface StyledRadioProps {
  backgroundColor: string;
}

const MessageColorPicker = ({ onClickRadio, color }: ColorPickerProps) => {
  const handleRadioChange =
    (value: string): React.ChangeEventHandler<HTMLInputElement> =>
    () => {
      onClickRadio(value);
    };

  return (
    <StyledColorPickerContainer>
      {Object.values(COLORS).map((radio) => {
        return (
          <label key={radio}>
            <StyledInput
              type="radio"
              value={radio}
              checked={color === radio}
              onChange={handleRadioChange(radio)}
            />
            <StyledRadio backgroundColor={radio} />
          </label>
        );
      })}
    </StyledColorPickerContainer>
  );
};

const StyledColorPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  padding: 10px 4px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.GRAY_700};
`;

const StyledRadio = styled.div<StyledRadioProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: content-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  font-size: 25px;
  background-color: ${(props) => props.backgroundColor};

  cursor: pointer;

  @media only screen and (min-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

const StyledInput = styled.input`
  position: absolute;
  overflow: hidden;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  clip: rect(0, 0, 0, 0);

  &:checked + div {
    border: 3px solid ${({ theme }) => theme.colors.PURPLE_400};
  }
`;

export default MessageColorPicker;
