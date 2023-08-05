/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../service/AccountService";
import { status } from "../utils/dataStatus";

export const registerAccount = createAsyncThunk(
  "account/register",
  async (accountData) => {
    const response = await AccountService.register(accountData);
    const results = await response.data;
    return results;
  }
);
export const updateAccount = createAsyncThunk(
  "account/update",
  async ({ accountId, status, role, username, email, password }) => {
    const response = await AccountService.updateAccount(accountId, {
      status,
      role,
      username,
      email,
      password,
    });
    const results = await response.data;
    return results;
  }
);

const initialState = {
  data: [],
  status: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // get all account
    findAll: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.status = status.LOADING;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.status = status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.status = status.ERROR;
        state.data = null;
      })
      .addCase(updateAccount.pending, (state) => {
        state.status = status.LOADING;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.status = status.SUCCESS;
        const acc = action.payload;
        const index = state.data.findIndex((item) => item.id === acc.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...acc };
        } else {
          state.data.push(acc);
        }
      })
      .addCase(updateAccount.rejected, (state) => {
        state.data = status.ERROR;
        state.data = null;
      });
  },
});

export const { findAll } = accountSlice.actions;
export default accountSlice.reducer;
