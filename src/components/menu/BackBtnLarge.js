import React, { useContext, useState } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import sidebarlogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import useScrollDirection from "../../utils/useScrollDirection";
import { Capacitor } from "@capacitor/core";
import { PlantsContext } from "../../context/PlantsContext";
import Avatar from "react-avatar";
import { UsersContext } from "../../context/UsersContext";
import ProfileModal from "../user-profile/ProfileModal";
import { AuthContext } from "../../context/AuthContext";

const BackBtnLarge = ({ map }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    loggedUserInfo: { pic, userName },
  } = useContext(UsersContext);
  const { setPlant } = useContext(PlantsContext);
  const navigate = useNavigate();
  const direction = useScrollDirection();
  const app = Capacitor.isNativePlatform();
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  console.log("ttttt", app);
  console.log("direction", direction);

  const backNav = () => {
    if (map && !app) {
      return "back-nav-large-map";
    }
    if (direction === "down" && !app) {
      return "back-nav-large hide";
    } else if (direction === "down" && app) {
      return "back-nav-large hide";
    } else if (direction !== "down" && app) {
      return "back-nav-large";
    } else if (direction !== "down" && !app) {
      return "back-nav-large";
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
        {/* <img src={sidebarlogo} alt='' /> */}
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
      {/* <div className='back-nav-btn'>
        <MdBackspace onClick={() => backToMap()} />
      </div> */}
    </article>
  );
};

export default BackBtnLarge;
