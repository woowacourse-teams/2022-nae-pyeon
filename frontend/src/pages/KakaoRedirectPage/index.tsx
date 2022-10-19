import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import useCreateKakaoOauthLogin from "@/pages/KakaoRedirectPage/hooks/useCreateKakaoOauthLogin";

import Loading from "@/components/Loading";

const KakaoRedirectPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const authorizationCode = params.get("code");
  const inviteCode = params.get("state");

  const { mutate: kakaoOauthLogin } = useCreateKakaoOauthLogin(inviteCode);

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

  return <Loading />;
};

export default KakaoRedirectPage;
