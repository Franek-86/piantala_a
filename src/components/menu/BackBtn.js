import React, { useContext } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import sidebarlogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import useScrollDirection from "../../utils/useScrollDirection";
import { Capacitor } from "@capacitor/core";
import { PlantsContext } from "../../context/PlantsContext";

const BackBtn = ({ plant }) => {
  const navigate = useNavigate();
  const direction = useScrollDirection();
  const app = Capacitor.isNativePlatform();
  const { setPlant } = useContext(PlantsContext);
  const backNav = () => {
    if (direction === "down" && !app) {
      return "back-nav hide";
    } else if (direction === "down" && app) {
      return "back-nav pt-4 pb-2 hide";
    } else if (direction !== "down" && app) {
      return "back-nav pt-4 pb-2";
    } else if (direction !== "down" && !app) {
      return "back-nav";
    }
  };

  const backToMap = () => {
    navigate("/map");
    setPlant(null);
  };
  return (
    <article className={backNav()}>
      <div className='back-nav-logo'>
        <img src={sidebarlogo} alt='' />
      </div>

      <div className='back-nav-btn'>
        <MdBackspace onClick={() => backToMap()} />
      </div>
    </article>
  );
};

export default BackBtn;
