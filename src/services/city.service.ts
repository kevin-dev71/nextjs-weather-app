import { FORECAST5_URL, GEO_URL, WEATHER_URL } from "@/src/config/routes";
import { apiAxiosInstance } from "@/src/lib/axios/apiAxiosInstance";
import { OpenWeatherParams } from "@/src/ts/enums/OpenWeatherParams";
import type {
  Forecast5ApiResponse,
  GeocodingApiResponse,
  WeatherByCityApiResponse,
} from "@/src/ts/interfaces";

export const fetchCityGeo = async (
  city: string,
  controller: AbortController = new AbortController()
) => {
  const { data } = await apiAxiosInstance.get(`${GEO_URL}?city=${city}`, {
    signal: controller.signal,
  });
  return data as GeocodingApiResponse[];
};

// TODO: js doc will deprecated soon
export const fetchWeatherByCityName = async ({
  city,
  lang,
  units = OpenWeatherParams.METRIC,
}: {
  city: string;
  units?: OpenWeatherParams;
  lang: string;
}) => {
  const { data } = await apiAxiosInstance.get(
    `${WEATHER_URL}?city=${city}&units=${units}&lang=${lang}`
  );
  return data as WeatherByCityApiResponse;
};

export const fetchWeatherByCoords = async ({
  lon,
  lat,
  units = OpenWeatherParams.METRIC,
  lang,
}: {
  lon: number | string;
  lat: number | string;
  units?: OpenWeatherParams;
  lang: string;
}) => {
  const { data } = await apiAxiosInstance.get(
    `${WEATHER_URL}/coords/?lon=${lon}&lat=${lat}&units=${units}&lang=${lang}`
  );
  return data as WeatherByCityApiResponse;
};

export const fetch5daysForecast = async ({
  lat,
  lon,
  lang,
  units = OpenWeatherParams.METRIC,
}: {
  lat: number;
  lon: number;
  lang: string;
  units?: OpenWeatherParams;
}) => {
  const { data } = await apiAxiosInstance.get(
    `${FORECAST5_URL}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  return data as Forecast5ApiResponse;
};
