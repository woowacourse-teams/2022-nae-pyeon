import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

import { RequestKakaoOauthBody } from "@/types/oauth";
import { ApiOptions } from "@/types";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: RequestKakaoOauthBody,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      const { errorCode, message } = customError;
      throw new ApiError({
        errorCode,
        message,
        errorHandler: options?.onError,
      });
    }
  }
};

export { postKakaoOauth };
