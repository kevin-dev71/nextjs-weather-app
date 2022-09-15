import { GEO_URL } from "@/src/config/routes";
import { apiAxiosInstance } from "@/src/lib/axios/apiAxiosInstance";
import type { GeocodingApiResponse } from "@/src/ts/interfaces/GeocodingApiResponse.interfaces";

export const fetchCityGeo = async (city: string) => {
  const { data } = await apiAxiosInstance.get(`${GEO_URL}?city=${city}`);
  return data as GeocodingApiResponse[];
};
