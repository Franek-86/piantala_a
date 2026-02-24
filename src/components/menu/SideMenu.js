import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
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
            <Link to='/map' class='nav-link text-truncate'>
              <FaMap />
              <span class='ms-2 d-sm-inline'>Mappa</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/chi-siamo' class='nav-link text-truncate'>
              <RiSeedlingFill />
              <span class='ms-2 d-sm-inline'>Chi siamo</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/info' class='nav-link text-truncate'>
              <BsInfo />
              <span class='ms-2 d-sm-inline'>Info</span>
            </Link>
          </ListGroup.Item>
          {userRole === "admin" && (
            <ListGroup.Item>
              <Link to='/users' class='nav-link text-truncate'>
                <FaUsers />
                <span class='ms-2 d-sm-inline'>Utenti</span>
              </Link>
            </ListGroup.Item>
          )}
          {userRole === "admin" && (
            <ListGroup.Item>
              <Link to='/orders' class='nav-link text-truncate'>
                <MdOutlineShoppingCartCheckout />
                <span class='ms-2 d-sm-inline'>Ordini</span>
              </Link>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Link to='/plates' class='nav-link text-truncate'>
              <GiMetalPlate />
              <span class='ms-2 d-sm-inline'>Le vostre targhe</span>
            </Link>
          </ListGroup.Item>

          <ListGroup.Item>
            <Link to='/chat' class='nav-link text-truncate'>
              <IoMdChatbubbles />
              <span class='ms-2 d-sm-inline'>Chat</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/contacts' class='nav-link text-truncate'>
              <RiContactsLine />
              <span class='ms-2 d-sm-inline'>Contattaci</span>
            </Link>
          </ListGroup.Item>

          {isAuthenticated ? (
            <ListGroup.Item>
              <Link
                to='/'
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
