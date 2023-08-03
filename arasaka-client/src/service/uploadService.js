/** @format */

import axios from "axios";

const uploadService = {
  save: async (file) => {
    try {
      const baseURL =
        process.env.REACT_APP_API_URL || "http://localhost:8080/api";
      const res = await axios.post(
        baseURL + "/upload",
        {
          img: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  },
};
export default uploadService;
