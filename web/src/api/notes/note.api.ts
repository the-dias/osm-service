import axios from "axios";
import { URL } from "../../constants/urls";

const NoteService = {
  async create(data: Object) {
    console.log("data: ", data);
    const response = await axios.post(URL.Notes, data);
    return response;
  },

  // async getAll() {
  //   const { data } = await axios.get(URL.Notes);

  //   return data;
  // },

  async getById(id: number){
    const {data} = await axios.get(URL.Notes + `/${id}`);

    return data;
  }
};

export default NoteService;
