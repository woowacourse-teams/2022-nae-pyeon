import React, { useState } from "react";
import styled from "@emotion/styled";

interface radios {
  backgroundColor?: string;
  value?: string;
}

interface LabeledRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  radios: radios[];
}

interface StyledRadioProps {
  backgroundColor?: string;
  selected: boolean;
}

const LabeledRadio = ({ labelText, radios }: LabeledRadioProps) => {
  const [selectedRadio, setSelectedRadio] = useState(-1);

  const handleRadioClick = (index: number) => {
    setSelectedRadio(index);
  };

  return (
    <StyledLabel>
      {labelText}
      <StyledRadioContainer>
        {radios.map((radio, index) => {
          return (
            <div key={index}>
              <StyledRadio
                backgroundColor={radio?.backgroundColor}
                onClick={() => {
                  handleRadioClick(index);
                }}
                selected={selectedRadio === index}
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
