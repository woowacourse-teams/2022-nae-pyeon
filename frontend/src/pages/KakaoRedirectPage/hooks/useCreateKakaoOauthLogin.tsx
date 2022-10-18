import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { UserContext } from "@/context/UserContext";

import { postKakaoOauth } from "@/api/oauth";

import { OauthResponse } from "@/types/apiResponse";
import { OauthRequest } from "@/types/apiRequest";

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
          login(data.accessToken, data.id);

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

export default useCreateKakaoOauthLogin;
