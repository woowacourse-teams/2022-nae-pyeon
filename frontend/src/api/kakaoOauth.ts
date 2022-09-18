import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";
import { postKakaoOauthRequest } from "@/types/apiRequest";
import { PostKakaoOauthResponse } from "@/types/apiResponse";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: postKakaoOauthRequest,
  options?: ApiOptions
) =>
  requestApi<PostKakaoOauthResponse>(
    () =>
      appClient.post("/oauth/kakao", {
        authorizationCode,
        redirectUri,
      }),
    options
  );

export { postKakaoOauth };
