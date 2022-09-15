import axios from "axios";

import { appClient, handleApiError } from "@/api";
import ApiError from "@/util/ApiError";

import { RequestKakaoOauthBody } from "@/types/oauth";
import { ApiOptions } from "@/types";

const postKakaoOauth = async (
  { authorizationCode, redirectUri }: RequestKakaoOauthBody,
  options?: ApiOptions
) => {
  try {
    const response = await appClient.post("/oauth/kakao", {
      authorizationCode,
      redirectUri,
    });

    return response.data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

export { postKakaoOauth };
