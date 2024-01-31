import axios from "axios";

export const BaseUrl = "http://localhost:8080"
export const axiosInstance = axios.create({
    baseURL: BaseUrl,
  });