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
import Avatar from "react-avatar";
import { UsersContext } from "../../context/UsersContext";
import { AuthContext } from "../../context/AuthContext";
import ProfileModal from "../user-profile/ProfileModal";

const BackBtn = ({ plant }) => {
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  const navigate = useNavigate();
  const direction = useScrollDirection();
  const app = Capacitor.isNativePlatform();
  const { isAuthenticated } = useContext(AuthContext);
  // const { setPlant } = useContext(PlantsContext);

  const {
    loggedUserInfo: { pic, userName },
  } = useContext(UsersContext);
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

  // const backToMap = () => {
  //   navigate("/map");
  //   setPlant(null);
  // };
  return (
    <article className={backNav()}>
      {smShow && <ProfileModal smShow={smShow} setSmShow={setSmShow} />}
      <div className='back-nav-logo'>
        <span
          onClick={() => {
            handleShow();
          }}
          // style={{ width: "3rem", height: "3rem" }}

          className='fs-2 back-nav-icon'
        >
          <BiMenu />
        </span>
      </div>

      <div className='back-nav-btn'>
        {/* <MdBackspace onClick={() => backToMap()} /> */}
        <Avatar
          src={pic}
          size='2rem'
          round='50%'
          // src='https://example.com/user-avatar.jpg'
          className='avatar'
          fgColor='#fefee3'
          name={isAuthenticated ? userName : null}
          onClick={() => setSmShow(true)}
        />
      </div>
      <SlideMenu show={show} handleClose={handleHide} />
    </article>
  );
};

export default BackBtn;
