import API from "./flightAxios";




export const getAirplanes = () => API.get("/airplanes");

export const createAirplane = (data) =>
  API.post("/airplanes", data);

export const deleteAirplane = (id) =>
  API.delete(`/airplanes/${id}`);
