import { appClient, requestApi } from "@/api";

import { PostKakaoOauthRequest } from "@/types/apiRequest";

const postKakaoOauth = async ({
  authorizationCode,
  redirectUri,
}: PostKakaoOauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    })
  );

export { postKakaoOauth };
