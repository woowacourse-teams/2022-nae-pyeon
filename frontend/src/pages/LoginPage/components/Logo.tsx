import React from "react";
import styled from "@emotion/styled";

import LogoImage from "@/assets/images/logo.svg";

const Logo = () => {
  return (
    <StyledLogo>
      <LogoImage />
      <h1>내편</h1>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  letter-spacing: 10px;

  svg {
    font-size: 80px;

    @media only screen and (min-width: 960px) {
      font-size: 100px;
    }
  }

  h1 {
    font-size: 56px;

    @media only screen and (min-width: 960px) {
      font-size: 84px;
    }
  }
`;

export default Logo;
