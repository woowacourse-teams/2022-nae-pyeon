import React, { useState, SetStateAction } from "react";
import styled from "@emotion/styled";

interface Radio {
  backgroundColor?: string;
  value?: string;
  id: number;
}

interface LabeledRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  radios: Radio[];
  onClickRadio: React.Dispatch<SetStateAction<string>>;
}

interface StyledRadioProps {
  backgroundColor?: string;
  selected: boolean;
}

const LabeledRadio = ({
  labelText,
  radios,
  onClickRadio,
}: LabeledRadioProps) => {
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);

  const handleRadioClick = (index: number, value: string) => {
    setSelectedRadio(index);
    onClickRadio(value);
  };

  return (
    <StyledLabel>
      {labelText}
      <StyledRadioContainer>
        {radios.map((radio) => {
          return (
            <div key={radio.id}>
              <StyledRadio
                backgroundColor={radio?.backgroundColor}
                onClick={() => {
                  if (radio.value) {
                    handleRadioClick(radio.id, radio.value);
                  }
                  if (radio.backgroundColor) {
                    handleRadioClick(radio.id, radio.backgroundColor);
                  }
                }}
                selected={selectedRadio === radio.id}
              >
                {radio?.value}
              </StyledRadio>
            </div>
          );
        })}
      </StyledRadioContainer>
    </StyledLabel>
  );
};

const StyledLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledRadioContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

const StyledRadio = styled.div<StyledRadioProps>`
  width: 40px;
  height: 40px;
  display: flex;

  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.GRAY_200};

  border-radius: 4px;
  border: ${(props) =>
    props.selected && `solid 3px ${props.theme.colors.PURPLE_300}`};

  font-size: 28px;
  cursor: pointer;
`;

export default LabeledRadio;
