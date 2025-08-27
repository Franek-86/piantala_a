import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { Axios } from "axios";

import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);
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

  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [userName, setUserName] = useState(null);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);
  const handleShowPermissionModal = () => setShowPermissionModal(true);
  const handleClosePermissionModal = () => setShowPermissionModal(false);
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
    if (userId) {
      try {
        const response = await axiosInstance.get(
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
    }
  };
  const getOtherUserInfo = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/auth/user/${userId}`);
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
      const response = await axiosInstance.get(`/api/auth/users`);
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
  // qui
  const verificationEmail = async (data) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/verify?token=${data}`
      );
      console.log("qui va il response della verification email", response);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const verificationEmailPasswordReset = async (data) => {
    console.log("a123333", data);
    try {
      const response = axios.get(
        `${serverDomain}/api/auth/reset-password/verify?token=${data}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
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
      });
    } finally {
      setEmailLoading(false);
    }
  };
  const newPassword = async (data) => {
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
        console.log("test321", decodedToken);
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
        localStorage.removeItem("refreshToken");
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
      const response = await axiosInstance.patch(
        `/api/auth/role`,
        {
          payload: { userInfo },
        }
        // ,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // Include the token in the headers
        //   },
        // }
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
      toast.error(`${error.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const changeUserStatus = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/auth/status`, {
        payload: { userInfo },
      });
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
          });
        }
      } else {
        console.error("Unexpected response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(`${error.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const sendEmail = async (messageBody) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/auth/send`, {
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
  const sendPaymentConfirmationEmail = async (data) => {
    console.log("sendPaymentConfirmationEmailData", data);
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/auth/send-payment-confirmation-email`,
        {
          payload: data,
        }
      );
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
        setIsRefreshTokenExpired,
        isRefreshTokenExpired,
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
        showPermissionModal,
        setShowPermissionModal,
        handleShowPermissionModal,
        handleClosePermissionModal,
        sendPaymentConfirmationEmail,
        verificationEmail,
        verificationEmailPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
