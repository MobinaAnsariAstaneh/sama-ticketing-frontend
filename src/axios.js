import axios from "axios"
const instance = axios.create({
    baseURL: "http://localhost:8000/"
});

instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
    }
    config.headers["content-type"] = 'application/json';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default instance;