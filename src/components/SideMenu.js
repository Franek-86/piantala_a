import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { GiMetalPlate } from "react-icons/gi";
import sidebarLogo from "../assets/images/logo_albero_dritto_sidebar.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { BsInfo } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
const SideMenu = ({ onLogout, ...props }) => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <Offcanvas show={props.show} onHide={props.handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img class='sidebar-logo' src={sidebarLogo} alt='' srcset='' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Link to='/contacts' class='nav-link text-truncate'>
              <RiContactsLine />
              <span class='ms-2 d-sm-inline'>Contattaci</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/plates' class='nav-link text-truncate'>
              <GiMetalPlate />
              <span class='ms-2 d-sm-inline'>Le vostre targhe</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/info' class='nav-link text-truncate'>
              <BsInfo />
              <span class='ms-2 d-sm-inline'>Info</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/users' class='nav-link text-truncate'>
              <FaUsers />
              <span class='ms-2 d-sm-inline'>Utenti</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/' onClick={handleLogout} class='nav-link text-truncate'>
              <RiLogoutBoxLine />
              <span class='ms-2 d-sm-inline'>Log out</span>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
