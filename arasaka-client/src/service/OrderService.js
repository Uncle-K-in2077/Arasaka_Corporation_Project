/** @format */
import AxiosService from "./AxiosService";

const OrderService = {
  async getAllOrders() {
    try {
      const response = await AxiosService.get("/order");
      return response;
    } catch (error) {
      console.error("Error fetching Order:", error);
      throw error;
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await AxiosService.get(`/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Order:", error);
      throw error;
    }
  },

  async getOrderByAccountId(accountId) {
    try {
      const response = await AxiosService.get(`/order/account/${accountId}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error fetching OrderByAccount", error);
      throw error;
    }
  },

  async updateOrderById(orderId, orderStatus) {
    try {
      const response = await AxiosService.put(`/order/${orderId}`, orderStatus);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${orderId}:`, error);
      throw error;
    }
  },

  async createOrder(orderDTO) {
    try {
      const response = await AxiosService.post("/order/", orderDTO);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default OrderService;
