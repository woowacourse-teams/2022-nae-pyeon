import { appClient, requestApi } from "@/api";

import { postKakaoOauthRequest } from "@/types/apiRequest";

const postKakaoOauth = async ({
  authorizationCode,
  redirectUri,
}: postKakaoOauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    })
  );

export { postKakaoOauth };
