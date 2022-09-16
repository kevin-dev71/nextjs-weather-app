import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncFetchCityGeo,
  CITY_STATE_STATUS,
  getCity,
  getCityName,
  getCityStoreStatus,
  getGeoInfo,
  setCity as setCityStore,
} from "@/src/redux/slices/city.slice";
import { getFavoriteCities } from "@/src/redux/slices/favoriteCity.slice";

import { AppDispatch } from "../redux/store";

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

  useEffect(() => {
    if (cityStoreStatus === CITY_STATE_STATUS.IDLE) {
      dispatch(asyncFetchCityGeo(cityName));
    }
  }, [cityStoreStatus, dispatch, cityName]);

  return { cityName, setCity, geoInfo, favoriteCities, city };
};

export default useCityStore;
