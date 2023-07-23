/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";
class AxiosService {
  constructor() {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

    this.httpClient = axios.create({
      baseURL,
      headers: {
        Authorization: process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
      },
    });

    this.httpClient.interceptors.request.use(
      (config) => {
        // Thêm xử lý trước khi gửi yêu cầu (nếu cần)
        const token = process.env.REACT_APP_TOKEN;
        if (token) {
          config.headers.Authorization = token;
          console.log("Token ở header" + config.headers.Authorization);
        }else{
          config.headers.Authorization = localStorage.getItem("token");
          console.log("Token ở header" + config.headers.Authorization);
        }
        return config;
      },
      (error) => {
        // Xử lý lỗi khi gửi yêu cầu
        console.log("Token ở header lỗi");
        return Promise.reject(error);
      }
    );
  }

  async get(url, params) {
    try {
      const response = await this.httpClient.get(url, { params });
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async post(url, data) {
    try {
      const response = await this.httpClient.post(url, data);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async put(url, data) {
    try {
      const response = await this.httpClient.put(url, data);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async delete(url) {
    try {
      const response = await this.httpClient.delete(url);
      return response;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  handleRequestError(error) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let navigate = useNavigate();
    if (error.response) {
      // Có phản hồi từ máy chủ, nhưng không thành công (ví dụ: mã lỗi 4xx hoặc 5xx)
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      if (error.response.status === 403 || error.response.status === 404) {
        alert("Bạn không có quyền truy cập vào trang");
        navigate("/login");
      }
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ máy chủ
      console.error("Request Error:", error.request);
    } else {
      // Xảy ra lỗi khi thiết lập yêu cầu (ví dụ: lỗi mạng)
      console.error("Error:", error.message);
    }
    // throw error; // Ném lại lỗi để xử lý tiếp (nếu cần)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AxiosService();
