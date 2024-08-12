import { createSlice } from "@reduxjs/toolkit";

const nextPrayerSlice = createSlice({
  name: "prayers",
  initialState: {
    incompletePrayers: [],
  },
  reducers: {
    setIncompletePrayers: (state, action) => {
      state.incompletePrayers = action.payload;
    },
    addIncompletePrayer: (state, action) => {
      state.incompletePrayers.push(action.payload);
    },
    clearIncompletePrayers: (state) => {
      state.incompletePrayers = [];
    },
  },
});

export const {
  setIncompletePrayers,
  addIncompletePrayer,
  clearIncompletePrayers,
} = nextPrayerSlice.actions;
export default nextPrayerSlice.reducer;
