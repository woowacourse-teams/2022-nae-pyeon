import { appClient, requestApi } from "@/api";

import { RequestKakaoOauthBody } from "@/types/oauth";
import { ApiOptions } from "@/types";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: RequestKakaoOauthBody,
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
