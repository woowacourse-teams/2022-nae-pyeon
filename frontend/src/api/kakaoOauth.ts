import { appClient } from "@/api";

import { RequestKakaoOauthBody } from "@/types/oauth";

const postKakaoOauth = async ({
  authorizationCode,
  redirectUri,
}: RequestKakaoOauthBody) => {
  const response = await appClient.post("/oauth/kakao", {
    authorizationCode,
    redirectUri,
  });
  return response.data;
};

export { postKakaoOauth };
