/* eslint-disable consistent-return */
import { useEffect, useReducer, useState } from "react";

import suggestionIndexReducer from "@/src/components/WeatherWidget/SearchBar/reducer/selectSuggestionIndex.reducer";
import useKeyPress from "@/src/hooks/useKeyPress";
import { fetchCityGeo } from "@/src/services/city.service";
import { GeocodingApiResponse } from "@/src/ts/interfaces";
import { debounce } from "@/src/utils/debounce";

const useSearchBarWithSuggestion = (
  scrollRef: any,
  { onSubmit }: { onSubmit: (arg: GeocodingApiResponse) => () => void }
) => {
  const [searchParam, setSearchParam] = useState("");
  const [isFetchingSearchResults, setIsFetchingSearchResults] = useState(true);
  const [searchResults, setSearchResults] = useState<GeocodingApiResponse[]>([]);

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const [selectedSuggestionIndex, dispatchSelectedSuggestionIndex] = useReducer(
    suggestionIndexReducer,
    0
  );

  // eslint-disable-next-line no-undef
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchParam(query);
    handleResetSelectionIndex();

    if (!query) {
      setSearchResults([]);
    }
  };

  const handleOnBlur = () => {
    setSearchParam("");
    setSearchResults([]);
  };

  const handleResetSelectionIndex = () => {
    dispatchSelectedSuggestionIndex({ type: "reset", payload: searchResults.length });
  };

  // fetch Results Suggestion
  // TODO: move this out for inversion of dependency, inject fetch result suggestion service
  useEffect(() => {
    if (!searchParam) return;

    setIsFetchingSearchResults(true);

    const abortController = new AbortController();

    const handleFetchCity = debounce(() => {
      fetchCityGeo(searchParam, abortController)
        .then((res) => {
          setSearchResults(res);
          setIsFetchingSearchResults(false);
        })
        .catch(() => {
          // TODO: handle aborted controller
        });
    }, 1000);

    handleFetchCity();

    return () => {
      abortController.abort();
    };
  }, [searchParam]);

  // Handle arrow up and down for accesibility
  useEffect(() => {
    scrollRef?.current?.scrollIntoView(false);
    if (arrowUpPressed) {
      dispatchSelectedSuggestionIndex({ type: "arrowUp", payload: searchResults.length - 1 });
    }
    if (arrowDownPressed) {
      dispatchSelectedSuggestionIndex({ type: "arrowDown", payload: searchResults.length - 1 });
    }
  }, [arrowUpPressed, arrowDownPressed, scrollRef, searchResults.length]);

  // handle Enter Key to set selected Result item
  useEffect(() => {
    if (!enterPressed) return;

    if (searchResults[selectedSuggestionIndex]) {
      onSubmit(searchResults[selectedSuggestionIndex])();
    }
  }, [enterPressed, searchResults, selectedSuggestionIndex, onSubmit]);

  return {
    searchParam,
    isFetchingSearchResults,
    searchResults,
    handleOnBlur,
    handleInputChange,
    selectedSuggestionIndex,
    enterPressed,
  };
};

export default useSearchBarWithSuggestion;
