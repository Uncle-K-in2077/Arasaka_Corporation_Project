/** @format */

import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../service/CategoryService";
import { useEffect } from "react";
import { findAll } from "../redux/categorySlice";

function AdminCategory() {
  const categoryData = useSelector((state) => state.category?.data);
  const dispatch = useDispatch()
  async function getCategory() {
    try {
      const res = await CategoryService.findAll();
      console.log(res);
      dispatch(findAll(res.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <h1>CATEGORY PAGE</h1>
      <hr />
      {JSON.stringify(categoryData)}
    </>
  );
}

export default AdminCategory;
