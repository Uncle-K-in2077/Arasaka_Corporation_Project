/** @format */
import React from "react";
import { Route, Routes} from "react-router-dom";
import TourCard from "./component/TourCard";
import LoginForm from "./component/LoginForm";
import RegisterPage from "./pages/registerPage";

import AdminProduct from "./pages/adminProduct";

const Home = () => <h1>Trang chủ</h1>;
const About = () => <h1>Giới thiệu</h1>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<TourCard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminProduct />} />
      </Routes>
    </div>
  );
}

export default App;
