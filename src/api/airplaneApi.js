import API from "./flightAxios";



export const getAirplanes = () => {
  return API.get("/airplanes");
};
