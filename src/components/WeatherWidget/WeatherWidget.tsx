import dynamic from "next/dynamic";

import useLocale from "@/src/hooks/useLocale";

import styles from "./WeatherWidget.module.scss";

const SearchBar = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/SearchBar").then(
      ({ SearchBar: Component }) => Component
    ),
  {
    ssr: false,
  }
);

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

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.forecast}>
          <SearchBar />
          <h1>{t("weather-forecast-title")}</h1>
          <FavoriteCities />
          <FiveDayForecast />
        </div>
        <div className={styles.today}>
          <LanguageSelector />
          <TodayForecast />
        </div>
      </section>
    </main>
  );
};

export default WeatherWidget;
