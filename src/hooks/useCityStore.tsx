import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncFetchCityGeo,
  CITY_STATE_STATUS,
  getCityName,
  getCityStoreStatus,
  getGeoInfo,
  setCity as setCityStore,
} from "@/src/redux/slices/city.slice";

import { AppDispatch } from "../redux/store";

const useCityStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cityName = useSelector(getCityName);
  const cityStoreStatus = useSelector(getCityStoreStatus);
  const geoInfo = useSelector(getGeoInfo);

  const setCity = (newCityValue: string) => {
    dispatch(setCityStore(newCityValue));
  };

  useEffect(() => {
    if (cityStoreStatus === CITY_STATE_STATUS.IDLE) {
      dispatch(asyncFetchCityGeo(cityName));
    }
  }, [cityStoreStatus, dispatch, cityName]);

  return { cityName, setCity, geoInfo };
};

export default useCityStore;
