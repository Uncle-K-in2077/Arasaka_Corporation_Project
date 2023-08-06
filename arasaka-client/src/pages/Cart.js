/** @format */
import ShoppingCart from "../component/ShoppingCart";
import Header from "../component/Header";

function Cart() {
  return (
    <div className="container">
      <Header />
      <div className="breadcrumbs">
        <h3 className="breadcrumb-title">SHOPPING CART</h3>
      </div>
      <ShoppingCart />
    </div>
  );
}

export default Cart;
