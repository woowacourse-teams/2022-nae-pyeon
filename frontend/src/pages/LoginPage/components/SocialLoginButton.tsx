import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";

import KakaoLogo from "@/assets/images/logo-kakao.png";

const SocialLoginButton = ({ onClick }: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledSocialLoginButton onClick={onClick}>
      <img src={KakaoLogo} />
      카카오로 시작하기
    </StyledSocialLoginButton>
  );
};

const StyledSocialLoginButton = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;

  padding: 0 20px;

  background-color: ${({ theme }) => theme.colors.GRAY_100};
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }

  img {
    width: 30px;
    height: 30px;

    margin-right: 8px;
  }
`;

export default SocialLoginButton;
