import API from "./flightAxios";

export const getAirports = (cityId) => {
  return API.get("/airports", {
    params: { cityId },
  });
};


export const getAllAirports = () => {
  return API.get("/airports");
};

export const createAirport = (data) => {
  // data = { name, cityId }
  return API.post("/airports", data)
};

export const deleteAirport = (data) => {
  // data = { name, cityId }
  return API.post("/airports", data)
};

export const updateAirport = (data) => {
  // data = { name, cityId }
  return API.post("/airports", data)
};