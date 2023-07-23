// create a store redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import accountSlice from './accountSlice';

export default configureStore({
  reducer: {
    category: categorySlice,
    account: accountSlice,
  },
});