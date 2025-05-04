import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const { checkToken } = useContext(AuthContext);

  useEffect(() => {
    const verify = async () => {
      const check = await checkToken();
      if (check === "login") {
        navigate("/login");
      } else {
        navigate("/map");
      }
    };
    verify();
  }, []);
  // return <div>Landing</div>;
};

export default Landing;
