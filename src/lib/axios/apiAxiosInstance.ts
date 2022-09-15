import axios from "axios";

import { API_URL } from "@/src/config/constants";

const apiAxiosInstance = axios.create({
  baseURL: API_URL,
});

apiAxiosInstance.interceptors.request.use(async (req) => {
  return req;
});

apiAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export { apiAxiosInstance };
