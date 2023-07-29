
import AxiosService from "./AxiosService";

const CategoryService = {
  async findAll( ) {
    try {
      const response = await AxiosService.get("/category");
        return response;
     
    } catch (error) {
      console.error("Error during login: ", error);
      throw error;
    }
  },

  async findById(categoryId){
    try {
      const response = await AxiosService.get(`/category/${categoryId}`);
      return response;
    } catch (error) {
      console.log("Can't find category");
      throw error;
    }
  }

};

export default CategoryService;
