import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url =
  "https://raw.githubusercontent.com/Tech-Labs/egypt-governorates-and-cities-db/master/governorates.json";

const initialState = {
  governorates: [],
  loading: false,
  error: null,
};

export const getGovernorates = createAsyncThunk(
  "city/getGovernorates",
  async () => {
    const res = await axios.get(url);
    return res.data.find(
      (item) => item.type === "table" && item.name === "governorates"
    ).data;
  }
);

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGovernorates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGovernorates.fulfilled, (state, action) => {
      state.governorates = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getGovernorates.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default citySlice.reducer;
