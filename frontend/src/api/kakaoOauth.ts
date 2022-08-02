import axios from "axios";

import { KAKAO_OAUTH_URL } from "@/constants";
import { OAuthUserInfo } from "@/types/oauth";

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
      const userInfo: OAuthUserInfo = {
        platformId: data.id,
        email: data.kakao_account.email,
        username: data.kakao_account.profile.nickname,
        profileImageUrl: data.kakao_account.profile.profile_image_url,
      };
      return userInfo;
    });

export { requestKakaoToken, requestKakaoUserInfo };
