import React from "react";
import styled from "@emotion/styled";

interface CounterWithTextProp {
  number: number;
  text: string;
  activate?: boolean;
  onClick: () => void;
}

type StyledCounterWithTextPropProps = Pick<CounterWithTextProp, "activate">;

const CounterWithText = ({
  number,
  text,
  activate,
  onClick,
}: CounterWithTextProp) => {
  return (
    <StyledCounter onClick={onClick}>
      <StyledNumber activate={activate}>{number}</StyledNumber>
      <StyledText activate={activate}>{text}</StyledText>
    </StyledCounter>
  );
};

const StyledCounter = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const StyledNumber = styled.div<StyledCounterWithTextPropProps>`
  margin-bottom: 8px;

  font-size: 24px;
  font-weight: 600;

  color: ${(props) =>
    props.activate
      ? `${props.theme.colors.SKY_BLUE_300}`
      : `${props.theme.colors.GRAY_400}`};
`;

const StyledText = styled.div<StyledCounterWithTextPropProps>`
  font-size: 14px;

  color: ${(props) =>
    props.activate
      ? `${props.theme.colors.BLACK}`
      : `${props.theme.colors.GRAY_400}`};
`;

export default CounterWithText;
