/** @format */

import { Link } from "react-router-dom";
import "../css/Product.css";

function SideBerMenu() {
  return (
    <div className="side-bar">
      <ul className="list-group side-bar-item">
        <Link to="/admin/product" className="side-bar-item">
          <li>Product</li>
        </Link>
        <Link to="/admin/category" className="side-bar-item">
          <li>Category</li>
        </Link>
        <Link to="/admin/account">
          <li>Account</li>
        </Link>
        <Link to="/admin/order">
          <li>Order</li>
        </Link>
        {/* <Link to="/admin/report">
          <li className="list-group-item">Report</li>
        </Link> */}
        <hr />
        <Link to="/">
          <li>To HomePage</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBerMenu;
