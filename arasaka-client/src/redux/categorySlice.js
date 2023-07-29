import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../service/CategoryService";
import { status as dataStatus } from "../utils/dataStatus";

const categorySlice = createSlice({
    name:"category",
    initialState:{
        data:[]
    },
    reducers:{
        // get All categories
        findAll: (state,action)=>{
            state.data = action.payload
        },
        
        getCategoryById(state, action){
            state.data = action.payload;
        }
    },extraReducers: (builder) =>{
        builder
        .addCase(getCategoryById.fulfilled, (state, action)=>{
            state.status = dataStatus.SUCCESS;
            state.data = action.payload;
        })
    }
})

export const {findAll }= categorySlice.actions
export default categorySlice.reducer;

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id) => {
    const response = await CategoryService.findById(id);
    console.log("get Category by ID: ", response.data);
    return response.data;
  }
);