import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCreateKakaoOauthLogin from "./hooks/useCreateKakaoOauthLogin";

const KakaoRedirectPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteToken = params.get("state");

  const kakaoOauthLogin = useCreateKakaoOauthLogin(inviteToken);

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
