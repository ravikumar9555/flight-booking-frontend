import API from "./flightAxios";

export const getCities = () => {
  return API.get("/city");
};
