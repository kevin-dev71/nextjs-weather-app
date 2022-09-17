import type { GeocodingApiResponse } from "@/src/ts/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface FavoriteCityState {
  favoriteCities: GeocodingApiResponse[];
}

const initialState: FavoriteCityState = {
  favoriteCities: [],
};

export const favoriteCitySlice = createSlice({
  name: "favoriteCities",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addFavoriteCity: (state, action: PayloadAction<GeocodingApiResponse>) => {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity: (state, action: PayloadAction<GeocodingApiResponse>) => {
      const cityToRemove = action.payload;
      state.favoriteCities = state.favoriteCities.filter((item) => {
        return !(item.lat === cityToRemove.lat && item.lon === cityToRemove.lon);
      });
    },
  },
});

// states manipulation
export const getFavoriteCities = (state: { favoriteCities: FavoriteCityState }) => {
  return state.favoriteCities.favoriteCities;
};

// Action creators are generated for each case reducer function
export const { addFavoriteCity, removeFavoriteCity } = favoriteCitySlice.actions;

export default favoriteCitySlice.reducer;
