import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import XIcon from "@/assets/icons/bx-x.svg";

interface NotificationItemProps {
  description: string;
}

const NotificationItem = ({ description }: NotificationItemProps) => {
  return (
    <StyledNotificationItem
      onClick={(e) => {
        console.log("알림 읽음 처리 및 롤링페이퍼 페이지로 이동");
      }}
    >
      <StyledCloseButtonWrapper>
        <IconButton>
          <XIcon />
        </IconButton>
      </StyledCloseButtonWrapper>
      <StyledTopSection>
        <StyledDescription>{description}</StyledDescription>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledTeamName>{"우아한테크코스 4기"}</StyledTeamName>
        <StyledDate>{"2022년 10월 19일"}</StyledDate>
      </StyledBottomSection>
    </StyledNotificationItem>
  );
};

const StyledNotificationItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  padding: 24px 16px 12px;

  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0px 4px 4px 4px ${({ theme }) => theme.colors.BOX_SHADOW};
  border-radius: 8px;

  cursor: pointer;

  transition-duration: 0.3s;
  &:hover {
    box-shadow: 0px 4px 4px 4px ${({ theme }) => theme.colors.BOX_SHADOW_DARK};
  }
`;

const StyledTopSection = styled.div`
  padding: 0 12px 8px 0;
  border-bottom: solid 1px ${({ theme }) => theme.colors.GRAY_300};
`;

const StyledBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0 0;
`;

const StyledCloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  button {
    font-size: 20px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.GRAY_200};
    }
  }
`;

const StyledDescription = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StyledTeamName = styled.div`
  font-size: 14px;
`;

const StyledDate = styled.div`
  font-size: 12px;
`;

export default NotificationItem;
