import { appClient } from "@/api";

import { RequesNaverOauthBody } from "@/types/oauth";

const postNaverOauth = async ({
  authorizationCode,
  redirectUri,
  state,
}: RequesNaverOauthBody) => {
  const response = await appClient.post("/oauth/naver", {
    authorizationCode,
    redirectUri,
    state,
  });
  return response.data;
};

export { postNaverOauth };
