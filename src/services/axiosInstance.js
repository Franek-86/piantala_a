import axios from "axios";
import { toast } from "react-toastify";

const serverDomain =
  process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
    : process.env.REACT_APP_DOMAIN_NAME_SERVER;
const AxiosInstance = axios.create({
  baseURL: serverDomain,
});
// AxiosInstance.defaults.headers.patch["Content-Type"] = "application/json";
AxiosInstance.interceptors.request.use(
  function (config) {
    console.log("aaaa");
    // Do something before request is sent
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("configuration error", error.config);
    const config = error.config;
    console.log("prima della condizione", error.config.sent);

    if (error?.response?.status === 401 && !error.config._retry) {
      console.log("p123");
      config._retry = true;
      console.log("nella condizione", error.config.sent);
      try {
        const res = await axios.post(
          `${serverDomain}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log("test refresh token value", res.data.token);
        const newAccessToken = res.data.token;
        localStorage.setItem("userToken", newAccessToken);

        if (newAccessToken) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        console.log("comment111config", config);
        return axios(config);
      } catch (err) {
        console.log("abcd");
        // toast.error(`${err.code}`, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });

        // if (!toast.isActive("refresh-error")) {
        toast.error(`${err.code}`, {
          toastId: "refresh-error",
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // }
        localStorage.removeItem("userToken");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
