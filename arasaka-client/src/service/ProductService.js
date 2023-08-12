/** @format */

import AxiosService from "./AxiosService";

const ProductService = {
  async getAllProducts() {
    try {
      const response = await AxiosService.get("/product");
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProductById(productId) {
    try {
      const response = await AxiosService.get(`api/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const response = await AxiosService.post("api/product", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async updateProduct(productId, productData) {
    try {
      const response = await AxiosService.put(
        `api/product/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  },

  async deleteProduct(productId) {
    try {
      const response = await AxiosService.delete(`api/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    }
  },

  async restoreProduct(productId) {
    try {
      const response = await AxiosService.put(
        `api/product/${productId}/restore`
      );
      return response.data;
    } catch (error) {
      console.error(`Error restoring product with ID ${productId}:`, error);
      throw error;
    }
  },
};

export default ProductService;
