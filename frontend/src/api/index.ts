import axios, { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/types/api";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

const queryClient = new QueryClient();

const setAppClientHeaderAuthorization = (accessToken: string) => {
  appClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const setQueryClientErrorHandler = (
  errorHandler: (error: AxiosError<ApiErrorResponse>) => void
) => {
  queryClient.setDefaultOptions({
    queries: {
      useErrorBoundary: (error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const errorStatus = axiosError?.response?.status;
        return !!errorStatus && errorStatus >= 500;
      },
      onError: (err) => errorHandler(err as AxiosError<ApiErrorResponse>),
      retry: 0,
    },
    mutations: {
      useErrorBoundary: (error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const errorStatus = axiosError?.response?.status;
        return !!errorStatus && errorStatus >= 500;
      },
      onError: (error) => errorHandler(error as AxiosError<ApiErrorResponse>),
      retry: 0,
    },
  });
};

const requestApi = async (request: () => Promise<any>) => {
  const { data } = await request();

  return data;
};

export {
  appClient,
  queryClient,
  setAppClientHeaderAuthorization,
  setQueryClientErrorHandler,
  requestApi,
};
