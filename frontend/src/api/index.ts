import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

export const queryClient = new QueryClient();

export default appClient;
