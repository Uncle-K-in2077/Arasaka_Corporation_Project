/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../service/ProductService";
import { status as dataStatus } from "../utils/dataStatus";


const initialState = {
  data: [],
  status: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.data = action.payload;
    },
    getProductByID(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = dataStatus.SUCCESS;
      })
      .addCase(getProductById.rejected, (state) => {
        state.data = null;
        state.status = dataStatus.ERROR;
      })

      
  },
});

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;

// create a new product
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (productData) =>{
        const response = await ProductService.createProduct(productData);
        const result = await response.data;
        console.log(response);
        return result;
    }
)

// Get all product
export function getAllProduct(){
    return async function getProductThunk(dispatch, getState){
        const data = await ProductService.getAllProducts();
        const result = data.data.data;
        dispatch(getProducts(result))
    }
}

// Get product by id
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await ProductService.getProductById(id);
    console.log("get Product by ID: " ,response)
    return response;
  }
);
