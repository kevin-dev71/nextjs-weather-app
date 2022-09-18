import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale, { LocalesObjKey, OPENWEATHER_LANG_MAP } from "@/src/hooks/useLocale";
import { CITY_STATE_STATUS } from "@/src/redux/slices/city.slice";
import { fetchWeatherByCoords } from "@/src/services/city.service";
import { GeocodingApiResponse, WeatherByCityApiResponse } from "@/src/ts/interfaces";
import { getDateFromDateTime } from "@/src/utils/getDateFromDatetime";
import { getOpenWeatherIconUrlByIconId } from "@/src/utils/getOpenWeatherIconUrlByIconId";

import styles from "./TodayForecast.module.scss";

const TodayForecast = () => {
  const { city, handleFavorite, isInfavorite } = useCityStore();
  const { locale, t } = useLocale();
  // Local states
  const [weatherStats, setWeatherStats] = useState<WeatherByCityApiResponse | null>(null);

  const lang = OPENWEATHER_LANG_MAP[locale as LocalesObjKey];

  const { hour: timeNow } = getDateFromDateTime(Math.floor(Date.now() / 1000));

  useEffect(() => {
    // Will deprecated soon and not accurated fetching by name
    // better use https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}
    // fetchWeatherByCityName({ city: cityName, lang }).then((res) => {
    //   setWeatherStats(res);
    // });
    if (!city?.geoInfo) return;
    const { lat, lon } = city.geoInfo;
    fetchWeatherByCoords({ lat, lon, lang }).then((res) => {
      setWeatherStats(res);
    });
  }, [city.geoInfo, lang]);

  if (city.status === CITY_STATE_STATUS.LOADING) return <div>Loading...</div>;

  if (!weatherStats) return null;

  const handleFavoriteClick = (citySelection: GeocodingApiResponse | null) => () => {
    // CODE SMELL
    if (!citySelection) return;
    handleFavorite(citySelection);
  };

  // TODO: adapter for this data
  const { weather, dt, main, wind, sys } = weatherStats;
  const { weekday, monthName, day } = getDateFromDateTime(dt);
  const { hour: sunsetHour } = getDateFromDateTime(sys.sunset);
  const { hour: sunriseHour } = getDateFromDateTime(sys.sunrise);

  // RENDERS
  const weatherStatsArr = [
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

  const weatherStatsTorender = weatherStatsArr.map(({ label, value }) => (
    <ForecastFooterItem key={label} {...{ label, value }} />
  ));

  const favoriteIconToRender = isInfavorite(city.geoInfo) ? (
    <AiFillStar onClick={handleFavoriteClick(city?.geoInfo)} />
  ) : (
    <AiOutlineStar onClick={handleFavoriteClick(city?.geoInfo)} />
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.forecast__content}>
        <div className={styles.forecast__header}>
          <div className={styles["forecast__header-img"]}>
            <Image
              width={80}
              height={80}
              src={getOpenWeatherIconUrlByIconId(weather[0].icon)}
              alt="icon"
            />
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
            <div className={styles["forecast__body-city--name"]}>
              <span>{`${city.geoInfo?.name}, ${city.geoInfo?.country}`}</span>
              {favoriteIconToRender}
            </div>
            <span>{timeNow}</span>
          </div>
        </div>
      </div>
      <div className={styles.forecast__footer}>{weatherStatsTorender}</div>
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
