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
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { MdLegendToggle } from "react-icons/md";
import { GiPlantSeed } from "react-icons/gi";
import { IoPeopleCircle } from "react-icons/io5";
import { PiPottedPlantBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
const SideMenu = ({ onLogout, ...props }) => {
  const { handleLogout, userRole, isAuthenticated } = useContext(AuthContext);
  const { getAllPlants, plates, drop, setDrop, toggleDrop, unDropIt } =
    useContext(PlantsContext);
  const [isLoaded, setIsLoaded] = useState(false);

  // const isLargeScreen = useIsLargeScreen();
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <Offcanvas show={props.show} onHide={props.handleClose}>
      <section className='sidebar-small min-100'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img class='sidebar-logo' src={sidebarLogo} alt='' srcset='' />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup className='sidebar-section' variant='flush'>
            <ListGroup.Item>
              <NavLink
                // to='/map'
                onClick={() => toggleDrop()}
                // className={({ isActive }) =>
                //   isActive
                //     ? "nav-link text-truncate sidebar-active"
                //     : "nav-link text-truncate"
                // }
                className='nav-link text-truncate'
              >
                <PiPottedPlantBold />
                <span class='ms-2 d-sm-inline pe-5'>Mappa piantine</span>
                {drop ? (
                  <IoMdArrowDropdown
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-truncate sidebar-active"
                        : "nav-link text-truncate"
                    }
                  />
                ) : (
                  <IoMdArrowDropright
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-truncate sidebar-active"
                        : "nav-link text-truncate"
                    }
                  />
                )}
              </NavLink>
            </ListGroup.Item>
            <ListGroup
              className={`${drop ? "d-block" : "d-none"} sidebar-section ps-3`}
              variant='flush'
            >
              <ListGroup.Item>
                <NavLink
                  to='/map'
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-truncate sidebar-active"
                      : "nav-link text-truncate"
                  }
                >
                  <FaMap />
                  <span class='ms-2 d-sm-inline pe-5'>Mappa</span>
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink
                  to='/legend'
                  onClick={props.handleClose}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-truncate sidebar-active"
                      : "nav-link text-truncate"
                  }
                >
                  <MdLegendToggle />
                  <span class='ms-2 d-sm-inline'>Legenda mappa</span>
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink
                  to='/myPlants'
                  onClick={props.handleClose}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-truncate sidebar-active"
                      : "nav-link text-truncate"
                  }
                >
                  <GiPlantSeed />
                  <span class='ms-2 d-sm-inline'>Le mie segnalazioni</span>
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink
                  to='/bookedPlants'
                  onClick={props.handleClose}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-truncate sidebar-active"
                      : "nav-link text-truncate"
                  }
                >
                  <RiSeedlingFill />
                  <span class='ms-2 d-sm-inline'>I miei acquisti</span>
                </NavLink>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item onClick={() => unDropIt()}>
              <NavLink
                to='/chi-siamo'
                onClick={props.handleClose}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <IoPeopleCircle />
                <span class='ms-2 d-sm-inline'>Chi siamo</span>
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => unDropIt()}>
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
              <ListGroup.Item onClick={() => unDropIt()}>
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
              <ListGroup.Item onClick={() => unDropIt()}>
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
            <ListGroup.Item onClick={() => unDropIt()}>
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

            <ListGroup.Item onClick={() => unDropIt()}>
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
            <ListGroup.Item onClick={() => unDropIt()}>
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
              <>
                <ListGroup.Item onClick={() => unDropIt()}>
                  <NavLink
                    to='/profile'
                    // onClick={handleLogout}
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-truncate sidebar-active"
                        : "nav-link text-truncate"
                    }
                  >
                    <CgProfile />
                    <span class='ms-2 d-sm-inline'>Modifica profilo</span>
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item onClick={() => unDropIt()}>
                  <Link
                    to='/login'
                    onClick={handleLogout}
                    class='nav-link text-truncate'
                  >
                    <RiLogoutBoxLine />
                    <span class='ms-2 d-sm-inline'>Log out</span>
                  </Link>
                </ListGroup.Item>
              </>
            ) : (
              <ListGroup.Item onClick={() => unDropIt()}>
                <Link to='/login' class='nav-link text-truncate'>
                  <RiLoginBoxLine />
                  <span class='ms-2 d-sm-inline'>Login/Registrati</span>
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </section>
    </Offcanvas>
  );
};

export default SideMenu;
