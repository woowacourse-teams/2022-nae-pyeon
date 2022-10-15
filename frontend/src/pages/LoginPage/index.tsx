import React from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "@/pages/LoginPage/components/Logo";
import SocialLoginButton from "@/pages/LoginPage/components/SocialLoginButton";

import Landing1Image from "@/assets/images/landing-1.svg";
import Landing2Image from "@/assets/images/landing-2.svg";

import {
  KAKAO_OAUTH_URL,
  GOOGLE_OAUTH_URL,
  SOCIAL_LOGIN_PLATFORM,
} from "@/constants";

type LoginPageLocationState = {
  inviteCode?: string;
};

const LoginPage = () => {
  const { state } = useLocation();

  const handleKakaoLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const locationState = state as LoginPageLocationState;
    const inviteCode = locationState?.inviteCode || "";

    location.href = KAKAO_OAUTH_URL.AUTHORIZE_CODE(inviteCode);
  };

  const handleGoogleLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const locationState = state as LoginPageLocationState;
    const inviteCode = locationState?.inviteCode || "";

    location.href = GOOGLE_OAUTH_URL.AUTHORIZE_CODE(inviteCode);
  };

  return (
    <StyledMain>
      <StyledTitle>
        <StyledDescription1>모임기반 롤링페이퍼 서비스</StyledDescription1>
        <StyledDescription2>내 마음을 편지로</StyledDescription2>
        <Logo />
      </StyledTitle>
      <StyledImageContainer>
        <StyledLandingImage2 />
        <StyledLandingImage1 />
      </StyledImageContainer>

      <StyledSocialLoginButtonContainer>
        <SocialLoginButton
          platform={SOCIAL_LOGIN_PLATFORM.KAKAO}
          onClick={handleKakaoLoginButtonClick}
        />
        <SocialLoginButton
          platform={SOCIAL_LOGIN_PLATFORM.GOOGLE}
          onClick={handleGoogleLoginButtonClick}
        />
      </StyledSocialLoginButtonContainer>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  position: relative;
  left: -24px;
  width: calc(100% + 48px);
  height: 100vh;

  background-color: ${({ theme }) => `${theme.colors.SKY_BLUE_100}`};

  overflow-x: hidden;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 15vh;
  left: calc(100% / 2);
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: max-content;

  color: ${({ theme }) => theme.colors.SKY_BLUE_400};

  @media only screen and (min-width: 960px) {
    font-size: 24px;
  }
`;

const StyledDescription1 = styled.div`
  position: relative;
  left: -32px;
`;

const StyledDescription2 = styled.div`
  position: relative;
  left: 70px;
`;

const StyledImageContainer = styled.div`
  position: relative;
  top: 50vh;

  height: fit-content;
`;

const StyledLandingImage1 = styled(Landing1Image)`
  position: absolute;
  top: 40vh;
  right: calc(-100% / 2);
  transform: rotate(-0.05turn);

  display: flex;
  align-items: center;
  font-size: 500px;

  padding-bottom: 20px;

  @media only screen and (min-width: 600px) {
    top: 30vh;
    right: calc(-100% / 3);
  }

  @media only screen and (min-width: 960px) {
    right: calc(-100% / 3);
    font-size: 700px;
  }

  @media only screen and (min-width: 1280px) {
    right: calc(-100% / 4);
    font-size: 700px;
  }
`;

const StyledLandingImage2 = styled(Landing2Image)`
  position: absolute;
  left: calc(-100% / 2);
  transform: rotate(0.05turn);

  display: flex;
  align-items: center;
  font-size: 500px;

  padding-bottom: 20px;

  @media only screen and (min-width: 600px) {
    left: calc(-100% / 3);
  }

  @media only screen and (min-width: 960px) {
    left: calc(-100% / 3);
    font-size: 700px;
  }

  @media only screen and (min-width: 1280px) {
    left: calc(-100% / 4);
    font-size: 700px;
  }
`;

const StyledSocialLoginButtonContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 70vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 80%;
  margin: 0 auto;

  @media only screen and (min-width: 600px) {
    top: 80vh;
  }

  @media only screen and (min-width: 960px) {
    width: 500px;
  }

  button {
    width: 100%;
  }
`;

export default LoginPage;
