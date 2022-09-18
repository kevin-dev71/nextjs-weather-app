import { useState } from "react";
import dynamic from "next/dynamic";

import useLocale from "@/src/hooks/useLocale";
import { classnames } from "@/src/utils/classnames";

import styles from "./WeatherWidget.module.scss";

// TODO: get Props of dynamic component
const SearchBar = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/SearchBar").then(
      ({ SearchBar: Component }) => Component
    ),
  {
    ssr: false,
  }
);

// TODO: get Props of dynamic component
const FavoriteCities = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/FavoriteCities").then(
      ({ FavoriteCities: Component }) => Component
    ),
  {
    ssr: false,
  }
);

const LanguageSelector = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/LanguageSelector").then(
      ({ LanguageSelector: Component }) => Component
    ),
  {
    ssr: false,
  }
);

const TodayForecast = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/TodayForecast").then(
      ({ TodayForecast: Component }) => Component
    ),
  {
    ssr: false,
  }
);

const FiveDayForecast = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/FiveDayForecast").then(
      ({ FiveDayForecast: Component }) => Component
    ),
  {
    ssr: false,
  }
);

const WeatherWidget = () => {
  const { t } = useLocale();
  const [showForecast, setShowForecast] = useState(false);

  const handleShowForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <div className={classnames(styles.forecast, showForecast ? styles.visible : "")}>
          <SearchBar onSubmit={() => setShowForecast(false)} />
          <h1>{t("weather-forecast-title")}</h1>
          <FavoriteCities />
          <FiveDayForecast />
        </div>
        <div className={styles.today}>
          <LanguageSelector {...{ handleShowForecast, showForecast }} />
          <TodayForecast />
        </div>
      </section>
    </main>
  );
};

export default WeatherWidget;
