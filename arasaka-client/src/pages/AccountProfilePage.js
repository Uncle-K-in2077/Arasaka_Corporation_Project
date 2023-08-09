/** @format */
import { useSelector } from "react-redux";
import Header from "./../component/Header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import UserOrders from "../component/UserOrders";
import "../css/Profile.css";

function AccountProfile() {
  const user = useSelector((state) => state.auth?.currentUser);
  const Profile = () => <h1>Trang cá nhân</h1>;

  return (
    <div className="container">
      <Header />
      <hr />
      {/* <div className="breadcrumbs">
        <h3 style={{ textTransform: "uppercase" }} className="breadcrumb-title">
          Profile page
        </h3>
      </div> */}
      {/* <h1>All of our PRODUCT</h1>  */}
      {/* <hr /> */}
      <div className="noCss mt-2">
        <div className="row">
          <div
            className="col-lg-12"
            style={{ padding: "5px", display: "flex" }}
          >
            <p
              className="filter-category"
              style={{ borderBlockEnd: "1px solid #FE5000" }}
            >
              {user.username}
            </p>

            <div className="">
              <ul className="category-list">
                <Link to={"/account/profile"}>
                  <li className="category-list-item" name="categoryId">
                    <p className="category-list-link">
                      <span>&nbsp;</span>
                      Your Profile
                    </p>
                  </li>
                </Link>
              </ul>
            </div>

            <div className="">
              <ul className="category-list">
                <Link to={"/account/orders"}>
                  <li className="category-list-item" name="categoryId">
                    <p className="category-list-link">
                      <span>&nbsp;</span>
                      Your Orders
                    </p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className="col-lg-12" style={{ padding: "5px" }}>
            {/* Some hot shiet drop here later */}
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<UserOrders />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
