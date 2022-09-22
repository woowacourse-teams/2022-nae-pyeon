import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";
import { postGoogleOauthRequest } from "@/types/apiRequest";

const postGoogleOauth = async (
  { authorizationCode, redirectUri }: postGoogleOauthRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.post("/oauth/google", {
        authorizationCode,
        redirectUri,
      }),
    options
  );

export { postGoogleOauth };
