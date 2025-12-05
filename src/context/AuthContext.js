import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { Axios } from "axios";
import { decode } from "base64-arraybuffer";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { FormControl } from "react-bootstrap";
import { Camera, CameraResultType } from "@capacitor/camera";
import { navigateToLoginFunction } from "../services/deepLinkServices";
import { navigateToMap } from "../utils/utils";
import { SocialLogin } from "@capgo/capacitor-social-login";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    user: "",
    password: "",
    password2: "",
    city: "",
  });
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
  const googleAccess = async (data, navigate) => {
    const payload = data;
    console.log("test payload", payload);
    const response = await axios.post(
      `${serverDomain}/api/auth/google-access`,
      payload,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setIsAuthenticated(true);
      localStorage.setItem("justLoggedIn", "true");

      const {
        token,
        user: { role },
      } = response.data;

      setUserRole(role);

      localStorage.setItem("userToken", token);
      navigateToMap(navigate);
    }
  };

  const googleAccessTest = async (data) => {
    await SocialLogin.initialize({
      google: {
        webClientId:
          "349628103780-laqfu0q8jg5nb58q1sbq3cfk7ai6lfu8.apps.googleusercontent.com",
        redirectUrl: "https://piantala-a.onrender.com/map",
        mode: "online",
      },
    });

    const res = await SocialLogin.login({
      provider: "google",
      options: {
        scopes: ["email", "name"],
      },
    });

    if (res.result.responseType === "online") {
      const payload = data;
      // console.log("test payload", payload);
      const response = await axios.post(
        `${serverDomain}/api/auth/google-access`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("justLoggedIn", "true");

        const {
          token,
          user: { role },
        } = response.data;

        setUserRole(role);

        localStorage.setItem("userToken", token);
      }

      // navigateToMap(navigate);
    }
  };
  const checkEmail = async (data) => {
    const { email } = data;
    const payload = { email };

    const response = await axios.post(
      `${serverDomain}/api/auth/check-email`,
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
      // fiscal_code,
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
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("registration"));
    if (local) {
      setUserData(local);
    }
  }, []);

  // registration
  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("registration"));
  //   if (local) {
  //     let timer = setTimeout(() => {
  //       localStorage.removeItem("registration");

  //       setUserData({
  //         name: "",
  //         lastName: "",
  //         birthday: "",
  //         gender: "",
  //         email: "",
  //         phone: "",
  //         user: "",
  //         password: "",
  //         password2: "",
  //         city: "",
  //       });
  //       navigateToLoginFunction();
  //       toast(`🌱 Registration timeout`, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }, 900000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [userData]);

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
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    localStorage.setItem(
      "registration",
      JSON.stringify({ ...userData, [name]: value })
    );
    setUserData({ ...userData, [name]: value });
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
        handleChange,
        checkEmail,
        isRegister,
        userRole,
        userId,
        token,
        login,
        registerUser,
        setIsAuthenticated,
        userData,
        setUserData,
        googleAccess,
        googleAccessTest,
        // generateFiscalCode,
        // validateFiscalCode,
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
