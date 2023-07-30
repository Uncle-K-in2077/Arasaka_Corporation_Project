/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../service/ProductService";
import { status as dataStatus } from "../utils/dataStatus";
import axios from "axios";

const initialState = {
  productUpdating: null,
  data: [],
  status: "",
};

// create a new product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData) => {
    // const response = await ProductService.createProduct(productData);
    const response = await axios.post(
      "http://localhost:8080/api/product",
      formData // Truyền formData vào request
    );
    const result = await response.data;
    return result;
  }
);

// Get all product
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (thunkAPI) => {
    try {
      const response = await ProductService.getAllProducts();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get product by id
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await ProductService.getProductById(id);
    return response;
  }
);

// Update product by id
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:8080/api/product/${id}`,
      formData
    );
    const result = await response.data;
    return result;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    findById(state, action) {
      return state.data.find((item) => item.id === action.payload);
    },
    updating(state, action) {
      state.productUpdating = state.data.find(
        (item) => item.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })

      .addCase(createProduct.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;

        state.data.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })

      .addCase(getProductById.pending, (state, action) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = dataStatus.SUCCESS;
      })
      .addCase(getProductById.rejected, (state) => {
        state.data = null;
        state.status = dataStatus.ERROR;
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      });
  },
});

export const { setProducts, findById, updating } = productSlice.actions;
export default productSlice.reducer;
