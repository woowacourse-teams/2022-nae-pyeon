import React, { useState, SetStateAction } from "react";
import styled from "@emotion/styled";

interface Radio {
  id: number;
  value: string;
}

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  radios: Radio[];
  initialSelectedId: number;
  onClickRadio: React.Dispatch<SetStateAction<string>>;
}

interface StyledRadioProps {
  backgroundColor?: string;
}

const MessageColorPicker = ({
  radios,
  initialSelectedId,
  onClickRadio,
}: ColorPickerProps) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(
    initialSelectedId
  );

  const handleRadioChange = (key: number, value: string) => {
    setSelectedItemId(key);
    onClickRadio(value);
  };

  return (
    <StyledColorPickerContainer>
      {radios.map((radio) => {
        return (
          <label key={radio.id}>
            <StyledInput
              type="radio"
              value={radio.value}
              checked={selectedItemId === radio.id}
              onChange={() => {
                handleRadioChange(radio.id, radio.value);
              }}
            />
            <StyledRadio backgroundColor={radio.value} />
          </label>
        );
      })}
    </StyledColorPickerContainer>
  );
};

const StyledColorPickerContainer = styled.div`
  position: absolute;
  left: 130px;
  margin-left: 4px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px 4px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.GRAY_700};

  @media only screen and (min-width: 600px) {
    left: 180px;
    margin-left: 8px;
  }
`;

const StyledRadio = styled.div<StyledRadioProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  border-radius: 50%;

  font-size: 25px;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.GRAY_200};

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
