import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate();
  const { googleAccess } = useContext(AuthContext);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googleAccess(credentialResponse, navigate);
        }}
        onError={() => {
          console.log("error");
        }}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default Google;
