import { useEffect, useState } from "react";
// import ProductService from './../service/ProductService';
import CategoryService from './../service/CategoryService';
import { Link } from "react-router-dom";

import { getAllProduct, createProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { status as dataStatus } from "../utils/dataStatus";
import axios from "axios";


function AdminProduct() {


  const [category,setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  //data for new product
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [image, setImage] = useState("");
  // const [selectedImageFile, setSelectedImageFile] = useState({});

  const [description, setDescription] = useState("");
  const [notifi, setNotifi] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch  = useDispatch();

  const { data: products, createdProduct, status} = useSelector(
    (state) => state.product
  );


async function getAllCategory() {
  try {
    const res = await CategoryService.findAll();
    if (res) {
      setCategory(res.data);
    }
  } catch (error) {
    console.log(error);
  }
}

const onSubmitCreateProduct = async (e) =>{
  e.preventDefault();

  const form = document.getElementById("productForm");
  const formData = new FormData(form);

  try {
    const response = await axios.post(
      // Ở đây phải dùng api raw và axios vì AxiosService đã có header sẵn và không nhận multipart :<
      "http://localhost:8080/api/upload",
      formData,
      {
        Headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
      console.log("response",response);
    // Lấy URL của ảnh tải lên từ phản hồi
    const imageUrl = response.data;
    console.log("link anh: ",imageUrl)

    const productData = {
      name,
      price,
      quantity,
      image: imageUrl,
      categoryId,
      description,
    };


    dispatch(createProduct(productData));
  } catch (error) {
    // Xử lý lỗi khi tải lên ảnh
    console.error("Error uploading image", error);
  }
}

function clearFormById() {
  document.getElementById("productForm").reset();
  document.getElementById("productForm").ariaExpanded = false; 
}

  useEffect(() => {
    getAllCategory();
    dispatch(getAllProduct());
    if (status === dataStatus.LOADING) {
      setNotifi("loading...");
    } else if (status === dataStatus.SUCCESS) {
      setNotifi("create success");
      setIsFormOpen(false);
      clearFormById();
    } else if (status === dataStatus.ERROR) {
      setNotifi("some Error");
    }
  }, [status, createdProduct, dispatch]);


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
          {notifi}
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
          <div
            className="card card-body"
            // style={{ backgroundColor: "#99999928" }}
          >
            <input type="hidden" name="image" />
            <div className="row">
              <div className="col-6">
                <input
                  required
                  className="newProduct-input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  required
                  className="newProduct-input"
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  required
                  className="newProduct-input"
                  type="number"
                  placeholder="Stock"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  required
                  className="newProduct-input"
                  type="file"
                  name="img"
                  placeholder="Image"
                  // onChange={(e) => setSelectedImageFile(e.target.files[0])}
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <select
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
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

                  {category ? (
                    category.map((item) => {
                      return (
                        <option
                          className="category-option"
                          style={{ color: "black" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                          <hr />
                        </option>
                      );
                    })
                  ) : (
                    <>
                      <p>No Category found</p>
                    </>
                  )}
                </select>
              </div>

              <div className="col-12" style={{ marginTop: "15px" }}>
                <textarea
                  className="newProduct-input"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-6" style={{ marginTop: "15px" }}>
                <button type="submit" className="newProduct-input">
                  SAVE
                </button>
              </div>
              <div className="col-6" style={{ marginTop: "15px" }}>
                <button
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
            {products && Array.isArray(products) ? (
              products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>
                    <Link
                      className="product-link"
                      to={"/admin/product/" + product.id}
                    >
                      {product.name}
                    </Link>
                  </td>

                  {/* <td>
                    <button
                      className="product-link" // Classname có thể được tùy chỉnh cho phù hợp với giao diện của bạn
                      onClick={() => dispatch(getProductById(product.id))}
                    >
                      {product.name}
                    </button>
                  </td> */}

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
