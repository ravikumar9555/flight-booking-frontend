// src/api/flightApi.js
import API from "./flightAxios";

export const getAllFlights = (filters) => {
  return API.get("/flights");
};


// CREATE FLIGHT
export const createFlight = (data) => {
  return API.post("/flights", data);
};

export const searchFlights = (filters) => {
  return API.get("/flights", {
    params: {
      departureAirportId: filters.fromAirportId || undefined,
      arrivalAirportId: filters.toAirportId || undefined,
      date: filters.date || undefined,
      minSeats: filters.passengers || undefined,
    }
  });
};