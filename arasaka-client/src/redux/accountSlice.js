import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        data: []
    },
    reducers: {
        // get all account
        findAll:(state, action)=>{
            state.data = action.payload;
        }
    }

})
export const{findAll} = accountSlice.actions;
export default accountSlice.reducer;