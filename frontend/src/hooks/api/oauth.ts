import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { UserContext } from "@/context/UserContext";

import { postGoogleOauth, postKakaoOauth } from "@/api/oauth";

import { OauthRequest } from "@/types/apiRequest";
import { OauthResponse } from "@/types/apiResponse";

const useCreateGoogleOauthLogin = (inviteCode: string | null) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return useMutation<OauthResponse, AxiosError, OauthRequest>(
    ({ authorizationCode, redirectUri }) =>
      postGoogleOauth({
        authorizationCode,
        redirectUri,
      }),
    {
      onSuccess: (data) => {
        if (data) {
          const { accessToken, refreshToken, id } = data;
          login({ accessToken, refreshToken, memberId: id });

          if (inviteCode) {
            navigate(`/invite/${inviteCode}`, { replace: true });
            return;
          }

          navigate("/", { replace: true });
        }
      },
    }
  );
};

const useCreateKakaoOauthLogin = (inviteCode: string | null) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return useMutation<OauthResponse, AxiosError, OauthRequest>(
    ({ authorizationCode, redirectUri }) =>
      postKakaoOauth({
        authorizationCode,
        redirectUri,
      }),
    {
      onSuccess: (data) => {
        if (data) {
          const { accessToken, refreshToken, id } = data;
          login({ accessToken, refreshToken, memberId: id });

          if (inviteCode) {
            navigate(`/invite/${inviteCode}`, { replace: true });
            return;
          }

          navigate("/", { replace: true });
        }
      },
    }
  );
};

export { useCreateGoogleOauthLogin, useCreateKakaoOauthLogin };
