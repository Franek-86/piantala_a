import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [submissionError, setSubmissionError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const [isRegister, setIsRegister] = useState(null);
  const token = localStorage.getItem("userToken");

  const serverDomain =
    process.env.REACT_APP_NODE_ENV === "test"
      ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
      : process.env.REACT_APP_DOMAIN_NAME_SERVER;
  console.log("aoooo", serverDomain);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${serverDomain}/api/auth/user/${userId}`
      );
      if (response) {
        console.log("response", response.data);
        // return response;

        return response.data;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginOrRegister = async (data) => {
    console.log("sta?", serverDomain);
    const {
      name: first_name,
      lastName: last_name,
      address,
      birthday,
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
          user_name,
          phone,
          email,
          user_password,
        }
      : { email, user_password };
    console.log("payload", payload);
    const response = await axios.post(endpoint, payload);
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

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated,
        loading,
        setUserRole,
        getUserInfo,
        handleLogout,
        setIsRegister,
        isRegister,
        userRole,
        userId,
        token,
        loginOrRegister,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
