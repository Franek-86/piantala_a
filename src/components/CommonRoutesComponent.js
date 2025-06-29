import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { App } from "@capacitor/app";
import { deepLinkFunk, navigationDeepLink } from "../services/deepLinkServices";

const CommonRoutesComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigationDeepLink(navigate);
    console.log("this 2");
    App.addListener("appUrlOpen", (data) => {
      console.log("this 3");
      let url = data.url;
      deepLinkFunk(url);
    });
  }, [navigate]);
  return <Outlet />;
};

export default CommonRoutesComponent;
