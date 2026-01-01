import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { Capacitor } from "@capacitor/core";

const Landing = () => {
  const navigate = useNavigate();
  const { checkToken: check } = useContext(AuthContext);
  const checkPlatform = Capacitor.isNativePlatform();
  useEffect(() => {
    const verify = async () => {
      if (checkPlatform) {
        const checkToken = await check();
        if (checkToken === "login") {
          navigate("/login");
        } else {
          navigate("/map");
        }
      } else {
        navigate("/map");
      }
    };
    verify();
  }, []);
  // return <div>Landing</div>;
};

export default Landing;
