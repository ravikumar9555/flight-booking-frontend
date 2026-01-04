import API from "./flightAxios";

export const getUsers = () => {
  return API.get("/users");
};