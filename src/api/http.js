import axios from "axios";

axios.defaults.baseURL = "https://foodie-backend-ilko.herokuapp.com/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

const get = async (...args) => await axios.get(...args);

const post = async (...args) => await axios.post(...args);

const put = async (...args) => await axios.put(...args);

const patch = async (...args) => await axios.patch(...args);

export default {
  get,
  post,
  put,
  patch,
};
