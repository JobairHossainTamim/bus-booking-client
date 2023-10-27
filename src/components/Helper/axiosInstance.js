import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("bus-auth-token")}`,
    },
});