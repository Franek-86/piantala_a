import { App } from "@capacitor/app";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  navigateFunction,
  navigateToFunction,
} from "../../services/deepLinkServices";
import { useEffect } from "react";
import { toast } from "react-toastify";
const CommonRoutesComponent = () => {
  const navigate = useNavigate();
  navigateFunction(navigate);
  const location = useLocation();
  useEffect(() => {
    App.addListener("appUrlOpen", (data) => {
      let url = data.url;
      navigateToFunction(url);
    });
  }, [navigate]);
  useEffect(() => {
    toast.dismiss();
  }, [location]);
  return <Outlet />;
};

export default CommonRoutesComponent;
