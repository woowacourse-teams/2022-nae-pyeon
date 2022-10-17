import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { UserContext } from "@/context/UserContext";

import { postGoogleOauth } from "@/api/oauth";

import { OauthRequest } from "@/types/apiRequest";

const useCreateGoogleOauthLogin = (inviteCode: string | null) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return useMutation(
    ({ authorizationCode, redirectUri }: OauthRequest) =>
      postGoogleOauth({
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

export default useCreateGoogleOauthLogin;
