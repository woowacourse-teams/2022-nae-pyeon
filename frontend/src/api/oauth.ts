import { appClient, requestApi } from "@/api";
import { OauthRequest } from "@/types/apiRequest";

const postKakaoOauth = async ({
  authorizationCode,
  redirectUri,
}: OauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    })
  );

const postGoogleOauth = async ({
  authorizationCode,
  redirectUri,
}: OauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/google", {
      authorizationCode,
      redirectUri,
    })
  );

export { postKakaoOauth, postGoogleOauth };
