/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../service/CategoryService";
import { status as dataStatus } from "../utils/dataStatus";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
  },
  reducers: {
    // get All categories
    getCategory: (state, action) => {
      state.data = action.payload;
    },

    getCategoryById(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.categoryById = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = dataStatus.ERROR;
      });
  },
});

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id) => {
    const response = await CategoryService.findById(id);
    return response.data;
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (thunkAPI) => {
    try {
      const response = await CategoryService.findAll();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { getCategory } = categorySlice.actions;
export default categorySlice.reducer;
