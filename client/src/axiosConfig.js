import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001", // Your Express backend port
});

export default instance;
