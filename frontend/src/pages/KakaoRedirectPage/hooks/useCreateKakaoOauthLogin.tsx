import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "@/context/UserContext";

import { postKakaoOauth } from "@/api/kakaoOauth";

import { PostKakaoOauthResponse } from "@/types/apiResponse";

interface PostKakaoOauthVariables {
  authorizationCode: string;
  redirectUri: string;
}

const useCreateKakaoOauthLogin = (inviteCode: string | null) => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const { mutate: kakaoOauthLogin } = useMutation<
    PostKakaoOauthResponse,
    AxiosError,
    PostKakaoOauthVariables
  >(
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

  return kakaoOauthLogin;
};

export default useCreateKakaoOauthLogin;
