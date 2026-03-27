import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React, { useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { GoogleService } from "./GoogleService";
import { FaGoogle } from "react-icons/fa";
import { SocialLogin } from "@capgo/capacitor-social-login";
import { Button } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
// import "@codetrix-studio/capacitor-google-auth";
// import { registerPlugin } from "@capacitor/core";

//

const platform = Capacitor.getPlatform();

const Google = ({ id: plantId, page }) => {
  console.log(plantId, page, "qui");
  const navigate = useNavigate();
  const { googleAccess, googleAccessTest, googleAccessTest2 } =
    useContext(AuthContext);
  return (
    <span
      className='mb-3 d-block w-100 btn btn-outline-secondary'
      variant='primary'
      onClick={() => googleAccess(navigate, plantId, page)}
    >
      <div className='d-flex align-items-center justify-content-center'>
        {" "}
        <FaGoogle />
        <span className='ps-2'>Accedi con Google</span>
      </div>
    </span>
  );
};

export default Google;
