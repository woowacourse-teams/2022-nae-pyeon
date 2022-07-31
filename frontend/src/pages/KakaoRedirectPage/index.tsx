import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { KAKAO_OAUTH_URL } from "@/constants";

const KakaoRedirectPage = () => {
  const searchParams = useLocation().search;
  const params = new URLSearchParams(searchParams);
  const authorizeCode = params.get("code");

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
        const userInfo = {
          platformType: "KAKAO",
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

    console.log(accessToken, userInfo);
  };

  useEffect(() => {
    loginWithkakaoOauth(authorizeCode as string);
  }, []);

  return <div>KakaoRedirectPage</div>;
};

export default KakaoRedirectPage;
