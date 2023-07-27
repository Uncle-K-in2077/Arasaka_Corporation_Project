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
      const response = await AxiosService.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const response = await AxiosService.post("/product", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async updateProduct(productId, productData) {
    try {
      const response = await AxiosService.put(
        `/products/${productId}`,
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
      const response = await AxiosService.delete(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    }
  },
};

export default ProductService;
