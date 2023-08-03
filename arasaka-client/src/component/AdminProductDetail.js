/** @format */

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductService from "../service/ProductService";
import { updateProduct } from "../redux/productSlice";
import { removeProduct, restoreProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

function AdminProductDetail() {
  const { id } = useParams("id");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifi, setNotifi] = useState("");
  const [file, setFile] = useState({});

  const [product, setProduct] = useState();
  // const [productUI, setProductUI] = useState({});
  // const [productForm, setProductForm] = useState({});
  const category = useSelector((state) => state.category.data);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    if (openForm) {
      setOpenForm(false);
    } else {
      setOpenForm(true);
    }
  };

  const handleShowToast = (message) => {
    setShowToast(false);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 3000);
  };

  const getProduct = async () => {
    try {
      const res = await ProductService.getProductById(id);
      setProduct(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [f, setF] = useState(null); // State lưu trữ đối tượng hình ảnh

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setF(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Khi FileReader hoàn thành việc đọc file
        const imageURL = reader.result; // Lấy URL hình ảnh đã đọc từ file
        const imageElement = document.getElementById("img-product");
        imageElement.src = imageURL; // Gán URL hình ảnh cho thuộc tính 'src' của thẻ 'img'
      };

      reader.readAsDataURL(selectedFile); // Đọc file dưới dạng URL dữ liệu (data URL)
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (product.price === 0) {
      setToastMessage("Price must be greater than 0");
      setShowToast(true);
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("img", file);
        dispatch(updateProduct({ productId: product.id, formData: formData }));

        const cancelBtn = document.querySelector("#cancelBtn");
        cancelBtn.click();
        setNotifi("");
        setToastMessage("Update success");
        setShowToast(true);
        navigate(`/admin/product/${product.id}`);
      } catch (error) {
        setNotifi("Error on updating product");
        handleShowToast("Update fail");
        setShowToast(true);
      }
    }
  };

  // Hàm xử lý sự kiện khi bạn muốn xóa sản phẩm
  const handleRemoveProduct = async () => {
    try {
      await dispatch(removeProduct(product.id));
      // Xử lý sau khi xóa thành công (nếu cần)
      console.log("Product removed successfully");
      navigate("/admin/product");
    } catch (error) {
      // Xử lý khi xảy ra lỗi trong quá trình xóa (nếu cần)
      console.log("Error removing product:", error);
    }
  };

  // Hàm xử lý sự kiện khi bạn muốn phục hồi sản phẩm
  const handleRestoreProduct = async () => {
    try {
      await dispatch(restoreProduct(product.id));
      // Xử lý sau khi phục hồi thành công (nếu cần)
      console.log("Product restored successfully");
      navigate("/admin/product");
    } catch (error) {
      // Xử lý khi xảy ra lỗi trong quá trình phục hồi (nếu cần)
      console.log("Error restoring product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return <>Not found</>;
  }

  if (product)
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
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmitUpdate}
                  style={{ display: "inline-block" }}
                >
                  <input
                    required
                    className="newProduct-input"
                    type="text"
                    placeholder="Product Name"
                    style={{ marginBottom: "10px" }}
                    value={product.name}
                    onChange={(e) => {
                      setProduct({ ...product, name: e.target.value });
                    }}
                  />
                  <input
                    required
                    className="newProduct-input"
                    type="number"
                    placeholder="Price"
                    style={{ marginBottom: "10px" }}
                    value={product.price}
                    onChange={(e) => {
                      setProduct({ ...product, price: Number(e.target.value) });
                    }}
                  />

                  <select
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        categoryId: Number(e.target.value),
                      });
                    }}
                    value={product.categoryId}
                    name="categoryId"
                    className="newProduct-input"
                    aria-label="Default select example"
                    style={{ marginBottom: "10px" }}
                  >
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
                          </option>
                        );
                      })
                    ) : (
                      <>
                        <>No Category found</>
                      </>
                    )}
                  </select>

                  <input
                    className="newProduct-input"
                    type="file"
                    placeholder="Image"
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);

                      handleFileChange(e);
                    }}
                  />
                  <textarea
                    className="newProduct-input"
                    value={product.description}
                    rows={4}
                    onChange={(e) => {
                      setProduct({ ...product, description: e.target.value });
                    }}
                  />

                  <div className="row">
                    <div className="col-6" style={{ marginTop: "15px" }}>
                      <button
                        type="submit"
                        className="newProduct-input customButton2"
                      >
                        SAVE
                      </button>
                    </div>
                    <div className="col-6" style={{ marginTop: "15px" }}>
                      <button
                        id="cancelBtn"
                        type="reset"
                        className="newProduct-input customButton2"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Collapse Form End*/}

            <img
              className="detail-product-img"
              id="img-product"
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

              <p
                className="product-detail-desc p-0.5"
                style={{ wordWrap: "break-word" }}
              >
                {product.description}
              </p>

              <div className="class">
                <h4>
                  AS-ID:{" "}
                  <span className="detail-product-category">{product.id}</span>
                </h4>
                {/* Status: Remove or Restore */}
                <h4>
                  <input
                    type="checkbox"
                    className="switch"
                    defaultChecked={product.status}
                    onChange={
                      product.status
                        ? handleRemoveProduct
                        : handleRestoreProduct
                    }
                  />
                </h4>
              </div>
              <button
                className="customButton"
                type="button"
                onClick={handleOpenForm}
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Button with data-bs-target
              </button>
            </div>
            {/* Show Toast */}
            {showToast ? (
              <Toast title="Notification" message={toastMessage} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
}

export default AdminProductDetail;
