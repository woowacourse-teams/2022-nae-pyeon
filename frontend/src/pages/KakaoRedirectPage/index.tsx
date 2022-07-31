import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UserContext } from "@/context/UserContext";

import appClient from "@/api";

import { KAKAO_OAUTH_URL } from "@/constants";
import { CustomError } from "@/types";

type UserInfo = {
  platformId: number;
  email: string;
  username: string;
  profileImageUrl: string;
};

type RequestLoginBody = UserInfo & {
  platformType: "KAKAO" | "NAVER" | "GOOGLE";
};

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const searchParams = useLocation().search;
  const params = new URLSearchParams(searchParams);
  const authorizeCode = params.get("code");

  const { login } = useContext(UserContext);

  const { mutate: requestLogin } = useMutation(
    ({
      platformType,
      platformId,
      email,
      username,
      profileImageUrl,
    }: RequestLoginBody) => {
      return appClient
        .post(`/login`, {
          platformType,
          platformId,
          email,
          username,
          profileImageUrl,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        login(data.accessToken, data.id);
        navigate(`/`, { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const requestKakaoToken = (authorizeCode: string) =>
    axios
      .post(
        KAKAO_OAUTH_URL.TOKEN(authorizeCode),
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const { access_token } = response.data;
        return access_token;
      });

  const requestKakaoUserInfo = (accessToken: string) =>
    axios
      .get(KAKAO_OAUTH_URL.USER_INFO, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then(({ data }) => {
        const userInfo: UserInfo = {
          platformId: data.id,
          email: data.kakao_account.email,
          username: data.kakao_account.profile.nickname,
          profileImageUrl: data.kakao_account.profile.profile_image_url,
        };
        return userInfo;
      });

  const loginWithkakaoOauth = async (authorizeCode: string) => {
    const accessToken = await requestKakaoToken(authorizeCode);
    const userInfo = await requestKakaoUserInfo(accessToken);
    requestLogin({
      ...userInfo,
      platformType: "KAKAO",
    });
  };

  useEffect(() => {
    loginWithkakaoOauth(authorizeCode as string);
  }, []);

  return <div>KakaoRedirectPage</div>;
};

export default KakaoRedirectPage;
