import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UserContext } from "@/context/UserContext";

import { postNaverOauth } from "@/api/naverOauth";

import { CustomError } from "@/types";
import { RequesNaverOauthBody } from "@/types/oauth";

const NaverRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteToken = params.get("state");

  const state = inviteToken ? inviteToken : Math.random().toString();

  const { mutate: naverOauthLogin } = useMutation(
    ({ authorizationCode, redirectUri }: RequesNaverOauthBody) =>
      postNaverOauth({
        authorizationCode,
        redirectUri,
        state,
      }),
    {
      onSuccess: (data) => {
        login(data.accessToken, data.id);

        if (inviteToken) {
          navigate(`/invite/${inviteToken}`, { replace: true });
          return;
        }

        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          console.error(customError.message);
        }
      },
    }
  );

  useEffect(() => {
    const redirectUri = process.env.NAVER_REDIRECT_URL;
    if (!authorizationCode || !redirectUri) {
      return;
    }

    naverOauthLogin({
      authorizationCode,
      redirectUri,
      state,
    });
  }, []);

  return <div>NaverRedirectPage</div>;
};

export default NaverRedirectPage;
