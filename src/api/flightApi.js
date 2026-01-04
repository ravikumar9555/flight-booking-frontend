// src/api/flightApi.js
import API from "./flightAxios";

export const getAllFlights = () => {
  return API.get("/flights");
};

export const searchFlights = (params) => {
  return API.get("/flights", { params });
};

// CREATE FLIGHT
export const createFlight = (data) => {
  return API.post("/flights", data);
};

