/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import "../css/AdminProduct.css";

import SideBerMenu from "../component/sideBarMenu";
import AdminProductTable from "../component/AdminProduct";
import AdminCategory from "./../component/AdminCategory";
import AdminAccount from "./../component/AdminAccount";
import AdminOrder from "./../component/AdminOrder";
import AdminReport from "./../component/AdminReport";
import AdminProductDetail from "../component/AdminProductDetail";

function AdminProduct() {
  return (
    <div className="row">
      <div className="background-video">
        <video autoPlay loop muted>
          <source
            src={process.env.PUBLIC_URL + "/VIDEO-za-main-home.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Side Bar */}
      <div className="col-lg-2 sideBar">
        <h1>SIDE BAR</h1>
        <hr />
        <SideBerMenu />
      </div>

      <div className="col-lg-10 content">
        {/* Product Table */}
        <Routes>
          <Route path="/product" element={<AdminProductTable />} />
          <Route path="/category" element={<AdminCategory />} />
          <Route path="/account" element={<AdminAccount />} />
          <Route path="/order" element={<AdminOrder />} />
          <Route path="/report" element={<AdminReport />} />
          <Route path="/product/:id" element={<AdminProductDetail />} />
          <Route
            path="/"
            element={
              <>
                <h1>Main Admin Page</h1>
                <hr />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminProduct;
