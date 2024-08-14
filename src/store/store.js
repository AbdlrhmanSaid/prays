import { configureStore } from "@reduxjs/toolkit";
import prayReducer from "./slices/getPraySlice";
import cityReducer from "./slices/getCity";
import nextPrayerSlice from "./slices/nextPrayerSlice";
import languageSlice from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    pray: prayReducer,
    city: cityReducer,
    nextPray: nextPrayerSlice,
    lang: languageSlice,
  },
});
