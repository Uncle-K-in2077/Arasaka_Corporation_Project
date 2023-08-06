/** @format */

import { useSelector } from "react-redux";
import "../css/Product.css";
import { useState } from "react";
import { add } from "../redux/TempCartSlice";
import { useDispatch } from "react-redux";

function ProductBlock() {
  const ProductData = useSelector((state) => state.product.data);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
  };

  // Pagination
  const [sortType, setSortType] = useState("asc"); // "asc" cho sắp xếp tăng dần, "desc" cho sắp xếp giảm dần
  const [sortColumn, setSortColumn] = useState("price"); // Tên cột mà bạn muốn sắp xếp (ví dụ: "price", "name")

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số lượng sản phẩm hiển thị trên mỗi trang
  // test
  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1); // Reset lại trang về trang đầu tiên khi tìm kiếm mới
  };

  function filterAndPaginateProducts(
    products,
    currentPage,
    productsPerPage,
    keyword = ""
  ) {
    const filteredProducts = keyword
      ? products.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      : products;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return paginatedProducts;
  }

  const filteredAndPaginatedProducts = filterAndPaginateProducts(
    ProductData,
    currentPage,
    productsPerPage,
    keyword
  );

  function paginateProducts(products, currentPage, productsPerPage) {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  // Calculate productData for pagination wrote by Uncle K babe
  const currentProducts = paginateProducts(
    ProductData,
    currentPage,
    productsPerPage
  );

  const totalPages = Math.ceil(ProductData.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // filter
  const [filter, setFilter] = useState({
    searchText: "",
    categoryId: 0,
  });
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="noCss mt-3">
      <div className="row">
        <div className="col-lg-6">
          Showing {currentProducts.length} of {ProductData.length} items
        </div>
        <div className="col-lg-3 select">Select</div>
        <div className="col-lg-3 search">
          <input
            // value={filter.searchText}
            value={keyword}
            onChange={handleKeywordChange}
            // onChange={handleChangeFilter}
            type="text"
            name="searchText"
            placeholder="   Looking for some cyberware?"
            className="product-block-filter-search"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3" style={{ padding: "10px" }}>
          <div className="filterBlock" style={{ border: "1px solid #FE5000" }}>
            <p style={{ borderBlockEnd: "1px solid #FE5000" }}>
              Your customizations functions are HERE later sir!
            </p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            dicta illum doloremque neque, pariatur voluptas reiciendis ipsum
            aperiam id facere deserunt ex ea molestiae cum possimus nostrum
            provident at voluptatum magnam sint temporibus aspernatur, ad
            libero! Nihil quidem magni facilis amet! Repellendus totam, non esse
            dolorum harum nulla molestias id.
          </div>
        </div>
        <div className="col-lg-9 row">
          {filteredAndPaginatedProducts ? (
            filteredAndPaginatedProducts.map((product) => {
              if (
                /* Chỗ này đã có hàm tìm kiếm kết hợp phân trang rồi nên sẽ tối ưu hơn */
                /*  (filter.searchText === "" ||
                  product.name
                    .toLowerCase()
                    .indexOf(filter.searchText.toLowerCase()) !== -1) && */
                (filter.categoryId == 0 ||
                  filter.categoryId == product.categoryId) &&
                product.status === 1
              )
                return (
                  <div className="col-lg-4 sm-6 md-6 product-block">
                    <div className="image-container">
                      <img
                        className="product-img"
                        id="img-product"
                        style={{ width: "100%" }}
                        src={"http://localhost:8080/" + product.image}
                        alt="/"
                      />
                      <div className="atcBtn">
                        <button
                          onClick={() => addToCart(product)}
                          className="customButton4"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 product-name">
                        <a className="product-name-a" href="/">
                          {product.name}
                        </a>
                      </div>
                      <div className="col-4" style={{ textAlign: "right" }}>
                        <p className="product-price" href="/">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="product-block">
              <h1>No product found</h1>
            </div>
          )}
          {/* <div className="pagination">
            <button onClick={handlePrevPage}>&laquo; Prev</button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage}>Next &raquo;</button>
          </div> */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link" onClick={handlePrevPage}>
                  &laquo; Prev
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">
                  {currentPage} of {totalPages}
                </span>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProductBlock;
