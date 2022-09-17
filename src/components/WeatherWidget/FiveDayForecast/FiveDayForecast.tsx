import { useEffect, useState } from "react";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale, { LocalesObjKey, OPENWEATHER_LANG_MAP } from "@/src/hooks/useLocale";
import { fetch5daysForecast } from "@/src/services/city.service";
import type { AdaptedForecast5ApiResponse } from "@/src/ts/interfaces";

import { FiveDayForecastItem } from "./FiveDayForecastItem";
import { ForecastTabs } from "./ForecastTabs";
import { adaptFiveDaysForecastApiRes, getFirstKeyOf } from "./helpers";

import styles from "./FiveDayForecast.module.scss";

const FiveDayForecast = () => {
  const { geoInfo } = useCityStore();
  const { locale } = useLocale();
  // local states
  const [forecastList, setForecastList] = useState<AdaptedForecast5ApiResponse | null>(null);
  const [selectedTabLabel, setSelectedTabLabel] = useState<string>("");

  const lang = OPENWEATHER_LANG_MAP[locale as LocalesObjKey];

  useEffect(() => {
    if (!geoInfo?.lat || !geoInfo?.lon) return;

    const { lat, lon } = geoInfo;

    fetch5daysForecast({ lat, lon, lang }).then((res) => {
      const adaptedForecasts = adaptFiveDaysForecastApiRes(res);
      setForecastList(adaptedForecasts);
      setSelectedTabLabel(getFirstKeyOf(adaptedForecasts));
    });
  }, [geoInfo, lang]);

  if (!forecastList) return null;

  const tabLabelsArr = Object.keys(forecastList);

  const listToRender = forecastList[selectedTabLabel].map((item) => {
    return <FiveDayForecastItem key={item.dt} item={item} />;
  });
  // handlers
  const handleTabSelection = (label: string) => () => {
    setSelectedTabLabel(label);
  };

  return (
    <div className={styles.wrapper}>
      <ForecastTabs
        labels={tabLabelsArr}
        selectedLabel={selectedTabLabel}
        onSelect={handleTabSelection}
      />
      {listToRender}
    </div>
  );
};

export default FiveDayForecast;
