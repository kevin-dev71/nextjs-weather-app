import { useEffect, useState } from "react";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale, { LocalesObjKey, OPENWEATHER_LANG_MAP } from "@/src/hooks/useLocale";
import { fetchWeatherByCityName } from "@/src/services/city.service";
import { WeatherByCityApiResponse } from "@/src/ts/interfaces";
import { getOpenWeatherIconUrlByIconId } from "@/src/utils/getOpenWeatherIconUrlByIconId";

import styles from "./TodayForecast.module.scss";

const TodayForecast = () => {
  const { cityName, city } = useCityStore();
  const { locale, t } = useLocale();
  // Local states
  const [weatherStats, setWeatherStats] = useState<WeatherByCityApiResponse | null>(null);

  const lang = OPENWEATHER_LANG_MAP[locale as LocalesObjKey];

  useEffect(() => {
    fetchWeatherByCityName({ city: cityName, lang }).then((res) => {
      setWeatherStats(res);
    });
  }, [cityName, lang]);

  if (!weatherStats) return null;

  const { weather, dt, main, wind, sys } = weatherStats;
  // console.log(weatherStats);
  // console.log("====");
  // console.log(city);

  return (
    <section className={styles.wrapper}>
      <div className={styles.forecast__header}>
        <div className={styles["forecast__header-img"]}>
          <img src={getOpenWeatherIconUrlByIconId(weather[0].icon)} alt="icon" />
        </div>
        <div className={styles["forecast__header-body"]}>
          <p>{t("today")}</p>
          <p>{dt}</p>
        </div>
      </div>
      <div className={styles.forecast__body}>
        <div>
          <span>{Math.trunc(main.temp)}</span>
          <span>°C</span>
        </div>
        <div>
          <span>{`${city.geoInfo?.name}, ${city.geoInfo?.country}`}</span>
        </div>
      </div>
      <div className={styles.forecast__footer}>
        <div className={styles["forecast__footer-item"]}>
          <span>Feels like</span>
          <span>{main.feels_like}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Temp min</span>
          <span>{main.temp_min}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Feels like</span>
          <span>{main.temp_max}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Weather</span>
          <span>{`${weather[0].main}, ${weather[0].description}`}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Wind Speed</span>
          <span>{wind.speed}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Sunset</span>
          <span>{sys.sunset}</span>
        </div>
        <div className={styles["forecast__footer-item"]}>
          <span>Sunrise</span>
          <span>{sys.sunrise}</span>
        </div>
      </div>
    </section>
  );
};

export default TodayForecast;
