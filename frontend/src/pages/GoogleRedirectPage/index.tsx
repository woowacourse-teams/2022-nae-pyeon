import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { postGoogleOauth } from "@/api/googleOauth";
import { UserContext } from "@/context/UserContext";

import { CustomError } from "@/types";
import { postGoogleOauthRequest } from "@/types/apiRequest";

const GoogleRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteToken = params.get("state");

  const { mutate: GoogleOauthLogin } = useMutation(
    ({ authorizationCode, redirectUri }: postGoogleOauthRequest) =>
      postGoogleOauth({
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
