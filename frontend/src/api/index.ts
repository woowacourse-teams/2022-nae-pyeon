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

const requestApi = async (request: () => Promise<any>) => {
  const { data } = await request();

  return data;
};

export { appClient, queryClient, setAppClientHeaderAuthorization, requestApi };
