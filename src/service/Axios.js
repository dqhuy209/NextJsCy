import { API_ROOT } from "@/utils/constants";
import { useUtils } from "@/utils/useUtils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ROOT, //endpoint api
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let cookieValue = await useUtils().getCookie("token");
    // console.log("tokenNHAT", cookieValue);
    // Do something before request is sent
    if (cookieValue) {
      config.headers["Authorization"] = `Bearer ${cookieValue}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (typeof window !== "undefined")
      console.log(error.response?.data?.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
