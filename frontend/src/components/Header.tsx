import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "@/assets/images/logo.png";

import { deleteCookie } from "@/util/cookie";
import { UserContext } from "@/context/UserContext";
import IconButton from "./IconButton";

import SearchIcon from "@/assets/icons/bx-search.svg";
import UserIcon from "@/assets/icons/bx-user.svg";

const Header = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    deleteCookie("accessToken");
    setIsLoggedIn(false);
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <StyledHeader>
      <Link to={"/"}>
        <StyledHome>내편</StyledHome>
      </Link>
      <StyledNav>
        <IconButton onClick={handleSearchClick} size="medium">
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleLogoutClick} size="medium">
          <UserIcon />
        </IconButton>
      </StyledNav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px;
  margin-bottom: 12px;

  width: 100%;
  height: 70px;
  background-color: white;

  img {
    width: 30px;
    height: 35px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 12px;

  font-size: 32px;

  height: 100%;

  button {
    &:hover {
      color: ${({ theme }) => theme.colors.GRAY_600};
    }
  }
`;

const StyledHome = styled.div`
  font-size: 30px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.SKY_BLUE_400};
`;

export default Header;
