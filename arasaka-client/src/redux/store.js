// create a store redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import accountSlice from './accountSlice';
import productSlice from "./productSlice";

export default configureStore({
  reducer: {
    category: categorySlice,
    account: accountSlice,
    product: productSlice,
  },
});