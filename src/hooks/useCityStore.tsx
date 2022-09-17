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
import { getFavoriteCities } from "@/src/redux/slices/favoriteCity.slice";
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

  useEffect(() => {
    if (cityStoreStatus === CITY_STATE_STATUS.IDLE) {
      dispatch(asyncFetchCityGeo(cityName));
    }
  }, [cityStoreStatus, dispatch, cityName]);

  return { cityName, setCity, geoInfo, favoriteCities, city, setGeoInfo };
};

export default useCityStore;
