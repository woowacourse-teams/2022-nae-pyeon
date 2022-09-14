import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

const getMyInfo = async () => {
  try {
    const { data } = await appClient.get("/members/me");

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getMyInfoWithAccessToken = async (accessToken: string | null) => {
  try {
    const { data } = await appClient.get("/members/me", {
      headers: {
        Authorization: `Bearer ${accessToken || ""}`,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getMyReceivedRollingpapers = async (page = 0, count = 5) => {
  try {
    const { data } = await appClient.get(
      `/members/me/rollingpapers/received?page=${page}&count=${count}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getMySentMessage = async (page = 0, count = 5) => {
  try {
    const { data } = await appClient.get(
      `/members/me/messages/written?page=${page}&count=${count}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const putMyNickname = async (username: string) => {
  try {
    const { data } = await appClient.put("/members/me", { username });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

export {
  getMyInfo,
  getMyInfoWithAccessToken,
  getMyReceivedRollingpapers,
  getMySentMessage,
  putMyNickname,
};
