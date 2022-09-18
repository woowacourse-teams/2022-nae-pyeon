import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";
import { postKakaoOauthRequest } from "@/types/apiRequest";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: postKakaoOauthRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.post("/oauth/kakao", {
        authorizationCode,
        redirectUri,
      }),
    options
  );

export { postKakaoOauth };
