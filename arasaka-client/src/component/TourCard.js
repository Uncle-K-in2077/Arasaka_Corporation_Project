/** @format */

import { useEffect, useState } from "react";
// import axios from "axios";
import AxiosService from "../service/AxiosService";
import { useNavigate } from "react-router-dom";

const URL = "/product"; // Đã có base URL trong AxiosService

function ProductCart() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      const res = await AxiosService.get(URL);
      if (res.status === 200) {
        setResults(res.data.data);
      }else if(res.status === 403){
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }

  useEffect( () => {
    getData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "#ec4e00" }}>
      {/* Hiển thị dữ liệu đã lấy */}
      {results.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          {/* Thêm các thông tin khác của sản phẩm */}
        </div>
      ))}
    </div>
  );
}

export default ProductCart;
