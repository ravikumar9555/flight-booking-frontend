import API from "./flightAxios";

export const getAirports = (cityId) => {
  return API.get("/airports", {
    params: { cityId },
  });
};


export const getAllAirports = () => {
  return API.get("/airports");
};
