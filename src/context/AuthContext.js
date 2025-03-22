import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [submissionError, setSubmissionError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cities, setCities] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [userInfo, setUserInfo] = useState({ id: "", role: "", status: "" });
  const [loggedUserInfo, setLoggedUserInfo] = useState({
    userName: "",
    email: "",
  });
  const [userName, setUserName] = useState(null);
  console.log(allUsers);
  // const [allUsers, setAllUsers] = useState({});

  const [isRegister, setIsRegister] = useState(null);
  const token = localStorage.getItem("userToken");

  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  console.log("aoooo", serverDomain);

  const getCities = async () => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/login/cities`,
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

      // if (response.status) {
      //   return response.data;
      // }
      // console.log("something went wrong");
      // return;
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const getUserInfo = async (userId) => {
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

  // useEffect(() => {
  //   getAllUsers();
  // }, [userRole]);

  const loginOrRegister = async (data) => {
    console.log("sta?", serverDomain);
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
    const endpoint = isRegister
      ? `${serverDomain}/api/auth/register`
      : `${serverDomain}/api/auth/login`;
    const payload = isRegister
      ? {
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
        }
      : { email, user_password };
    console.log("payload", payload);
    const response = await axios.post(endpoint, payload, {
      widthCredentials: true,
    });
    return response;
  };
  useEffect(() => {
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);

      //
      console.log("else", token);
      console.log("else2");

      try {
        const decodedToken = jwtDecode(token);
        console.log("userId decodedfrom local storage", decodedToken);
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setSubmissionError("Invalid token.");
        return;
      }
    }

    setLoading(false);
  }, [userId, token]);

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
    setLoading(true);
    try {
      const response = await axios.patch(`${serverDomain}/api/auth/role`, {
        payload: { userInfo },
      });
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
      const response = await axios.patch(`${serverDomain}/api/auth/status`, {
        payload: { userInfo },
      });
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
        isRegister,
        userRole,
        userId,
        token,
        userInfo,
        loginOrRegister,
        setIsAuthenticated,
        generateFiscalCode,
        validateFiscalCode,
        cities,
        getCities,
        getAllUsers,
        setUserInfo,
        changeUserRole,
        changeUserStatus,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
