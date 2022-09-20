import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { UserContext } from "@/context/UserContext";

import { postKakaoOauth } from "@/api/kakaoOauth";

import { CustomError } from "@/types";
import { postKakaoOauthRequest } from "@/types/apiRequest";

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteToken = params.get("state");

  const { mutate: kakaoOauthLogin } = useMutation(
    ({ authorizationCode, redirectUri }: postKakaoOauthRequest) =>
      postKakaoOauth({
        authorizationCode,
        redirectUri,
      }),
    {
      onSuccess: (data) => {
        if (data) {
          login(data.accessToken, data.id);

          if (inviteToken) {
            navigate(`/invite/${inviteToken}`, { replace: true });
            return;
          }

          navigate("/", { replace: true });
        }
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
    const redirectUri = process.env.KAKAO_REDIRECT_URL;
    if (!authorizationCode || !redirectUri) {
      return;
    }

    kakaoOauthLogin({
      authorizationCode,
      redirectUri,
    });
  }, []);

  return <div>KakaoRedirectPage</div>;
};

export default KakaoRedirectPage;
