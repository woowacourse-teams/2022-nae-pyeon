import { appClient, requestApi } from "@/api";
import { PostGoogleOauthRequest } from "@/types/apiRequest";

const postGoogleOauth = async ({
  authorizationCode,
  redirectUri,
}: PostGoogleOauthRequest) =>
  requestApi(() =>
    appClient.post("/oauth/google", {
      authorizationCode,
      redirectUri,
    })
  );

export { postGoogleOauth };
