import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  timings: {},
  date: {},
  loading: false,
  error: false,
};

export const getPrays = createAsyncThunk("pray/getPray", async (city) => {
  // الحصول على التاريخ الحالي بتنسيق DD-MM-YYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // الشهر يبدأ من 0
  const year = today.getFullYear();
  const currentDate = `${day}-${month}-${year}`;
  
  const res = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${city}&country=Egypt`
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
      state.timings = action.payload.data.timings;
      state.date = action.payload.data.date;
      state.loading = false;
    });
    builder.addCase(getPrays.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default praySlice.reducer;