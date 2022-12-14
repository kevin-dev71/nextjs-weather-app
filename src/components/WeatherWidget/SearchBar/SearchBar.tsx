import { useRef } from "react";
import dynamic from "next/dynamic";

import useCityStore from "@/src/hooks/useCityStore";
import useLocale from "@/src/hooks/useLocale";
import useOutsideAlerter from "@/src/hooks/useOutsideAlerter";
import type { GeocodingApiResponse } from "@/src/ts/interfaces";
import { classnames } from "@/src/utils/classnames";

import useSearchBarWithSuggestion from "./hook/useSearchBarWithSuggestion";

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

const SearchBar = ({ onSubmit }: { onSubmit: () => void }) => {
  const searchBoxRef = useRef(null);
  const scrollRef = useRef(null);
  const { t } = useLocale();
  const { setGeoInfo } = useCityStore();
  const {
    handleOnBlur,
    searchResults,
    isFetchingSearchResults,
    handleInputChange,
    searchParam,
    selectedSuggestionIndex,
  } = useSearchBarWithSuggestion(scrollRef, { onSubmit: handleSelection });

  // this is to handle click outside the searchbox, so can close the suggestion box
  useOutsideAlerter(searchBoxRef, () => handleOnBlur());

  const isEmptySearchResults = searchResults.length <= 0 && !isFetchingSearchResults;

  function handleSelection(geoCity: GeocodingApiResponse) {
    return () => {
      setGeoInfo(geoCity);
      onSubmit();
      handleOnBlur();
    };
  }

  // RENDERS
  const suggestionResultsToRender = searchResults.map((searchSuggestion, index) => {
    const { lat, lon, name, state, country } = searchSuggestion;
    const isSelected = index === selectedSuggestionIndex;
    const compundStyle = classnames(
      styles["searchbox__suggestion-item"],
      isSelected ? styles.selected : ""
    );

    return (
      <div
        key={lat + lon}
        className={compundStyle}
        ref={index === selectedSuggestionIndex ? scrollRef : null}
        onClick={handleSelection(searchSuggestion)}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <div className={styles.city__name}>{`${name ?? ""}`}</div>
        <div className={styles.city__state}>{` ${state ?? name ?? ""}, ${country ?? ""}`}</div>
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchbox} ref={searchBoxRef}>
        <IconInput
          placeholder={t("search-placeholder")}
          onChange={handleInputChange}
          value={searchParam}
        />
        {searchParam.length > 0 && (
          <div className={styles.searchbox__suggestion}>
            {isFetchingSearchResults && <div>{t("searching")}....</div>}
            {isEmptySearchResults && <div>{t("no-results")}</div>}
            {suggestionResultsToRender}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
