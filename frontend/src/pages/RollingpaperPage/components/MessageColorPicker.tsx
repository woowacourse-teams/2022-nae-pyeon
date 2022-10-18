import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants";

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickRadio: (value: string) => void;
  selectedColor: string;
}

interface StyledRadioProps {
  backgroundColor: string;
}

const MessageColorPicker = ({
  onClickRadio,
  selectedColor,
}: ColorPickerProps) => {
  const handleRadioChange =
    (value: string): React.ChangeEventHandler<HTMLInputElement> =>
    () => {
      onClickRadio(value);
    };

  return (
    <StyledColorPickerContainer>
      {Object.values(COLORS).map((color) => {
        return (
          <label key={color.name}>
            {color.name}
            <StyledInput
              type="radio"
              value={color.value}
              checked={selectedColor === color.value}
              onChange={handleRadioChange(color.value)}
            />
            <StyledRadio backgroundColor={color.value} aria-hidden={true} />
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

  label {
    font-size: 0;
  }
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
