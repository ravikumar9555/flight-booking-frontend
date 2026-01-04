import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3009/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => {
  return API.post("/signup", data, {
    validateStatus: () => true,
  });
};

export const loginUser = (data) => {
  return API.post("/signin", data, {
    validateStatus: () => true,
  });
};
export const checkIsAdmin = (userId) => {
  return API.get("/isAdmin", {
    params: { id: userId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};