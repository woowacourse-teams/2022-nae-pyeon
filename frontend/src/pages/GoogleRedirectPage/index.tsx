import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useCreateGoogleOauthLogin } from "@/hooks/api/oauth";

import Loading from "@/components/Loading";

const GoogleRedirectPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteCode = params.get("state");

  const { mutate: googleOauthLogin } = useCreateGoogleOauthLogin(inviteCode);

  useEffect(() => {
    const redirectUri = process.env.GOOGLE_REDIRECT_URL;
    if (!authorizationCode || !redirectUri) {
      return;
    }

    googleOauthLogin({
      authorizationCode,
      redirectUri,
    });
  }, []);

  return <Loading />;
};

export default GoogleRedirectPage;
