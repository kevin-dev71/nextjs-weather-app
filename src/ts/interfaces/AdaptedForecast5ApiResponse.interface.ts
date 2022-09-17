import { ForecastListItem } from "./Forecast5ApiResponse.interface";

export interface AdaptedForecast5ApiResponse {
  [key: string]: ForecastListItem[];
}
