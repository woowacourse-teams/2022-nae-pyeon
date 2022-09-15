import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

import ApiError from "@/util/ApiError";

import { ApiErrorResponse, ApiOptions } from "@/types";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

const queryClient = new QueryClient();

const setAppClientHeaderAuthorization = (accessToken: string) => {
  appClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const requestApi = async (
  request: () => Promise<any>,
  options?: ApiOptions
) => {
  try {
    const { data } = await request();

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiErrorResponse;
      const { errorCode, message } = customError;

      throw new ApiError({
        errorCode,
        message,
        errorHandler: options?.onError,
      });
    }
  }
};

export { appClient, queryClient, setAppClientHeaderAuthorization, requestApi };
