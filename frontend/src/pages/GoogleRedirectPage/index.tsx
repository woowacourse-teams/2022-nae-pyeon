import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { postGoogleOauth } from "@/api/googleOauth";

import { UserContext } from "@/context/UserContext";

import { postGoogleOauthRequest } from "@/types/apiRequest";
import { PostGoogleOauthResponse } from "@/types/apiResponse";

interface googleOauthLoginVariable {
  authorizationCode: string;
  redirectUri: string;
}

const GoogleRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteCode = params.get("state");

  const { mutate: GoogleOauthLogin } = useMutation<
    PostGoogleOauthResponse,
    AxiosError,
    googleOauthLoginVariable
  >(
    ({ authorizationCode, redirectUri }: postGoogleOauthRequest) =>
      postGoogleOauth({
        authorizationCode,
        redirectUri,
      }),
    {
      onSuccess: (data) => {
        const { accessToken, refreshToken, id } = data;
        if (data) {
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

  useEffect(() => {
    const redirectUri = process.env.GOOGLE_REDIRECT_URL;
    if (!authorizationCode || !redirectUri) {
      return;
    }

    GoogleOauthLogin({
      authorizationCode,
      redirectUri,
    });
  }, []);

  return <div>GoogleRedirectPage</div>;
};

export default GoogleRedirectPage;
