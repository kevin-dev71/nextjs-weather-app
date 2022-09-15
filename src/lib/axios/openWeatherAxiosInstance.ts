import axios from "axios";

import { OPENWEATHER_API_URL } from "@/src/config/constants";

const openWeatherAxiosInstance = axios.create({
  baseURL: OPENWEATHER_API_URL,
});

openWeatherAxiosInstance.interceptors.request.use(async (req) => {
  return req;
});

openWeatherAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export { openWeatherAxiosInstance };
