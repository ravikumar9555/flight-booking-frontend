import API from "./flightAxios";

export const getCities = () => {
  return API.get("/city");
};

export const createCity = (data) => {
  // data = { name }
  return API.post("/city", data);
};