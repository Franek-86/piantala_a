import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

import { GoogleService } from "./GoogleService";

const platform = Capacitor.getPlatform();

const Google = () => {
  // const init = GoogleAuth.initialize({
  //   clientId: process.env.REACT_APP_GOOGLE_ID_ANDROID,
  //   scopes: ["profile", "email"],
  // });

  const test = async () => {
    const gl = new GoogleService();
    await gl.login();
  };

  const navigate = useNavigate();
  const { googleAccess } = useContext(AuthContext);
  return platform === "web" ? (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID_WEB}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googleAccess(credentialResponse, navigate);
        }}
        onError={() => {
          console.log("error");
        }}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  ) : (
    <button onClick={() => test()}>Test, non cliccare</button>
  );
};

export default Google;
