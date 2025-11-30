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
  // const init = GoogleAuth.initialize({
  //   clientId: process.env.REACT_APP_GOOGLE_ID_ANDROID,
  //   scopes: ["profile", "email"],
  // });

  // const test = async () => {
  //   const gl = new GoogleService();
  //   await gl.login();
  // };
  // const test = async () => {
  //   let googleUser = await registerPlugin.GoogleAuth.signIn();
  //   console.log("here", googleUser);
  // };

  // const test1 = async () => {
  //   try {
  //     await SocialLogin.initialize({
  //       google: {
  //         webclientId: process.env.REACT_APP_GOOGLE_ID_WEB,
  //         iOSClientId: "",
  //         mode: "offline",
  //       },
  //     });
  //     const response = await SocialLogin.login({
  //       provider: "google",
  //       options: {
  //         scopes: ["email", "profile"],
  //         forceRefreshToken: true,
  //       },
  //     });
  //     console.log("response da test1", response);
  //   } catch (err) {
  //     console.log("error da test1", err);
  //   }
  // };
  let resp;
  const test = async () => {
    const resp = await SocialLogin.initialize({
      google: {
        webClientId: process.env.REACT_APP_GOOGLE_ID_WEB,
      },
    });
    console.log("check test", resp);
  };
  if (resp) {
    console.log("check test", resp);
  }
  useEffect(() => {
    const init = async () => {
      await SocialLogin.initialize({
        google: {
          webClientId: process.env.REACT_APP_GOOGLE_ID_WEB,
          redirectUrl: "http://localhost:3000/map",
        },
      });
    };
    init();
  }, []);

  const test0 = async () => {
    try {
      const res = await SocialLogin.login({
        provider: "google",
        options: {},
      });
      console.log("check this", JSON.stringify(res));
    } catch (err) {
      console.log("check this", err);
    }
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
    <button className='test-temp' onClick={() => test0()}>
      a
    </button>
  );
};

export default Google;
