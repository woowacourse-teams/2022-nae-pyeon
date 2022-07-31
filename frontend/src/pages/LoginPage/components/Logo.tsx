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
  }

  h1 {
    margin-top: 8px;
    font-size: 56px;
  }
`;

export default Logo;
