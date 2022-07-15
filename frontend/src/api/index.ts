import axios from "axios";
import { API_URL } from "@/constants";

const accessToken = "accessToken";

const appClient = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default appClient;
