import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cityReducer from "@/src/redux/slices/city.slice";
import favoriteCityReducer from "@/src/redux/slices/favoriteCity.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["favoriteCities"],
};

const reducer = combineReducers({
  city: cityReducer,
  favoriteCities: favoriteCityReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
