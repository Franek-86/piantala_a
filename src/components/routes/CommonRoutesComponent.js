import { App } from "@capacitor/app";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  navigateFunction,
  navigateToFunction,
} from "../../services/deepLinkServices";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { PlantsContext } from "../../context/PlantsContext";
const CommonRoutesComponent = () => {
  const navigate = useNavigate();
  navigateFunction(navigate);
  const { dropIt } = useContext(PlantsContext);
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
  useEffect(() => {
    console.log("qq", location);
    if (
      location?.pathname === "/legend" ||
      location?.pathname === "/myPlants" ||
      location?.pathname === "/bookedPlants" ||
      location?.pathname === "/map"
    ) {
      dropIt();
    }
  }, [location?.pathname]);
  return <Outlet />;
};

export default CommonRoutesComponent;
