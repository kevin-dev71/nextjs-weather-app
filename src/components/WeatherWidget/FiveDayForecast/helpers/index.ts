import type { AdaptedForecast5ApiResponse, Forecast5ApiResponse } from "@/src/ts/interfaces";
import { getDateFromDateTime } from "@/src/utils/getDateFromDatetime";

export const adaptFiveDaysForecastApiRes = (res: Forecast5ApiResponse) => {
  const forecastGroupedBydayArr = res.list.reduce((acc, item) => {
    const { dt } = item;
    const { weekday, monthName, day } = getDateFromDateTime(dt);
    const key = `${weekday}, ${day} ${monthName}`;
    if (acc[key]) {
      const result = [...acc[key], item];
      acc[key] = result;
      return acc;
    }
    acc[key] = [item];
    return acc;
  }, {} as AdaptedForecast5ApiResponse);

  return forecastGroupedBydayArr;
};

export const getFirstKeyOf = <T>(object: { [key: string]: T }) => {
  return Object.keys(object)[0];
};
