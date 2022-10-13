import React from "react";
import styled from "@emotion/styled";
import Switch from "@/components/Switch";

interface LabeledSwitchProp {
  labelText: string;
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const LabeledSwitch = ({
  labelText,
  isChecked,
  onClick,
}: LabeledSwitchProp) => {
  return (
    <StyledLabeledSwitch>
      {labelText}
      <StyledInput type="checkbox" checked={isChecked} readOnly />
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
      <Switch onClick={onClick} isChecked={isChecked} />
    </StyledLabeledSwitch>
  );
};

const StyledLabeledSwitch = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};

  @media only screen and (min-width: 600px) {
    font-size: 16px;
  }
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

  @media only screen and (min-width: 600px) {
    font-size: 14px;
  }
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export default LabeledSwitch;
