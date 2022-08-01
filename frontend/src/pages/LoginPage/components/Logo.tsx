import React from "react";
import styled from "@emotion/styled";

import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <StyledLogo>
      <img src={logo} />
      <h1>내 편</h1>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 56px;
    height: 60px;
    margin-right: 10px;

    @media only screen and (min-width: 960px) {
      width: 84px;
      height: 90px;
      margin-right: 15px;
    }
  }

  h1 {
    margin-top: 8px;
    font-size: 56px;

    @media only screen and (min-width: 960px) {
      margin-top: 12px;
      font-size: 84px;
    }
  }
`;

export default Logo;
