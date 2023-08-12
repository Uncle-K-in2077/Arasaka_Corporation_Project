/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../service/ProductService";
import { status as dataStatus } from "../utils/dataStatus";
import axios from "axios";
import uploadService from "../service/uploadService";

const initialState = {
  data: [],
  status: "",
  error: null,
};

// create a new product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/product`,
        formData,
        {
          headers: "Content-Type: multipart/form-data",
        }
      );
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
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
  async ({ productId, formData }, thunkAPI) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/product/${productId}`,
        formData,
        {
          headers: "Content-Type: multipart/form-data",
        }
      );
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Remove product by id (set Status to 0)
export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (idProduct, thunkAPI) => {
    try {
      await ProductService.deleteProduct(idProduct);
      console.log("remove success");
      getProducts();
      return idProduct;
    } catch (error) {
      console.log(error.message);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Restore product by id (set Status to 1 again)
export const restoreProduct = createAsyncThunk(
  "product/restoreProduct",
  async (idProduct, thunkAPI) => {
    try {
      await ProductService.restoreProduct(idProduct);
      console.log("restore success");
      getProducts();
      return idProduct;
    } catch (error) {
      console.log(error.message);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

// import products form excel file


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    // findById(state, action) {
    //   return state.data.find((item) => item.id === action.payload);
    // },
    // updating(state, action) {
    //   state.productUpdating = state.data.find(
    //     (item) => item.id === action.payload
    //   );
    // },
    // updateProductSuccess: (state, action) => {
    //   state.data = action.payload;
    //   state.status = "success";
    //   state.error = null;
    // },
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
        state.data.unshift(action.payload);
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
        const product = action.payload;
        const index = state.data.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...product };
        } else {
          state.data.push(product);
        }
        // state.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        let product = state.data.find((item) => item.id === action.payload);
        if (product) {
          product.status = 0;
        }
      })

      .addCase(restoreProduct.fulfilled, (state, action) => {
        let product = state.data.find((item) => item.id === action.payload);
        if (product) {
          product.status = 1;
        }
      });
  },
});

export const {
  setProducts,
  // findById,
  // updating,
  // updateProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
