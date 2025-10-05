import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { Axios } from "axios";
import { decode } from "base64-arraybuffer";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { FormControl } from "react-bootstrap";
import { Camera, CameraResultType } from "@capacitor/camera";
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

  const [pswLoading, setPswLoading] = useState(false);

  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [userSession, setUserSession] = useState(null);
  // const [userName, setUserName] = useState(null);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);
  const handleShowPermissionModal = () => setShowPermissionModal(true);
  const handleClosePermissionModal = () => setShowPermissionModal(false);

  const [isRegister, setIsRegister] = useState(null);
  const token = localStorage.getItem("userToken");

  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;

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
    } catch (err) {}
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
    } catch (err) {}
  };
  useEffect(() => {
    getRegions();
  }, []);

  const generateFiscalCode = async (data) => {
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/login/generate-fiscal-code`,
        { payload: data }
      );
      if (response?.status === 200) {
        return response.data;
        return "error";
      }
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

  const verificationEmail = async (data) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/verify?token=${data}`
      );

      return response;
    } catch (error) {}
  };
  const verificationEmailPasswordReset = async (data) => {
    try {
      const response = axios.get(
        `${serverDomain}/api/auth/reset-password/verify?token=${data}`
      );
      return response;
    } catch (error) {}
  };
  const resetPassword = async (data) => {
    setEmailLoading(true);
    try {
      const response = await axios.post(
        `${serverDomain}/api/auth/password-reset`,
        { data }
      );

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

  const sendPaymentConfirmationEmail = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/auth/send-payment-confirmation-email`,
        {
          payload: data,
        }
      );
      if (response.status === 200) {
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
        setUserRole,
        handleLogout,
        setIsRegister,
        resetPassword,
        checkToken,
        isRegister,
        userRole,
        userId,
        token,
        login,
        registerUser,
        setIsAuthenticated,
        generateFiscalCode,
        validateFiscalCode,
        newPassword,
        pageError,
        cities,
        getCities,
        setIsRefreshTokenExpired,
        isRefreshTokenExpired,
        sessionLoading,
        setSessionLoading,
        userSession,
        regions,
        districts,
        getDistricts,
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
