import { useEffect, useState } from "react";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale, { LocalesObjKey, OPENWEATHER_LANG_MAP } from "@/src/hooks/useLocale";
import { fetch5daysForecast } from "@/src/services/city.service";
import { Forecast5ApiResponse } from "@/src/ts/interfaces";

import styles from "./FiveDayForecast.module.scss";

const FiveDayForecast = () => {
  const { geoInfo } = useCityStore();
  const { locale } = useLocale();
  // local states
  const [forecastList, setForecastList] = useState<Forecast5ApiResponse | null>(null);

  const lang = OPENWEATHER_LANG_MAP[locale as LocalesObjKey];

  useEffect(() => {
    if (!geoInfo?.lat || !geoInfo?.lon) return;
    const { lat, lon } = geoInfo;
    fetch5daysForecast({ lat, lon, lang }).then((res) => {
      setForecastList(res);
    });
  }, [geoInfo, lang]);

  if (!forecastList) return null;

  const listToRender = forecastList.list.map((item) => {
    return <div key={item.dt}>Temp: {item.main.temp}</div>;
  });

  return <div className={styles.wrapper}>{listToRender}</div>;
};
export default FiveDayForecast;
