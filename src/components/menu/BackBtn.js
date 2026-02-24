import React, { useContext, useState } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import sidebarlogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import useScrollDirection from "../../utils/useScrollDirection";
import { Capacitor } from "@capacitor/core";
import { PlantsContext } from "../../context/PlantsContext";
import { BiMenu } from "react-icons/bi";
import { HiMenuAlt2 } from "react-icons/hi";
import { Button } from "react-bootstrap";
import SlideMenu from "./SideMenu";

const BackBtn = ({ plant }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
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
      return "back-nav back-nav-app pt-4 pb-2";
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
        <span
          onClick={() => {
            handleShow();
          }}
          className='fs-2 back-nav-icon'
        >
          <HiMenuAlt2 />
        </span>
      </div>

      <div className='back-nav-btn'>
        {/* <MdBackspace onClick={() => backToMap()} /> */}
      </div>
      <SlideMenu show={show} handleClose={handleHide} />
    </article>
  );
};

export default BackBtn;
