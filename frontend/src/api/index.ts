import axios from "axios";

const appClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
});

export default appClient;
