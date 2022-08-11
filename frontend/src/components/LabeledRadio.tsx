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
}

const LabeledRadio = ({
  labelText,
  radios,
  onClickRadio,
}: LabeledRadioProps) => {
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);

  const handleRadioChange = (key: number, value: string) => {
    setSelectedRadio(key);
    onClickRadio(value);
  };

  return (
    <fieldset>
      <StyledLegend>{labelText}</StyledLegend>
      <StyledRadioContainer>
        {radios.map((radio) => {
          return (
            <label key={radio.id}>
              <StyledInput
                type="radio"
                value={radio.value}
                checked={selectedRadio === radio.id}
                onChange={() => {
                  if (radio.value) {
                    handleRadioChange(radio.id, radio.value);
                  }
                  if (radio.backgroundColor) {
                    handleRadioChange(radio.id, radio.backgroundColor);
                  }
                }}
              />
              <StyledRadio backgroundColor={radio?.backgroundColor}>
                {radio.value}
              </StyledRadio>
            </label>
          );
        })}
      </StyledRadioContainer>
    </fieldset>
  );
};

const StyledLegend = styled.legend`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }
`;

const StyledRadioContainer = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 8px;
`;

const StyledRadio = styled.div<StyledRadioProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 4px;

  font-size: 25px;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.GRAY_200};

  cursor: pointer;
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

export default LabeledRadio;
