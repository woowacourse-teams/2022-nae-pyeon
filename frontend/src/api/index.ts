import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

const queryClient = new QueryClient();

const setAppClientHeaderAuthorization = (accessToken: string) => {
  appClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export { appClient, queryClient, setAppClientHeaderAuthorization };
