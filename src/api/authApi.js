import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3009/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => {
  return API.post("/signup", data);
};
