import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

import { RequestKakaoOauthBody } from "@/types/oauth";

const postKakaoOauth = async ({
  authorizationCode,
  redirectUri,
}: RequestKakaoOauthBody) => {
  try {
    const { data } = await appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

export { postKakaoOauth };
