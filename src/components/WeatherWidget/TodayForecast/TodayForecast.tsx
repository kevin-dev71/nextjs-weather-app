import { useEffect, useState } from "react";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale, { LocalesObjKey, OPENWEATHER_LANG_MAP } from "@/src/hooks/useLocale";
import { fetchWeatherByCityName } from "@/src/services/city.service";
import { WeatherByCityApiResponse } from "@/src/ts/interfaces";
import { getDateFromDateTime } from "@/src/utils/getDateFromDatetime";
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

  // TODO: adapter for this data
  const { weather, dt, main, wind, sys } = weatherStats;
  const { weekday, monthName, day } = getDateFromDateTime(dt);
  const { hour: sunsetHour } = getDateFromDateTime(sys.sunset);
  const { hour: sunriseHour } = getDateFromDateTime(sys.sunrise);

  // console.log(weatherStats);
  // console.log("====");
  // console.log(city);

  const footerItemsArr = [
    {
      label: t("feel-like"),
      value: `${Math.trunc(main.feels_like)} °C`,
    },
    {
      label: t("temp-min"),
      value: `${Math.trunc(main.temp_min)} °C`,
    },
    {
      label: t("temp-max"),
      value: `${Math.trunc(main.temp_max)} °C`,
    },
    {
      label: t("weather"),
      value: weather[0].description,
    },
    {
      label: t("wind-speed"),
      value: `${wind.speed} ${t("wind-speed-unit")}`,
    },
    {
      label: t("sunrise"),
      value: sunriseHour,
    },
    {
      label: t("sunset"),
      value: sunsetHour,
    },
  ];

  const footerItemstorender = footerItemsArr.map(({ label, value }) => (
    <ForecastFooterItem key={label} {...{ label, value }} />
  ));

  return (
    <section className={styles.wrapper}>
      <div className={styles.forecast__content}>
        <div className={styles.forecast__header}>
          <div className={styles["forecast__header-img"]}>
            <img src={getOpenWeatherIconUrlByIconId(weather[0].icon)} alt="icon" />
          </div>
          <div className={styles["forecast__header-body"]}>
            <span className={styles["forecast__header-body--title"]}>{t("today")}</span>
            <span
              className={styles["forecast__header-body--subtitle"]}
            >{`${weekday}, ${day} ${monthName}`}</span>
          </div>
        </div>
        <div className={styles.forecast__body}>
          <div className={styles["forecast__body-temp"]}>
            <span className={styles.temp}>{Math.trunc(main.temp)}</span>
            <span className={styles.symbol}>°C</span>
          </div>
          <div className={styles["forecast__body-city"]}>
            <span>{`${city.geoInfo?.name}, ${city.geoInfo?.country}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.forecast__footer}>{footerItemstorender}</div>
    </section>
  );
};

const ForecastFooterItem = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className={styles["forecast__footer-item"]}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default TodayForecast;
