import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { useSnackbar } from "@/context/SnackbarContext";
import { UserContext } from "@/context/UserContext";

import { useReadNotifications } from "@/hooks/api/notification";

import IconButton from "@/components/IconButton";
import Badge from "@/components/Badge";

import FilledLogo from "@/assets/images/logo-fill.png";
import BellIcon from "@/assets/icons/bx-bell.svg";
import UserIcon from "@/assets/icons/bx-user.svg";

import { Notification } from "@/types";

const NOTIFICATION_SNACKBAR_MESSAGE = {
  ROLLINGPAPER_AT_MY_TEAM: " 롤링페이퍼가 새로 열렸습니다!",
  MESSAGE_AT_MY_ROLLINGPAPER: " 롤링페이퍼에 새 메시지가 작성되었습니다.",
};

const Header = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { memberId } = useContext(UserContext);

  const [notificationCount, setNotificationCount] = useState(0);

  useReadNotifications({
    onSuccess: (data) => {
      setNotificationCount(data.unreadCount);
    },
  });

  const [notificationEventSource, setNotificationEventSource] =
    useState<EventSource | null>(null);

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleNotificationEventSource = (e: MessageEvent) => {
    const notification: Notification = JSON.parse(e.data);

    openSnackbar(
      `${notification.rollingpaperTitle}${
        NOTIFICATION_SNACKBAR_MESSAGE[notification.contentType]
      }`
    );
    setNotificationCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (memberId) {
      const notification = new EventSource(
        `${process.env.API_URL}/subscribe?id=${memberId}`
      );
      notification.addEventListener("sse", handleNotificationEventSource);
      setNotificationEventSource(notification);
      return;
    }
    notificationEventSource?.removeEventListener(
      "sse",
      handleNotificationEventSource
    );
  }, [memberId]);

  return (
    <StyledHeader>
      <Link to={"/"}>
        <StyledHome>
          <img src={FilledLogo} />
          내편
        </StyledHome>
      </Link>
      <StyledNav>
        <Badge variant="number" badgeContent={notificationCount}>
          <IconButton onClick={handleNotificationClick} size="medium">
            <BellIcon />
          </IconButton>
        </Badge>
        <IconButton onClick={handleMyPageClick} size="medium">
          <UserIcon />
        </IconButton>
      </StyledNav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0px;
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px;
  margin-bottom: 12px;

  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => `${theme.colors.WHITE}e8`};

  img {
    width: 30px;
    height: 35px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 12px;

  height: 100%;
  font-size: 32px;

  button {
    &:hover {
      background-color: ${({ theme }) => theme.colors.GRAY_200};
    }
  }
`;

const StyledHome = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  font-size: 28px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.SKY_BLUE_400};

  img {
    width: 30px;
    height: 30px;
  }
`;

export default Header;
