import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://watcho-api.vercel.app/api"
});