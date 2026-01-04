import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3022/api/v1", // ✅ FLIGHT SERVICE
});

export default API;
