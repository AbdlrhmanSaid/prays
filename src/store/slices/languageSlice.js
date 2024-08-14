import { createSlice } from "@reduxjs/toolkit";

const initialState = { isEnglish: false };

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    notEnglish: (state) => {
      state.isEnglish = false;
    },
    lanEnglish: (state) => {
      state.isEnglish = true;
    },
  },
});

export const { notEnglish, lanEnglish } = langSlice.actions;

export default langSlice.reducer;
