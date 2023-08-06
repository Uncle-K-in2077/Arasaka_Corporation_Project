/** @format */

// create a store redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import accountSlice from "./accountSlice";
import productSlice from "./productSlice";
import TempCartSlice from "./TempCartSlice";
import authenSlice from "./authenSlice";

export default configureStore({
  reducer: {
    category: categorySlice,
    account: accountSlice,
    product: productSlice,
    cart: TempCartSlice,
    auth: authenSlice,
  },
});
