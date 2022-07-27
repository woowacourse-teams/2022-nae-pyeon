import axios from "axios";
import { getCookie } from "@/util/cookie";

const accessToken = getCookie("accessToken") || "";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

appClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export default appClient;
