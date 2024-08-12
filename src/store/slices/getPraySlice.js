import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  timings: {},
  date: {},
  loading: false,
  error: false,
};

export const getPrays = createAsyncThunk("pray/getPray", async (city) => {
  const res = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity/08-08-2024?city=${city}&country=Egypt`
  );
  return res.data;
});

const praySlice = createSlice({
  name: "pray",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrays.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrays.fulfilled, (state, action) => {
      return action.payload.data;
      state.loading = false;
    });
    builder.addCase(getPrays.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default praySlice.reducer;
