import axios from "axios";
import { URL } from "../../constants/urls";

const ReviewService = {
  async create(data: Object) {
    const response = await axios.post(URL.Reviews, data);
    return response;
  },

  async getAll() {
    const response = await axios.get(URL.Reviews);

    return response.data;
  },
};

export default ReviewService;
