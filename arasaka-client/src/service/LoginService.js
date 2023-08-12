/** @format */

import AxiosService from "./AxiosService";

const LoginService = {
  async login(email, password) {
    try {
      const response = await AxiosService.post("api/login", {
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
      const response = await AxiosService.post("api/login/refresh", {
        token: localStorage.getItem("token"),
      });
      return response.data;
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  },

  async senOTP(accountEmail) {
    try {
      const response = await AxiosService.post("api/login/forgot-password", {
        verifyEmail: accountEmail,
      });
      // console.log("OTP: ", response);
      return response.data;
    } catch (error) {
      console.log("Error during sending OTP: ", error);
    }
  },
};

export default LoginService;
