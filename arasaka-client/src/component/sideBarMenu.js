/** @format */

import { Link } from "react-router-dom";

function SideBerMenu() {
  return (
    <>
      <ul className="list-group">
        <Link to="/admin/product">
          <li className="list-group-item">Product</li>
        </Link>
        <Link to="/admin/category">
          <li className="list-group-item">Category</li>
        </Link>
        <Link to="/admin/account">
          <li className="list-group-item">Account</li>
        </Link>
        <Link to="/admin/order">
          <li className="list-group-item">Order</li>
        </Link>
        <Link to="/admin/report">
          <li className="list-group-item">Report</li>
        </Link>
        <hr />
        <Link to="/">
          <li className="list-group-item">To HomePage</li>
        </Link>
      </ul>
    </>
  );
}

export default SideBerMenu;
