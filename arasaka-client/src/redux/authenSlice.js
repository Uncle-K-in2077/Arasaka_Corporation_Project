/** @format */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./productSlice";
import LoginService from "../service/LoginService";
import { status as dataStatus } from "../utils/dataStatus";
import { getCategories } from "./categorySlice";
import { getAllOrder } from "./orderSlice";

// For logOut
import { setOrder } from "./orderSlice";
import { setProducts } from "./productSlice";
import { findAll } from "./accountSlice";
import { getCategory } from "./categorySlice";
import { clear } from "./TempCartSlice";

// Log out
export const logOut = createAsyncThunk(
  "authen/logOut",
  async ({ dispatch, navigate }, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      // remove all data of redux store
      dispatch(setOrder([]));
      dispatch(setProducts([]));
      dispatch(findAll([]));
      dispatch(getCategory([]));
      dispatch(clear());
      navigate("/login");
    } catch (error) {
      navigate("/login");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "authen/login",
  async ({ email, password, dispatch, navigate }, thunkAPI) => {
    try {
      const response = await LoginService.login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentUser", JSON.stringify(response.account));
      dispatch(getProducts());
      dispatch(getCategories());
      dispatch(getAllOrder());
      if (response.account.role === 0) {
        navigate("/admin/product");
      } else {
        navigate("/");
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "authen/refresh",
  async ({ dispatch, navigate }, thunkAPI) => {
    try {
      if (localStorage.getItem("token") === null) {
        navigate("/login");
      }
      const response = await LoginService.refresh();
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentUser", JSON.stringify(response.account));
      dispatch(getProducts());
      dispatch(getCategories());
      dispatch(getAllOrder());
      if (response.account.role === 0) {
        navigate("/admin/product");
      } else {
        navigate("/");
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  data: [],
  status: "",
};

const accountSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.currentUser = action.payload.account;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = dataStatus.ERROR;
      })
      .addCase(refresh.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.currentUser = action.payload.account;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = dataStatus.ERROR;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      });
  },
});

export const { loginSuccess } = accountSlice.actions;
export default accountSlice.reducer;
