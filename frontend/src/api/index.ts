import axios, { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

import ApiError from "@/util/ApiError";

import { ApiErrorResponse, ApiOptions } from "@/types/api";

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
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const { errorCode, message } = axiosError.response
        .data as ApiErrorResponse;

      throw new ApiError({
        errorCode,
        message,
        errorHandler: options?.onError,
      });
    }
  }
};

export { appClient, queryClient, setAppClientHeaderAuthorization, requestApi };
