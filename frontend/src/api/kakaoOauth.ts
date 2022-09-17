import { appClient, requestApi } from "@/api";

import { KakaoOauthRequest } from "@/types/api";
import { ApiOptions } from "@/types";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: KakaoOauthRequest,
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
