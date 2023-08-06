/** @format */

import ProductBlock from "../component/productBlock";
import Header from "./../component/Header";

function Product() {
  return (
    <div className="home-container container">
      <Header />
      <div className="breadcrumbs">
        <h3 className="breadcrumb-title">SHOP</h3>
      </div>
      {/* <h1>All of our PRODUCT</h1>
      <hr /> */}
      <ProductBlock />
    </div>
  );
}

export default Product;
