import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useDeleteNotification from "@/pages/NotificationPage/hooks/useDeleteNotification";
import IconButton from "@/components/IconButton";

import { Notification } from "@/types";

import XIcon from "@/assets/icons/bx-x.svg";

interface NotificationItemProps {
  notification: Notification;
}

const DESCRIPTION_MESSAGE = {
  ROLLINGPAPER_AT_MY_TEAM: " 롤링페이퍼가 열렸습니다! 메시지를 남겨볼까요?",
  MESSAGE_AT_MY_ROLLINGPAPER: " 롤링페이퍼에 새 메시지가 작성되었습니다.",
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate();
  const { mutate: deleteNotification } = useDeleteNotification();
  const notificationDate = new Date(notification.createAt);

  return (
    <StyledNotificationItem
      onClick={() => {
        deleteNotification({ id: notification.id });
        navigate(notification.url);
      }}
    >
      <StyledCloseButtonWrapper>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            deleteNotification({ id: notification.id });
          }}
        >
          <XIcon />
        </IconButton>
      </StyledCloseButtonWrapper>
      <StyledTopSection>
        <StyledDescription>
          <span>{notification.rollingpaperTitle}</span>
          {DESCRIPTION_MESSAGE[notification.contentType]}
        </StyledDescription>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledTeamName>{notification.teamName}</StyledTeamName>
        <StyledDate>
          {`${
            notificationDate.getMonth() + 1
          }. ${notificationDate.getDate()} ${notificationDate.toLocaleTimeString(
            "ko",
            {
              timeStyle: "short",
            }
          )}`}
        </StyledDate>
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

  span {
    font-weight: 600;
  }
`;

const StyledTeamName = styled.div`
  font-size: 14px;
`;

const StyledDate = styled.div`
  min-width: max-content;

  font-size: 12px;
`;

export default NotificationItem;
