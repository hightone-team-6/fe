import axios from "axios";

export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://highthon-api.previousw.dev",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return Promise.reject(response);
  });

  return instance;
};
