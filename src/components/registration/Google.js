import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React, { useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

import { GoogleService } from "./GoogleService";
//
import { SocialLogin } from "@capgo/capacitor-social-login";
// import "@codetrix-studio/capacitor-google-auth";
// import { registerPlugin } from "@capacitor/core";

//

const platform = Capacitor.getPlatform();

const Google = () => {
  useEffect(() => {
    SocialLogin.initialize({
      google: {
        webClientId:
          "349628103780-laqfu0q8jg5nb58q1sbq3cfk7ai6lfu8.apps.googleusercontent.com",
      },
    });
  });
  const test0 = async () => {
    try {
      const res = await SocialLogin.login({
        provider: "google",
        options: {},
      });
      const credentialResponse = JSON.stringify(res);

      googleAccessTest(credentialResponse);
    } catch (err) {
      console.log("check this", err);
    }
  };

  const navigate = useNavigate();
  const { googleAccess, googleAccessTest } = useContext(AuthContext);
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
    <button className='test-temp' onClick={() => test0()}>
      test
    </button>
  );
};

export default Google;
