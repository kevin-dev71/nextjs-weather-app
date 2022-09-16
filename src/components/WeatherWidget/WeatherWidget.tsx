import dynamic from "next/dynamic";

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

const WeatherWidget = () => (
  <main className={styles.wrapper}>
    <section className={styles.container}>
      <div className={styles.forecast}>
        <SearchBar />
        <FavoriteCities />
      </div>
      <div className={styles.today}>asd</div>
    </section>
  </main>
);

export default WeatherWidget;
