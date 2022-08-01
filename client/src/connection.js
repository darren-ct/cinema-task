import axios from "axios";

const api = axios.create({baseURL:"http://localhost:5000/api/v1/"});
export const api2 = axios.create({baseURL: "http://localhost:5000/"})

export default api;