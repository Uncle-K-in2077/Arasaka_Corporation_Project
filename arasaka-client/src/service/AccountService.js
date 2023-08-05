/** @format */

import AxiosService from "./AxiosService";

const AccountService = {
  async getAllAccounts() {
    try {
      const response = await AxiosService.get("/account");

      if (response.status === 200) {
        // Lấy danh sách tài khoản thành công, trả về danh sách các tài khoản
        return response;
      } else {
        // Lấy danh sách tài khoản thất bại, trả về null hoặc throw error
        return null;
      }
    } catch (error) {
      console.error("Error fetching all accounts:", error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const response = await AxiosService.post("/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Đăng nhập thành công, trả về token
        return response.data.token;
      } else {
        // Đăng nhập thất bại, trả về null hoặc throw error
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  async register(userInfo) {
    try {
      const response = await AxiosService.post("/register", userInfo);

      if (response.status === 201) {
        // Đăng ký thành công, trả về thông tin người dùng đã đăng ký
        return response;
      } else if (response.status === 400) {
        return response.error;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },

  async updateAccount(accountId, accountData) {
    try {
      const response = await AxiosService.put(
        `/account/${accountId}`,
        accountData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getUserProfile(accountId) {
    try {
      const response = await AxiosService.get(`/account/${accountId}`);

      if (response.status === 200) {
        // Lấy thông tin người dùng thành công, trả về thông tin người dùng
        return response.data;
      } else {
        // Lấy thông tin người dùng thất bại, trả về null hoặc throw error
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Các phương thức khác liên quan đến quản lý tài khoản có thể được thêm vào đây
};

export default AccountService;
