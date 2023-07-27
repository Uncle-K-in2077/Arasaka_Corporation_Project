import { getProductById } from './../redux/productSlice';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { status as dataStatus } from "../utils/dataStatus";
import { useEffect, useState } from 'react';

function AdminProductDetail() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (status === dataStatus.LOADING) {
    return <div>Loading...</div>;
  }else if (status === dataStatus.SUCCESS){
      return (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {/* Hiển thị các thông tin khác của sản phẩm */}
        </div>
      );
  }else if (status === dataStatus.ERROR){
    return <div>ERROR 404: No Product found</div>;
  }

}

export default AdminProductDetail;