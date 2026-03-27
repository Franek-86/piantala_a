import { App } from "@capacitor/app";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  navigateFunction,
  navigateToFunction,
} from "../../services/deepLinkServices";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { PlantsContext } from "../../context/PlantsContext";

const CommonRoutesComponent = () => {
  const { plantId } = useParams();

  const navigate = useNavigate();
  navigateFunction(navigate);
  const { dropIt, setBookingInfo } = useContext(PlantsContext);
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
    if (
      location?.pathname === "/legend" ||
      location?.pathname === "/myPlants" ||
      location?.pathname === "/bookedPlants" ||
      location?.pathname === "/map"
    ) {
      dropIt();
    }
    if (
      !location?.pathname.endsWith("payment") &&
      !location?.pathname.endsWith("plate") &&
      !location?.pathname.endsWith("location") &&
      !location?.pathname.endsWith("checkout") &&
      !location?.pathname.endsWith("return") &&
      !location?.pathname.endsWith(`${plantId}`)
    ) {
      localStorage.removeItem("booking-info");
      setBookingInfo({
        userId: "",
        plantId: "",
        plateText: "",
      });
    }
  }, [location?.pathname]);
  return <Outlet />;
};

export default CommonRoutesComponent;
