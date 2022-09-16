import dynamic from "next/dynamic";

import useLocale from "@/src/hooks/useLocale";

import styles from "./SearchBar.module.scss";

const IconInput = dynamic<any>(
  () =>
    import("@/src/components/WeatherWidget/IconInput").then(
      ({ IconInput: Component }) => Component
    ),
  {
    ssr: false,
  }
);

const SearchBar = () => {
  const { t } = useLocale();

  return (
    <div className={styles.wrapper}>
      <IconInput placeholder={t("search-placeholder")} />
    </div>
  );
};

export default SearchBar;
