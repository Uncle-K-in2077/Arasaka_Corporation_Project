/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/productSlice";
// import { updating } from "../redux/productSlice";

function AdminProduct() {
  const productData = useSelector((state) => state.product.data);

  const categoryData = useSelector((state) => state.category.data);

  const [file, setFile] = useState({});

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
    createdAt: new Date(),
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

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

  return (
    <div className="productSession">
      <h1>ALL CYBER WARE</h1>
      <hr />

      <div className="sort" style={{ display: "flex" }}>
        <h4>Sort</h4>
        <input
          required
          type="text"
          name=""
          id=""
          placeholder="Finding something?"
          style={{ padding: "10px" }}
        />
        <button
          className="customButton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={() => setIsFormOpen(!isFormOpen)} // Thay đổi trạng thái mở/đóng form khi nhấn nút
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
                  <option
                    className="category-option"
                    value={0}
                    style={{ color: "black" }}
                  >
                    What type?
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
          className="table table-dark table-border"
          style={{ opacity: "80%", color: "#FFFF" }}
        >
          <thead>
            <tr>
              <th scope="col" style={{ color: "#FE5000" }}>
                ID
              </th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productData && Array.isArray(productData) ? (
              productData.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>
                    <Link
                      // onClick={() => {
                      //   setProductEdit(product.id);
                      // }}
                      className="product-link"
                      to={"/admin/product/" + product.id}
                    >
                      {product.name}
                    </Link>
                  </td>

                  <td>{product.price}</td>
                  <td>{product.categoryId}</td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.description}
                  </td>
                  <td>
                    <img
                      style={{ width: "200px" }}
                      src={"http://localhost:8080/" + product.image}
                      alt="/"
                    />
                  </td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProduct;
