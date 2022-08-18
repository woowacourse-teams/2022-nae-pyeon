import React from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

import { useSnackbar } from "@/context/SnackbarContext";

import Logo from "@/pages/LoginPage/components/Logo";
import SocialLoginButton from "@/pages/LoginPage/components/SocialLoginButton";

import { KAKAO_OAUTH_URL, SOCIAL_LOGIN_PLATFORM } from "@/constants";

type LoginPageLocationState = {
  inviteToken?: string;
};

const LoginPage = () => {
  const { openSnackbar } = useSnackbar();
  const { state } = useLocation();

  const handleKakaoLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const locationState = state as LoginPageLocationState;
    const inviteToken = locationState?.inviteToken || "";

    location.href = KAKAO_OAUTH_URL.AUTHORIZE_CODE(inviteToken);
  };

  const handleNaverLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    openSnackbar("준비 중! 🤗");
  };

  const handleGoogleLoginButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    openSnackbar("준비 중! 🤗");
  };

  return (
    <StyledMain>
      <StyledTitle>
        <Logo />
        <div>내 마음을 편지로</div>
      </StyledTitle>
      <StyledSocialLoginButtonContainer>
        <SocialLoginButton
          platform={SOCIAL_LOGIN_PLATFORM.KAKAO}
          onClick={handleKakaoLoginButtonClick}
        />
        <SocialLoginButton
          platform={SOCIAL_LOGIN_PLATFORM.NAVER}
          onClick={handleNaverLoginButtonClick}
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100vh;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.colors.SKY_BLUE_300};

  @media only screen and (min-width: 960px) {
    font-size: 24px;
  }
`;

const StyledSocialLoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  button {
    width: 100%;

    @media only screen and (min-width: 960px) {
      width: 500px;
    }
  }
`;

export default LoginPage;
