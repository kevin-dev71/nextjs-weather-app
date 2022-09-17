import { DEFAULT_CITY } from "@/src/config/constants";
import { fetchCityGeo } from "@/src/services/city.service";
import type { GeocodingApiResponse } from "@/src/ts/interfaces/GeocodingApiResponse.interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const enum CITY_STATE_STATUS {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}
export interface CityState {
  name: string;
  status: CITY_STATE_STATUS;
  geoInfo: GeocodingApiResponse | null;
}

const initialState: CityState = {
  name: DEFAULT_CITY,
  status: CITY_STATE_STATUS.IDLE,
  geoInfo: null,
};

export const asyncFetchCityGeo = createAsyncThunk("thunk/city/geo", async (city: string) => {
  const response = await fetchCityGeo(city);
  return response;
});

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setCityName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setGeoInfo: (state, action: PayloadAction<GeocodingApiResponse>) => {
      state.geoInfo = action.payload;
      state.name = action.payload.name;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncFetchCityGeo.pending, (state) => {
        state.status = CITY_STATE_STATUS.LOADING;
      })
      .addCase(asyncFetchCityGeo.fulfilled, (state, action) => {
        state.status = CITY_STATE_STATUS.SUCCEEDED;
        const cityDetail = action.payload[0];
        state.geoInfo = cityDetail ?? null;
      })
      .addCase(asyncFetchCityGeo.rejected, (state) => {
        state.status = CITY_STATE_STATUS.FAILED;
      });
  },
});

// states manipulation
export const getCityName = (state: { city: CityState }) => {
  return state.city.name;
};

export const getCity = (state: { city: CityState }) => {
  return state.city;
};

export const getGeoInfo = (state: { city: CityState }) => {
  return state.city.geoInfo;
};

export const getCityStoreStatus = (state: { city: CityState }) => {
  return state.city.status;
};

// Action creators are generated for each case reducer function
export const { setCityName, setGeoInfo } = citySlice.actions;

export default citySlice.reducer;
