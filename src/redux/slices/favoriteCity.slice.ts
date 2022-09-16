import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { CityState } from "./city.slice";

export interface FavoriteCityState {
  favoriteCities: CityState[];
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
    addFavoriteCity: (state, action: PayloadAction<CityState>) => {
      state.favoriteCities.push(action.payload);
    },
  },
});

// states manipulation
export const getFavoriteCities = (state: { favoriteCities: CityState[] }) => {
  return state.favoriteCities;
};

// Action creators are generated for each case reducer function
export const { addFavoriteCity } = favoriteCitySlice.actions;

export default favoriteCitySlice.reducer;
