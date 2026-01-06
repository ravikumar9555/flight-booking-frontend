// src/api/flightApi.js
import API from "./flightAxios";



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

export const getAllFlights = (params = {}) => {
  return API.get("/flights", {
    params, // ✅ THIS IS THE FIX
  });
};