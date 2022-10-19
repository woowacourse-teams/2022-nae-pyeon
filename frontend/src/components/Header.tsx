import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { UserContext } from "@/context/UserContext";

import IconButton from "@/components/IconButton";
import Badge from "@/components/Badge";

import FilledLogo from "@/assets/images/logo-fill.png";
import BellIcon from "@/assets/icons/bx-bell.svg";
import UserIcon from "@/assets/icons/bx-user.svg";
import useReadNotifications from "./../hooks/useReadNotifications";

const Header = () => {
  const navigate = useNavigate();
  const { memberId } = useContext(UserContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const { data } = useReadNotifications();

  const [notificationEventSource, setNotificationEventSource] =
    useState<EventSource | null>(null);

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleNotificationEventSource = (e: MessageEvent) => {
    console.log(e, JSON.parse(e.data));
  };

  useEffect(() => {
    if (memberId) {
      const notification = new EventSource(
        `${process.env.API_URL}/subscribe?id=${memberId}`
      );
      notification.addEventListener("sse", handleNotificationEventSource);
      setNotificationEventSource(notification);
      return;
    } else {
      notificationEventSource?.removeEventListener(
        "sse",
        handleNotificationEventSource
      );
    }
  }, [memberId]);

  useEffect(() => {
    if (data) {
      setNotificationCount(data.unreadCount);
    }
  }, [data]);

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
