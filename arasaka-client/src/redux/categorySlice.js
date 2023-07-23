import { createSlice } from "@reduxjs/toolkit";

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
        findById: (state,action)=>{ // action là biến truyền vào
            return state.data.find((item)=>item.id === action.payload) // action.payload là giá trị biến truyền vào
        }
    }
})

export const {findAll,findById  }= categorySlice.actions
export default categorySlice.reducer