import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncFetchCityGeo,
  CITY_STATE_STATUS,
  getCity,
  getCityName,
  getCityStoreStatus,
  getGeoInfo,
  setCityName as setCityStore,
  setGeoInfo as setGeoInfoStore,
} from "@/src/redux/slices/city.slice";
import {
  addFavoriteCity as addFavoriteCityStore,
  getFavoriteCities,
  removeFavoriteCity as removeFavoriteCityStore,
} from "@/src/redux/slices/favoriteCity.slice";
import type { GeocodingApiResponse } from "@/src/ts/interfaces";

import type { AppDispatch } from "../redux/store";

const useCityStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cityName = useSelector(getCityName);
  const city = useSelector(getCity);
  const cityStoreStatus = useSelector(getCityStoreStatus);
  const geoInfo = useSelector(getGeoInfo);
  const favoriteCities = useSelector(getFavoriteCities);

  const setCity = (newCityValue: string) => {
    dispatch(setCityStore(newCityValue));
  };

  const setGeoInfo = (newCityValue: GeocodingApiResponse) => {
    dispatch(setGeoInfoStore(newCityValue));
  };

  const handleFavorite = (incomingCityValue: GeocodingApiResponse) => {
    // This comparisson maybe can be moved to a function like `compareObjectByProperties` cuz is used in favoriteCity.slice.ts
    const foundCityInFavorite = favoriteCities.find(
      (item) => item.lat === incomingCityValue.lat && item.lon === incomingCityValue.lon
    );
    if (foundCityInFavorite) return dispatch(removeFavoriteCityStore(incomingCityValue));
    return dispatch(addFavoriteCityStore(incomingCityValue));
  };

  const isInfavorite = (cityValue: GeocodingApiResponse | null) => {
    // code smell
    if (!cityValue) return false;
    // duplicated code, maybe move to a function
    const foundCityInFavorite = favoriteCities.find(
      (item) => item.lat === cityValue.lat && item.lon === cityValue.lon
    );
    return foundCityInFavorite;
  };

  useEffect(() => {
    if (cityStoreStatus === CITY_STATE_STATUS.IDLE) {
      dispatch(asyncFetchCityGeo(cityName));
    }
  }, [cityStoreStatus, dispatch, cityName]);

  return {
    city,
    setCity,
    cityName,
    geoInfo,
    setGeoInfo,
    favoriteCities,
    handleFavorite,
    isInfavorite,
  };
};

export default useCityStore;
