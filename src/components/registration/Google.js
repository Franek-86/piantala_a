import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React, { useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { GoogleService } from "./GoogleService";

import { SocialLogin } from "@capgo/capacitor-social-login";
import { Button } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
// import "@codetrix-studio/capacitor-google-auth";
// import { registerPlugin } from "@capacitor/core";

//

const platform = Capacitor.getPlatform();

const Google = ({ id: plantId }) => {
  const navigate = useNavigate();
  const { googleAccess, googleAccessTest, googleAccessTest2 } =
    useContext(AuthContext);

  return platform !== "web" ? (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID_WEB}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleAccess(credentialResponse, navigate, plantId);
          }}
          onError={() => {
            console.log("error");
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
      {/* <button className='test-temp' onClick={() => googleAccessTest(navigate)}>
        test
      </button> */}
    </>
  ) : (
    // <button className='test-temp' onClick={() => googleAccessTest(navigate)}>
    //   test
    // </button>
    <>
      <Button
        className='d-block w-100'
        variant='primary'
        onClick={() => googleAccess(navigate, plantId)}
      >
        {" "}
        Accedi con Google
      </Button>
      {/* <Button
        className='d-block w-100'
        variant='primary'
        onClick={() => googleAccessTest2(navigate)}
      >
        {" "}
        Test
      </Button> */}
    </>
  );
};

export default Google;
