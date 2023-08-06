/** @format */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./productSlice";
import LoginService from "../service/LoginService";
import { status as dataStatus } from "../utils/dataStatus";
import { getCategories } from "./categorySlice";
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
      if (response.account.role === 0) {
        navigate("/admin");
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
      if (response.account.role === 0) {
        navigate("/admin");
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
      });
  },
});

export const { loginSuccess } = accountSlice.actions;
export default accountSlice.reducer;
