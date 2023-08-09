/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "./../service/OrderService";
import { status as dataStatus } from "../utils/dataStatus";

export const getAllOrder = createAsyncThunk(
  "order/getAllOrder",
  async (thunkAPI) => {
    try {
      const response = await OrderService.getAllOrders();
      console.log("AllOrder", response.data);
      return response.data;
    } catch (error) {
      console.log(thunkAPI.reject(error));
      throw error;
    }
  }
);

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderDTO, thunkAPI) => {
    try {
      const response = await OrderService.createOrder(orderDTO);
      console.log("orderSlice", response);
      return response;
    } catch (error) {
      console.log(thunkAPI.rejectWithValue(error));
      throw error;
    }
  }
);

export const getOrderByAccountId = createAsyncThunk(
  "order/getOrderBy",
  async (AccountId, thunkAPI) => {
    try {
      const response = await OrderService.getOrderByAccountId(AccountId);
      console.log("orderSlice", response);
      return response;
    } catch (error) {
      console.log(thunkAPI.rejectWithValue(error));
      throw error;
    }
  }
);

export const updateOrderStatusById = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus }, thunkAPI) => {
    try {
      const response = await OrderService.updateOrderById(orderId, orderStatus);
      console.log("update Status");
      return response;
    } catch (error) {
      console.log(thunkAPI.rejectWithValue(error));
      throw error;
    }
  }
);

const initialState = {
  data: [],
  byAccountData: [],
  status: "",
  error: null,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducer: {
    setOrder: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.data = dataStatus.LOADING;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        if (Array.isArray(state.data)) {
          state.data.unshift(action.payload);
        }
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      })
      .addCase(getOrderByAccountId.pending, (state) => {
        state.byAccountStatus = dataStatus.LOADING;
      })
      .addCase(getOrderByAccountId.fulfilled, (state, action) => {
        state.byAccountStatus = dataStatus.SUCCESS;
        state.byAccountData = action.payload;
      })
      .addCase(getOrderByAccountId.rejected, (state) => {
        state.byAccountStatus = dataStatus.ERROR;
        state.byAccountData = null;
      })
      .addCase(updateOrderStatusById.pending, (state) => {
        state.status = dataStatus.LOADING;
      })
      .addCase(updateOrderStatusById.fulfilled, (state, action) => {
        state.status = dataStatus.SUCCESS;
        const order = action.payload;
        const index = state.data.findIndex((item) => item.id === order.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...order };
        } else {
          state.data.push(order);
        }
      })
      .addCase(updateOrderStatusById.rejected, (state) => {
        state.status = dataStatus.ERROR;
        state.data = null;
      });
  },
});
export const { setOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
