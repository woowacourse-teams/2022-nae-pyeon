import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";
import Badge from "@/components/Badge";

import FilledLogo from "@/assets/images/logo-fill.png";
import BellIcon from "@/assets/icons/bx-bell.svg";
import SearchIcon from "@/assets/icons/bx-search.svg";
import UserIcon from "@/assets/icons/bx-user.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <StyledHeader>
      <Link to={"/"}>
        <StyledHome>
          <img src={FilledLogo} />
          내편
        </StyledHome>
      </Link>
      <StyledNav>
        <IconButton onClick={handleSearchClick} size="medium">
          <SearchIcon />
        </IconButton>
        <Badge variant="dot" invisible={false}>
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
