import React from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import sidebarlogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import useScrollDirection from "../../utils/useScrollDirection";
import { Capacitor } from "@capacitor/core";

const BackBtn = () => {
  const navigate = useNavigate();
  const direction = useScrollDirection();
  const app = Capacitor.isNativePlatform();
  console.log("ttttt", app);
  console.log("direction", direction);

  const backNav = () => {
    if (direction === "down" && !app) {
      return "back-nav hide";
    } else if (direction === "down" && app) {
      return "back-nav hide";
    } else if (direction !== "down" && app) {
      return "back-nav";
    } else if (direction !== "down" && !app) {
      return "back-nav";
    }
  };

  const backToMap = () => {
    navigate("/map");
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
