import React from "react";
import styled from "@emotion/styled";

import { ValueOf } from "@/types";
import { SOCIAL_LOGIN_PLATFORM } from "@/constants";

import GoogleLogo from "@/assets/images/logo-google.png";
import KakaoLogo from "@/assets/images/logo-kakao.png";
import NaverLogo from "@/assets/images/logo-naver.png";

const LOGO_ICON = {
  GOOGLE: GoogleLogo,
  KAKAO: KakaoLogo,
  NAVER: NaverLogo,
};

const BUTTON_TEXT = {
  GOOGLE: "구글로 시작하기",
  KAKAO: "카카오로 시작하기",
  NAVER: "네이버로 시작하기",
};

interface SocialLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  platform: ValueOf<typeof SOCIAL_LOGIN_PLATFORM>;
}

const SocialLoginButton = ({ onClick, platform }: SocialLoginButtonProps) => {
  return (
    <StyledSocialLoginButton onClick={onClick}>
      <img src={LOGO_ICON[platform]} />
      {BUTTON_TEXT[platform]}
    </StyledSocialLoginButton>
  );
};

const StyledSocialLoginButton = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;

  padding: 0 20px;

  background-color: ${({ theme }) => theme.colors.GRAY_200};
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }

  img {
    width: 30px;
    height: 30px;

    margin-right: 12px;
  }
`;

export default SocialLoginButton;
