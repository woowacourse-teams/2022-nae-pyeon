import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UserContext } from "@/context/UserContext";

import { appClient } from "@/api";
import { requestKakaoToken, requestKakaoUserInfo } from "@/api/kakaoOauth";

import { CustomError } from "@/types";
import { RequestOauthLoginBody } from "@/types/oauth";

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const params = new URLSearchParams(useLocation().search);
  const authorizeCode = params.get("code");

  const { mutate: requestOauthLogin } = useMutation(
    ({
      platformType,
      platformId,
      email,
      username,
      profileImageUrl,
    }: RequestOauthLoginBody) =>
      appClient
        .post(`/login`, {
          platformType,
          platformId,
          email,
          username,
          profileImageUrl,
        })
        .then((response) => response.data),
    {
      onSuccess: (data) => {
        login(data.accessToken, data.id);
        navigate(`/`, { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          console.error(customError.message);
        }
      },
    }
  );

  const loginWithkakaoOauth = async () => {
    try {
      const accessToken = await requestKakaoToken(authorizeCode as string);
      const userInfo = await requestKakaoUserInfo(accessToken);

      requestOauthLogin({
        ...userInfo,
        platformType: "KAKAO",
      } as RequestOauthLoginBody);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    loginWithkakaoOauth();
  }, []);

  return <div>KakaoRedirectPage</div>;
};

export default KakaoRedirectPage;
