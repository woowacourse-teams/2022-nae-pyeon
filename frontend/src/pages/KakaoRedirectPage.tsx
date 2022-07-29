import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { KAKAO_OAUTH_URL } from "@/constants";

const KakaoRedirectPage = () => {
  const searchParams = useLocation().search;
  const params = new URLSearchParams(searchParams);
  const authorize_code = params.get("code");

  useEffect(() => {
    axios
      .post(
        KAKAO_OAUTH_URL.TOKEN(authorize_code as string),
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const { access_token } = response.data;

        axios
          .get(KAKAO_OAUTH_URL.USER_INFO, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
          .then((response) => {
            console.log(response);
            // response의 값으로 로그인 요청 필요
          });
      });
  }, []);

  return <div>KakaoRedirectPage</div>;
};

export default KakaoRedirectPage;
