import axios from "axios";

import { appClient, handleApiError } from "@/api";
import ApiError from "@/util/ApiError";

import { ApiOptions } from "@/types";

const getMyInfo = async (options?: ApiOptions) => {
  try {
    const { data } = await appClient.get("/members/me");

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getMyInfoWithAccessToken = async (
  accessToken: string | null,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.get("/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken || ""}`,
      },
    });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getMyReceivedRollingpapers = async (
  page = 0,
  count = 5,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.get(
      `/members/me/rollingpapers/received?page=${page}&count=${count}`
    );

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getMySentMessage = async (page = 0, count = 5, options?: ApiOptions) => {
  try {
    const { data } = await appClient.get(
      `/members/me/messages/written?page=${page}&count=${count}`
    );

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const putMyNickname = async (username: string, options?: ApiOptions) => {
  try {
    const { data } = await appClient.put("/members/me", { username });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessage,
  putMyNickname,
};
