import React from "react";
import styled from "@emotion/styled";

import Logo from "@/pages/LoginPage/components/Logo";
import SocialLoginButton from "@/pages/LoginPage/components/SocialLoginButton";

import { KAKAO_OAUTH_URL } from "@/constants";

const LoginPage = () => {
  const handleKakaoLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    location.href = KAKAO_OAUTH_URL.AUTHORIZE_CODE;
  };

  return (
    <StyledMain>
      <StyledTitle>
        <Logo />
        <div>내 마음을 편지로</div>
      </StyledTitle>
      <StyledSocialLoginButtonContainer>
        <SocialLoginButton onClick={handleKakaoLoginButtonClick} />
      </StyledSocialLoginButtonContainer>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100vh;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15% 0;

  color: ${({ theme }) => theme.colors.SKY_BLUE_300};

  @media only screen and (min-width: 960px) {
    font-size: 24px;
  }
`;

const StyledSocialLoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10% 0;
  gap: 20px;

  button {
    width: 100%;

    @media only screen and (min-width: 960px) {
      width: 500px;
    }
  }
`;

export default LoginPage;
