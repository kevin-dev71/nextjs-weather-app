import { useDispatch, useSelector } from "react-redux";

import { setCity as setCityStore } from "@/src/redux/slices/city.slice";
import { RootState } from "@/src/redux/store";

const useCity = () => {
  const dispatch = useDispatch();

  const city = useSelector((state: RootState) => {
    return state.city.value;
  });

  const setCity = (newCityValue: string) => {
    dispatch(setCityStore(newCityValue));
  };

  return { city, setCity };
};

export default useCity;
