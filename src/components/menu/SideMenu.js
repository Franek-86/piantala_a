import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink, Link } from "react-router-dom";
import {
  RiLogoutBoxLine,
  RiSeedlingFill,
  RiLoginBoxLine,
} from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { GiMetalPlate } from "react-icons/gi";
import sidebarLogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import { BsInfo } from "react-icons/bs";
import { GiLion } from "react-icons/gi";
import { FaMap, FaUsers } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { PlantsContext } from "../../context/PlantsContext";
import Fancybox from "../plates/Fancybox";

const SideMenu = ({ onLogout, ...props }) => {
  const { handleLogout, userRole, isAuthenticated } = useContext(AuthContext);
  const { getAllPlants, plates } = useContext(PlantsContext);
  const [isLoaded, setIsLoaded] = useState(false);
  // const isLargeScreen = useIsLargeScreen();
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <Offcanvas show={props.show} onHide={props.handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img class='sidebar-logo' src={sidebarLogo} alt='' srcset='' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className='sidebar-section' variant='flush'>
          <ListGroup.Item>
            <NavLink
              to='/map'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <FaMap />
              <span class='ms-2 d-sm-inline'>Mappa</span>
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink
              to='/chi-siamo'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <RiSeedlingFill />
              <span class='ms-2 d-sm-inline'>Chi siamo</span>
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink
              to='/info'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <BsInfo />
              <span class='ms-2 d-sm-inline'>Info</span>
            </NavLink>
          </ListGroup.Item>
          {userRole === "admin" && (
            <ListGroup.Item>
              <NavLink
                to='/users'
                onClick={props.handleClose}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <FaUsers />
                <span class='ms-2 d-sm-inline'>Utenti</span>
              </NavLink>
            </ListGroup.Item>
          )}
          {userRole === "admin" && (
            <ListGroup.Item>
              <NavLink
                to='/orders'
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <MdOutlineShoppingCartCheckout />
                <span class='ms-2 d-sm-inline'>Ordini</span>
              </NavLink>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <NavLink
              to='/plates'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <GiMetalPlate />
              <span class='ms-2 d-sm-inline'>Le vostre targhe</span>
            </NavLink>
          </ListGroup.Item>

          <ListGroup.Item>
            <NavLink
              to='/chat'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <IoMdChatbubbles />
              <span class='ms-2 d-sm-inline'>Chat</span>
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item>
            <NavLink
              to='/contacts'
              onClick={props.handleClose}
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-truncate sidebar-active"
                  : "nav-link text-truncate"
              }
            >
              <RiContactsLine />
              <span class='ms-2 d-sm-inline'>Contattaci</span>
            </NavLink>
          </ListGroup.Item>

          {isAuthenticated ? (
            <ListGroup.Item>
              <Link
                to='/login'
                onClick={handleLogout}
                class='nav-link text-truncate'
              >
                <RiLogoutBoxLine />
                <span class='ms-2 d-sm-inline'>Log out</span>
              </Link>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item>
              <Link to='/login' class='nav-link text-truncate'>
                <RiLoginBoxLine />
                <span class='ms-2 d-sm-inline'>Login/Registrati</span>
              </Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
