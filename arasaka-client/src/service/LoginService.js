/** @format */

import AxiosService from "./AxiosService";

const LoginService = {
  async login(email, password) {
    try {
      const response = await AxiosService.post("/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        // Đăng nhập thất bại, trả về null hoặc throw error
        return null;
      }
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  },
  async refresh() {
    try {
      const response = await AxiosService.post("/login/refresh", {
        token: localStorage.getItem("token"),
      });
      return response.data;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  },
};

export default LoginService;
