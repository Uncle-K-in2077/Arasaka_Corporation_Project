/** @format */

import { getProductById } from "./../redux/productSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { status as dataStatus } from "../utils/dataStatus";
import { useEffect, useState } from "react";
import { getCategoryById } from './../redux/categorySlice';

function AdminProductDetail() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.product);
  const { data: category} = useSelector((state) => state.category);

  const [notifi, setNotifi] = useState("");
  // const [cateID, setCateID] = useState("");

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === dataStatus.SUCCESS && product) {
      setNotifi("");
      dispatch(getCategoryById(product.categoryId));
    } else if (status === dataStatus.LOADING) {
      setNotifi("Loading..!");
    } else if (status === dataStatus.ERROR) {
      setNotifi("Error..! No product found!");
    }
  }, [status, product, dispatch]);

  return (
    <div className="detail-product-container">
      {notifi}
      <h1 className="detail-product-title-1">
        Detail Product:{" "}
        <span className="detail-product-title">{product.name}</span>
      </h1>
      <hr />

      {/* Product detail  */}
      <div className="row detail-product-main">
        <div className="col-lg-6">
          {/* Collapse Form Start*/}
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <form action="" className="">
                <input
                  required
                  className="newProduct-input"
                  type="text"
                  placeholder="Product Name"
                  style={{marginBottom: "10px"}}
                />
                <input
                  required
                  className="newProduct-input"
                  type="number"
                  placeholder="Price"
                  style={{marginBottom: "10px"}}
                />
                <input
                  required
                  className="newProduct-input"
                  type="text"
                  placeholder="Product Name"
                  style={{marginBottom: "10px"}}
                />
                <input
                  required
                  className="newProduct-input"
                  type="text"
                  placeholder="Product Name"
                  style={{marginBottom: "10px"}}
                />
                
              </form>
            </div>
          </div>
          {/* Collapse Form End*/}

          <img
            className="detail-product-img"
            style={{ width: "100%" }}
            src={"http://localhost:8080/" + product.image}
            alt="/"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="detail-product-name">{product.name}</h2>

          <p className="detail-product-price">${product.price}</p>

          <div className="product-detail-desc">
            <div className="star-rating" data-rating={3}>
              <span className="star" data-value={1}>
                ★
              </span>
              <span className="star" data-value={1}>
                ★
              </span>
              <span className="star" data-value={1}>
                ★
              </span>
              <span className="star" data-value={1}>
                ★
              </span>
              <span className="star" data-value={1}>
                ★
              </span>
            </div>
            <span className="customer-reviews">77 customer reviews</span>

            <p className="product-detail-desc">{product.description}</p>

            <div className="class">
              <h4>ID: {product.id}</h4>
              {category ? (
                <h4 style={{ textTransform: "uppercase" }}>
                  Category:{" "}
                  <span className="detail-product-category">
                    {category.name}
                  </span>
                </h4>
              ) : (
                <h4>Loading category...</h4>
              )}
            </div>
            <button
              class="customButton"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Button with data-bs-target
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetail;
