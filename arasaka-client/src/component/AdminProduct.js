/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/productSlice";
// import { updating } from "../redux/productSlice";
import { status } from "./../utils/dataStatus";

function AdminProduct() {
  const productData = useSelector((state) => state.product.data);
  console.log("data: ", productData);

  const categoryData = useSelector((state) => state.category.data);

  const [file, setFile] = useState({});

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    return formattedDate;
  };

  const [product, setProduct] = useState({
    id: 0,
    description: "",
    image: "",
    name: "",
    price: 0,
    quantity: 0,
    saleStatus: 0,
    status: 1,
    categoryId: 0,
    createdAt: formatDate(new Date()),
  });

  // const setProductEdit = (id) => {
  //   dispatch(updating(id));
  // };

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [notifi, setNotifi] = useState("");

  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    searchText: "",
    categoryId: 0,
    status: 2,
  });

  const onSubmitCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      formData.append("img", file);
      dispatch(createProduct(formData));

      const canelBtn = document.querySelector("#canelBtn");
      canelBtn.click();
      setNotifi("");
    } catch (error) {
      setNotifi("Something wrong happened");
      console.error("Error uploading image", error);
    }
  };
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {});

  return (
    <div className="productSession">
      <h1>ALL CYBER WARE</h1>
      <hr />

      <div className="sort" style={{ display: "flex" }}>
        <div className="col-lg-9 filter">
          <input
            value={filter.searchText}
            onChange={handleChangeFilter}
            type="text"
            name="searchText"
            placeholder="Finding something?"
            className="filter-search"
          />

          <select
            defaultValue={Number(filter.categoryId)}
            onChange={handleChangeFilter}
            value={filter.categoryId}
            name="categoryId"
            className="filter-select"
            aria-label="Default select example"
          >
            <option
              className="category-option"
              style={{ color: "black" }}
              value={0}
            >
              All Category
            </option>
            {categoryData ? (
              categoryData.map((item) => {
                return (
                  <option
                    className="category-option"
                    style={{ color: "black" }}
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                );
              })
            ) : (
              <>
                <>No Category found</>
              </>
            )}
          </select>
          <select
            defaultValue={0}
            onChange={handleChangeFilter}
            value={filter.status}
            name="status"
            className="filter-select"
            aria-label="Default select example"
          >
            <option
              className="category-option"
              style={{ color: "black" }}
              value={2}
            >
              Status
            </option>
            <option
              className="category-option"
              style={{ color: "black" }}
              value={1}
            >
              Online
            </option>
            <option
              className="category-option"
              style={{ color: "black" }}
              value={0}
            >
              Offline
            </option>
          </select>
        </div>

        <div className="col-lg-3">
          <button
            className="customButton"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            New Product +
          </button>
          <p
            style={{
              color: "#FE5000",
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
          >
            {notifi ? notifi : <></>}
          </p>
        </div>
      </div>

      <br />

      {/* Product Create Collapse form */}
      <div className="collapse" id="collapseExample">
        <form
          id="productForm"
          encType="multipart/form-data"
          onSubmit={onSubmitCreateProduct}
        >
          <div className="card card-body">
            <input type="hidden" name="image" />
            <div className="row">
              <div className="col-6">
                <input
                  onChange={handleChangeProduct}
                  required
                  className="newProduct-input"
                  type="text"
                  value={product.name}
                  name="name"
                  placeholder="Name"
                />
              </div>
              <div className="col-6">
                <input
                  onChange={handleChangeProduct}
                  required
                  className="newProduct-input"
                  type="number"
                  value={product.price}
                  placeholder="Price"
                  name="price"
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  value={product.quantity}
                  required
                  onChange={handleChangeProduct}
                  className="newProduct-input"
                  type="number"
                  placeholder="Stock"
                  name="quantity"
                />
              </div>
              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  required
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className="newProduct-input"
                  type="file"
                  name="img"
                  placeholder="Image"
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <select
                  defaultValue={product.categoryId}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      categoryId: Number(e.target.value),
                    });
                  }}
                  name="categoryId"
                  className="newProduct-input"
                  aria-label="Default select example"
                >
                  {categoryData ? (
                    categoryData.map((item) => {
                      return (
                        <option
                          className="category-option"
                          style={{ color: "black" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })
                  ) : (
                    <>
                      <>No Category found</>
                    </>
                  )}
                </select>
              </div>

              <div className="col-12" style={{ marginTop: "15px" }}>
                <textarea
                  className="newProduct-input"
                  name="description"
                  value={product.description}
                  onChange={handleChangeProduct}
                />
              </div>

              <div className="col-6" style={{ marginTop: "15px" }}>
                <button type="submit" className="newProduct-input">
                  SAVE
                </button>
              </div>
              <div className="col-6" style={{ marginTop: "15px" }}>
                <button
                  id="canelBtn"
                  type="reset"
                  className="newProduct-input"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <br />

      {/* Product Table */}
      <div className="product">
        <table
          className="table table-dark table-border table-striped"
          style={{ opacity: "90%", color: "#FFFF" }}
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productData ? (
              productData.map((product) => {
                if (
                  (filter.searchText === "" ||
                    product.name
                      .toLowerCase()
                      .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                  (filter.categoryId == 0 ||
                    filter.categoryId == product.categoryId) &&
                  (filter.status == 2 || filter.status == product.status)
                )
                  return (
                    <tr key={product.id}>
                      <td>
                        Product name:
                        <Link
                          // onClick={() => {
                          //   setProductEdit(product.id);
                          // }}
                          className="product-link"
                          to={"/admin/product/" + product.id}
                        >
                          <div
                            className="neon-effect"
                            style={{ color: "#FE5000 !important" }}
                          >
                            <h4>{product.name}</h4>
                          </div>
                        </Link>
                        Price( USD ): <br />
                        <span className="product-link">{product.price}$</span>
                      </td>
                      <td>
                        <img
                          style={{ width: "200px" }}
                          src={"http://localhost:8080/" + product.image}
                          alt="/"
                        />
                      </td>

                      {/* <td>$.{product.price}</td> */}
                      <td>{product.categoryName}</td>
                      <td
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.description}
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.status}</td>
                    </tr>
                  );
              })
            ) : (
              <tr>
                <td>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProduct;
