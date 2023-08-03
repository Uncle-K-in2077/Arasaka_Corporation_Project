/** @format */

import ProductBlock from "../component/productBlock";
import Header from "./../component/Header";

function Product() {
  return (
    <div className="home-container container">
      <Header />
      <h1>All of our PRODUCT</h1>
      <hr />
      <ProductBlock />
    </div>
  );
}

export default Product;
