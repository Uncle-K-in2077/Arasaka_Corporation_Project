/** @format */

import "../css/Product.css";
import { useSelector } from "react-redux";
import "../css/Product.css";
import { useState } from "react";
import { add } from "../redux/TempCartSlice";
import { useDispatch } from "react-redux";

function HomeProducts() {
  const ProductData = useSelector((state) => state.product.data);
  const categoryData = useSelector((state) => state.category.data);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Số lượng sản phẩm hiển thị trên mỗi trang
  // test
  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1); // Reset lại trang về trang đầu tiên khi tìm kiếm mới
  };
  // filter
  const [filter, setFilter] = useState({
    searchText: "",
    categoryId: 0,
  });

  function filterAndPaginateProducts(
    products,
    currentPage,
    productsPerPage,
    keyword = "",
    categoryId = 0
  ) {
    const filteredProducts = products.filter((product) => {
      const nameMatches = product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const categoryMatches =
        categoryId === 0 || categoryId === product.categoryId;
      return nameMatches && categoryMatches;
    });

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
    keyword,
    filter.categoryId
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

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCategoryClick = (categoryId) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      categoryId: categoryId,
    }));
  };

  return (
    <div className="noCss mt-3">
      <div className="row">
        <div className="col-lg-12 row">
          {filteredAndPaginatedProducts ? (
            filteredAndPaginatedProducts.map((product) => {
              if (product.status === 1)
                return (
                  <div className="col-lg-3 sm-4 md-4 product-block">
                    <div className="image-container">
                      <img
                        className="product-img"
                        id="img-product"
                        style={{ width: "100%" }}
                        src={process.env.REACT_APP_API_URL + product.image}
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

export default HomeProducts;
