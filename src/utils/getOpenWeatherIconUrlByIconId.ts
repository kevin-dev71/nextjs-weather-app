import { OPENWEATHER_IMG_URL } from "@/src/config/constants";

export const getOpenWeatherIconUrlByIconId = (iconId: string) => {
  return `${OPENWEATHER_IMG_URL}/${iconId}.png`;
};
