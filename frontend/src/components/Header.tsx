import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "@/assets/images/logo.png";
import { BiSearch, BiUser } from "react-icons/bi";
import { deleteCookie } from "@/util/cookie";
import { UserContext } from "@/context/UserContext";
import IconButton from "./IconButton";

const Header = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleLogoutClick = () => {
    deleteCookie("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <StyledHeader>
      <Link to={"/"}>
        <img src={Logo} />
      </Link>
      <StyledNav>
        <Link to={"/search"}>
          <BiSearch />
        </Link>
        <IconButton onClick={handleLogoutClick}>
          <BiUser />
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

  // svg {
  //   margin-top: 10px;
  // }
`;

export default Header;
