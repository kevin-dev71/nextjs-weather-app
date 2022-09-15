import { DEFAULT_CITY } from "@/src/config/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CityState {
  value: string;
}

const initialState: CityState = {
  value: DEFAULT_CITY,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setCity: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCity } = citySlice.actions;

export default citySlice.reducer;
