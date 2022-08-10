import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface LabeledToggleProp {
  labelText: string;
  isChecked: boolean;
  onClickToggle: React.MouseEventHandler<HTMLDivElement>;
}

interface StyledCircleProp {
  checked: boolean;
}

export const LabeledToggle = ({
  labelText,
  isChecked,
  onClickToggle,
}: LabeledToggleProp) => {
  return (
    <StyledLabeledToggle>
      {labelText}
      <StyledInput type="checkbox" checked={isChecked} />
      <StyledMessage>
        {isChecked ? (
          <>
            이 작업은 실행 취소할 수 없습니다.
            <StyledBold>
              {` 비공개 채널은 나중에 공개로 설정할 수 없습니다.`}
            </StyledBold>
          </>
        ) : (
          "모임이 비공개로 설정된 경우 초대링크를 통해서만 참여할 수 있습니다."
        )}
      </StyledMessage>
      <ToggleBtn onClick={onClickToggle}>
        <Circle checked={isChecked} />
      </ToggleBtn>
    </StyledLabeledToggle>
  );
};

const StyledLabeledToggle = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const StyledInput = styled.input`
  display: none;
  &:checked ~ div {
    background-color: ${({ theme }) => theme.colors.SKY_BLUE_300};
  }
`;

const StyledMessage = styled.span`
  margin-top: 8px;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const ToggleBtn = styled.div`
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

const Circle = styled.div<StyledCircleProp>`
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

export default LabeledToggle;
