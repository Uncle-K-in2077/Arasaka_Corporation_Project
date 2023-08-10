/** @format */
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import TourCard from "./component/TourCard";
import LoginForm from "./component/LoginForm";
import RegisterPage from "./pages/registerPage";
import { refresh } from "./redux/authenSlice";
import AdminPages from "./pages/AdminPages";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import AccountProfile from "./pages/AccountProfilePage";
import FogotPassword from "./component/FogotPassword";

const About = () => <h1>Giới thiệu</h1>;

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshLoading = () => dispatch(refresh({ dispatch, navigate }));

  useEffect(() => {
    refreshLoading();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/account/*" element={<AccountProfile />} />
        <Route path="/fogotPassword" element={<FogotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
