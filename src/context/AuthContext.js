import React, { createContext, useState, useEffect, cloneElement } from "react";
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
  const [logReg, setLogReg] = useState(false);
  const [pswLoading, setPswLoading] = useState(false);
  const [payload, setPayload] = useState({});
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [userSession, setUserSession] = useState(null);
  // const [userName, setUserName] = useState(null);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(false);
  const handleShowPermissionModal = () => setShowPermissionModal(true);
  const handleClosePermissionModal = () => setShowPermissionModal(false);

  const [isRegister, setIsRegister] = useState(null);
  const [clientDomain, setClientDomain] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const handleCloseTerms = () => setShowTerms(false);
  const handleShowTerms = () => setShowTerms(true);
  const token = localStorage.getItem("userToken");

  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  const client =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_DOMAIN_NAME_CLIENT
      : process.env.REACT_APP_DOMAIN_NAME_CLIENT_PRODUCTION;
  const redirect =
    process.env.REACT_APP_NODE_ENV === "test"
      ? "http://localhost:3000/map"
      : "https://piantala-a.onrender.com/map";

  useEffect(() => {
    setClientDomain(client);
  }, []);

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
  // const googleAccess = async (data, navigate, plantId) => {
  //   const payload = data;

  //   const response = await axios.post(
  //     `${serverDomain}/api/auth/google-access`,
  //     payload,
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   if (response.status === 200) {
  //     setIsAuthenticated(true);
  //     setLogReg(false);
  //     localStorage.setItem("justLoggedIn", "true");

  //     const {
  //       token,
  //       user: { role },
  //     } = response.data;

  //     setUserRole(role);

  //     localStorage.setItem("userToken", token);
  //     if (plantId) {
  //       navigate(`/map/${plantId}`);
  //     } else {
  //       navigateToMap(navigate);
  //     }
  //   }
  // };

  // const googleAccessTest = async (navigate) => {
  //   try {
  //     await SocialLogin.initialize({
  //       google: {
  //         webClientId: process.env.REACT_APP_GOOGLE_ID_WEB,
  //         // redirectUrl: "https://piantala-a.onrender.com/login",
  //         redirectUrl: "http://localhost:3000/login",
  //         mode: "online",
  //       },
  //     });

  //     const res = await SocialLogin.login({
  //       provider: "google",
  //       options: {},
  //     });
  //     const test2 = res.result.profile;

  //     const payload = test2;
  //     const response = await axios.post(
  //       `${serverDomain}/api/auth/google-access-android`,
  //       payload,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       localStorage.setItem("justLoggedIn", "true");

  //       const {
  //         token,
  //         user: { role },
  //       } = response.data;

  //       setUserRole(role);

  //       localStorage.setItem("userToken", token);
  //       navigateToMap(navigate);
  //     }
  //     if (response.status !== 200) {
  //       toast.error(`non è stato possibile auntenticarsi`, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error(`errore test2 ${error}`, {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
  useEffect(() => {
    SocialLogin.initialize({
      google: {
        webClientId: process.env.REACT_APP_GOOGLE_ID_WEB,
        redirectUrl: redirect,

        mode: "online",
      },
    });
  }, []);
  const googleAccess = async (navigate, plantId) => {
    try {
      const res = await SocialLogin.login({
        provider: "google",
        options: {},
      });

      const payload = res.result.profile;

      const response = await axios.post(
        `${serverDomain}/api/auth/google-access-android`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log("test", response);

      if (response.data.message === "terms to be accepted") {
        setPayload(payload);

        setShowTerms(true);
      }
      if (response.data.message === "Login successful") {
        setIsAuthenticated(true);
        setLogReg(false);
        localStorage.setItem("justLoggedIn", "true");

        const {
          token,
          user: { role },
        } = response.data;

        setUserRole(role);

        localStorage.setItem("userToken", token);
        // navigateToMap(navigate);
        if (plantId) {
          navigate(`/map/${plantId}`);
        } else {
          navigateToMap(navigate);
        }
      }
      if (response.status !== 200) {
        toast.error(`non è stato possibile auntenticarsi`, {
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
    } catch (error) {
      toast.error(`error from catch, error is: ${error}`, {
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
  };
  const googleAfterTerms = async (navigate, plantId, terms) => {
    try {
      console.log("payload sta qui", payload, "terms sta qui", terms);
      const response = await axios.post(
        `${serverDomain}/api/auth/google-access-android`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Login successful") {
        setIsAuthenticated(true);
        setLogReg(false);
        localStorage.setItem("justLoggedIn", "true");

        const {
          token,
          user: { role },
        } = response.data;

        setUserRole(role);

        localStorage.setItem("userToken", token);

        if (plantId) {
          navigate(`/map/${plantId}`);
        } else {
          navigateToMap(navigate);
        }
      } else {
        toast.error(`error from catch, error is: ${response.data}`, {
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
    } catch (error) {
      toast.error(`error from catch, error is: ${error}`, {
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
  const registerUser = async (data, terms, google) => {
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
      google: 0,
      user_password,
      terms,
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
        setIsAuthenticated(false);
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
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
        setPayload,
        // googleAccessTest,
        // googleAccessTest2,
        // generateFiscalCode,
        // validateFiscalCode,
        newPassword,
        pageError,
        cities,
        getCities,
        setIsRefreshTokenExpired,
        googleAfterTerms,
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
        clientDomain,
        setShowPermissionModal,
        handleShowPermissionModal,
        handleClosePermissionModal,
        sendPaymentConfirmationEmail,
        verificationEmail,
        verificationEmailPasswordReset,
        logReg,
        setLogReg,
        showTerms,
        setShowTerms,
        handleCloseTerms,
        handleShowTerms,
        payload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
