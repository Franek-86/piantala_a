import { App } from "@capacitor/app";
import { Outlet, useNavigate } from "react-router-dom";

import {
  navigateFunction,
  navigateToFunction,
} from "../../services/deepLinkServices";
import { useEffect } from "react";
const CommonRoutesComponent = () => {
  const navigate = useNavigate();
  navigateFunction(navigate);

  useEffect(() => {
    App.addListener("appUrlOpen", (data) => {
      let url = data.url;
      navigateToFunction(url);
    });
  }, [navigate]);
  return <Outlet />;
};

export default CommonRoutesComponent;
