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

const initialState = {
  data: [],
  status: ""
}

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
      });
  },
});

export const{findAll} = accountSlice.actions;
export default accountSlice.reducer;