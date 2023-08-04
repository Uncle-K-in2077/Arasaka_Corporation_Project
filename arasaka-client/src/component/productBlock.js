/** @format */

import { useSelector } from "react-redux";
import "../css/Product.css";

function ProductBlock() {
  const ProductData = useSelector((state) => state.product.data);

  return (
    <div className="row">
      {ProductData ? (
        ProductData.map((product) => {
          return (
            <div className="col-lg-3 md-5 sm-5 product-block">
              <img
                className="product-img neon-effect"
                id="img-product"
                style={{ width: "100%" }}
                src={"http://localhost:8080/" + product.image}
                alt="/"
              />

              <h5>{product.name}</h5>
            </div>
          );
        })
      ) : (
        <div className="product-block">
          <h1>No product found</h1>
        </div>
      )}
    </div>
  );
}

export default ProductBlock;
