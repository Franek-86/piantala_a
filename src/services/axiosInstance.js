import axios from "axios";
const serverDomain =
  process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
    : process.env.REACT_APP_DOMAIN_NAME_SERVER;
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error?.config;
    if (
      error?.response?.status === 401 &&
      !config?.sent &&
      !error.config._retry
    ) {
      console.log("p123");
      config.sent = true;
      error.config._retry = true;
      const res = await axios.post(
        `${serverDomain}/api/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      console.log("test refresh token value", res.data.token);
      const newAccessToken = res.data.token;
      localStorage.setItem("userToken", newAccessToken);

      if (newAccessToken) {
        config.headers = {
          authorization: `Bearer ${newAccessToken}`,
          // "Content-Type": "application/json",
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axios;
