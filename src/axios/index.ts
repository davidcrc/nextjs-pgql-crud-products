import axios from "axios";

const API_URL = process.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiSigned = axios.create({
  baseURL: API_URL,
});

const apiMocked = axios.create({
  baseURL: "/api",
});

export default api;
export { apiSigned, apiMocked };
