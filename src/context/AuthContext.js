import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [sessionLoading, setSessionLoading] = useState(false); // New loading state
  const [submissionError, setSubmissionError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [userInfo, setUserInfo] = useState({ id: "", role: "", status: "" });
  const [pswLoading, setPswLoading] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState({
    userName: "",
    email: "",
  });
  const [otherUserInfo, setOtherUserInfo] = useState({
    userName: "",
    email: "",
  });
  const [pageError, setPageError] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [userName, setUserName] = useState(null);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);

  console.log(allUsers);
  // const [allUsers, setAllUsers] = useState({});

  const [isRegister, setIsRegister] = useState(null);
  const token = localStorage.getItem("userToken");

  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  console.log("aoooo", serverDomain);

  const getRegions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/register/regions`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 503) {
        setRegionsLoading(false);
        console.log("Abbiamo finito le prove gratuite, riprova fra un'oretta");
        return;
      }
      if (response) {
        setRegions(response.data);
        setRegionsLoading(false);
      }
    } catch (err) {
      setRegionsLoading(false);
      setPageError(true);
    }
  };
  const getDistricts = async (region) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/register/districts`,
        { params: { regionCode: region } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setDistricts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCities = async (city) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/register/cities`,
        { params: { cityCode: city } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setCities(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRegions();
    console.log("regions", regions);

    // getDistricts();
    // getCities();
  }, []);

  const generateFiscalCode = async (data) => {
    // const { name, lastName, gender, city, year, month, day } = data;
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/login/generate-fiscal-code`,
        { payload: data }
      );
      if (response?.status === 200) {
        return response.data;
        return "error";
      }
      console.log("something went wrong, fiscal code non generated");
      return;
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  const validateFiscalCode = async (data) => {
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/login/validate-fiscal-code`,
        { payload: data }
      );

      return response.data.message;
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const getUserInfo = async (userId) => {
    console.log("bba", userId);
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/user/${userId}`
      );
      if (response) {
        console.log("response", response.data);
        // return response;
        console.log("test1", response.data);
        setLoggedUserInfo({
          ...loggedUserInfo,
          userName: response.data.userName,
          email: response.data.email,
        });
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getOtherUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/user/${userId}`
      );
      if (response) {
        console.log("response", response.data);
        // return response;
        console.log("test1", response.data);
        setOtherUserInfo({
          ...loggedUserInfo,
          userName: response.data.userName,
          email: response.data.email,
        });
        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${serverDomain}/api/auth/users`);
      if (response) {
        let allUsers = response.data.usersToBeSent;

        setAllUsers(allUsers);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async (data) => {
    const { email, password: user_password } = data;

    const payload = { email, user_password };

    const response = await axios.post(
      `${serverDomain}/api/auth/login`,
      payload,
      {
        withCredentials: true,
      }
    );
    return response;
  };
  const registerUser = async (data) => {
    const {
      name: first_name,
      lastName: last_name,
      address,
      birthday,
      city: city,
      gender: gender,
      fiscalCode: fiscal_code,
      email,
      password: user_password,
      user: user_name,
      phone,
    } = data;

    const payload = {
      first_name,
      last_name,
      address,
      birthday,
      fiscal_code,
      city,
      gender,
      user_name,
      phone,
      email,
      user_password,
    };

    const response = await axios.post(
      `${serverDomain}/api/auth/register`,
      payload,
      {
        widthCredentials: true,
      }
    );
    return response;
  };
  const resetPassword = async (data) => {
    setEmailLoading(true);
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/password-reset`,
        { data }
      );
      console.log("response", response);
      toast(`🌱 ${response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } catch (err) {
      toast.error(`${err.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } finally {
      setEmailLoading(false);
    }
  };
  const newPassword = async (data) => {
    console.log("test123", data);
    setPswLoading(true);

    try {
      const response = await axios.patch(
        `${serverDomain}/api/auth/new-password`,
        {
          payload: data,
        }
      );
      if (response.status === 200) {
        toast(`🌱 ${response.data}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        return "ok";
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } finally {
      setPswLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);

      //
      console.log("else", token);
      console.log("else2", isAuthenticated);

      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setSubmissionError("Invalid token.");
        return;
      } finally {
        setPswLoading(false);
      }
    }

    setLoading(false);
  }, [userId, token]);

  // from here
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await axios.post(
          `${serverDomain}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        console.log("test refresh token value", res.data?.newToken);
        return res;
      } catch (err) {
        console.log("test refresh token error", err);
      }
    };
    tryRefresh();
  }, []);
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/refresh-token`,
        null,
        { withCredentials: true }
      );
      const newToken = response.data.newToken;
      console.log("new access token", newToken);
      return newToken;
    } catch (err) {
      console.error("failed to refresh token");
    }
  };
  // to here
  const checkToken = () => {
    if (token) {
      return "map";
    }
    return "login";
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${serverDomain}/api/auth/logout`);

      // Optionally, handle the response if needed (e.g., check response status)
      if (response.status === 200) {
        localStorage.removeItem("userToken");
        setIsAuthenticated(false);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const changeUserRole = async () => {
    console.log("t123", token);
    setLoading(true);
    try {
      const response = await axios.patch(
        `${serverDomain}/api/auth/role`,
        {
          payload: { userInfo },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        if (response.data === "diritti amministrativi rimossi") {
          setUserInfo({ ...userInfo, role: "user" });
          toast("🌱 Ruolo utente amministratore rimosso", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
        if (response.data === "diritti amministrativi aggiunti") {
          setUserInfo({ ...userInfo, role: "admin" });
          toast("🌱 Ruolo utente amministratore aggiunto", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      } else {
        console.error("Unexpected response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  const changeUserStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${serverDomain}/api/auth/status`,
        {
          payload: { userInfo },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("this", response);
      if (response.status === 200) {
        setLoading(false);
        setUserInfo({ ...userInfo, status: 0 });
        if (response.data === "User has been unblocked") {
          toast("🌱 Utente sbloccato", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        } else {
          setUserInfo({ ...userInfo, status: 1 });
          toast("🌱 Utente bloccato", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      } else {
        console.error("Unexpected response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };
  const sendEmail = async (messageBody) => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverDomain}/api/auth/send`, {
        payload: { messageBody, loggedUserInfo },
      });
      if (response.status === 200) {
        console.log("inviata");
        toast("🌱 Email inviata", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        return response;
      }
      console.log(response);
    } catch (err) {
      toast.error("Invio Email fallito", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated,
        loading,
        allUsers,
        loggedUserInfo,
        setUserRole,
        getUserInfo,
        handleLogout,
        setIsRegister,
        resetPassword,
        checkToken,
        isRegister,
        userRole,
        userId,
        token,
        userInfo,
        login,
        registerUser,
        setIsAuthenticated,
        generateFiscalCode,
        validateFiscalCode,
        sendEmail,
        newPassword,
        pageError,
        cities,
        getCities,
        getAllUsers,
        setUserInfo,
        changeUserRole,
        changeUserStatus,
        getOtherUserInfo,
        otherUserInfo,
        userName,
        sessionLoading,
        setSessionLoading,
        userSession,
        regions,
        districts,
        getDistricts,
        getCities,
        pswLoading,
        emailLoading,
        regionsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
