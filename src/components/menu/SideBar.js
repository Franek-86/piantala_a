import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { GiMetalPlate } from "react-icons/gi";
import sidebarLogo from "../../assets/images/logo_albero_dritto_sidebar.png";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { BsInfo } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiLion } from "react-icons/gi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { PiPottedPlantBold } from "react-icons/pi";
import { FaMap } from "react-icons/fa";
import { RiSeedlingFill } from "react-icons/ri";
import { PlantsContext } from "../../context/PlantsContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { MdLegendToggle } from "react-icons/md";
import { GiPlantSeed } from "react-icons/gi";
import { IoPeopleCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
const SideBar = () => {
  const { handleLogout, userRole, isAuthenticated } = useContext(AuthContext);

  const {
    setPlant,
    getAllPlants,
    plates,
    drop,
    setDrop,
    toggleDrop,
    unDropIt,
  } = useContext(PlantsContext);
  return (
    <section className='sidebar-large'>
      <Offcanvas.Header>
        <Offcanvas.Title>
          <img class='sidebar-logo' src={sidebarLogo} alt='' srcset='' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className='sidebar-section' variant='flush'>
          {/* from */}
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
              <span class='ms-2 d-sm-inline pe-5'>Piantine</span>
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
                // onClick={props.handleClose}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <MdLegendToggle />
                <span class='ms-2 d-sm-inline'>Legenda</span>
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink
                to='/myPlants'
                // onClick={props.handleClose}
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
                // onClick={props.handleClose}
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
          {/* to */}
          <ListGroup.Item>
            <NavLink
              to='/chi-siamo'
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
          <ListGroup.Item>
            <NavLink
              to='/info'
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
              <NavLink
                to='/login'
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <RiLogoutBoxLine />
                <span class='ms-2 d-sm-inline'>Log out</span>
              </NavLink>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-truncate sidebar-active"
                    : "nav-link text-truncate"
                }
              >
                <RiLoginBoxLine />
                <span class='ms-2 d-sm-inline'>Login/Registrati</span>
              </NavLink>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Offcanvas.Body>
    </section>
  );
};

export default SideBar;
