import { appClient, requestApi } from "@/api";
import { postGoogleOauthRequest } from "@/types/apiRequest";

const postGoogleOauth = async ({
  authorizationCode,
  redirectUri,
}: postGoogleOauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/google", {
      authorizationCode,
      redirectUri,
    })
  );

export { postGoogleOauth };
