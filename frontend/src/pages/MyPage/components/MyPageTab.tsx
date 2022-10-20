import React from "react";
import styled from "@emotion/styled";

interface MyPageTabProps {
  number: number;
  text: string;
  activate?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MyPageTab = ({ number, text, activate, onClick }: MyPageTabProps) => {
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

const StyledNumber = styled.div<Pick<MyPageTabProps, "activate">>`
  margin-bottom: 8px;

  font-size: 24px;
  font-weight: 600;

  color: ${(props) =>
    props.activate
      ? `${props.theme.colors.SKY_BLUE_300}`
      : `${props.theme.colors.GRAY_400}`};
`;

const StyledText = styled.div<Pick<MyPageTabProps, "activate">>`
  font-size: 14px;

  color: ${(props) =>
    props.activate
      ? `${props.theme.colors.BLACK}`
      : `${props.theme.colors.GRAY_400}`};
`;

export default MyPageTab;
