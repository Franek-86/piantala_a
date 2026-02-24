import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";
import { MdFilterAlt } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { MdAddLocationAlt } from "react-icons/md";
import FilterControls from "./FilterControls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMap, useMapEvent } from "react-leaflet";
import Avatar from "react-avatar";
import Loading from "../../pages/Loading";
import { AuthContext } from "../../context/AuthContext";
import { UsersContext } from "../../context/UsersContext";
import ProfileModal from "./../user-profile/ProfileModal";
import SideMenu from "../menu/SideMenu";
import iconGreen from "../../assets/images/ti pianto per amore-APP-verde.png";
import iconBlue from "../../assets/images/ti pianto per amore-APP-azzurro.png";
import { FilterContext } from "../../context/FilterContext";
import { toast } from "react-toastify";
import { PlantsContext } from "../../context/PlantsContext";

const Buttons = ({ setPosition, position, langMatch, latMatch, markerRef }) => {
  const { userRole, isAuthenticated, showTerms } = useContext(AuthContext);
  const { loggedUserInfo } = useContext(UsersContext);
  const { totApproved, totBooked } = useContext(PlantsContext);
  const { pic } = loggedUserInfo;
  const [locationLoading, setLocationLoading] = useState(false);
  const [showCenter, setShowCenter] = useState(null);
  const [show, setShow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [smShow, setSmShow] = useState(false);
  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);
  const navigate = useNavigate(); // Initialize the navigate function
  const map = useMap();
  const { setFilters, filters } = useContext(FilterContext);

  useMapEvent("dragend", () => {
    setShowCenter(true);
  });
  const piantineAcquistabili = () => {
    return (
      <>
        <img style={{ width: "1rem" }} src={`${iconGreen}`}></img>
        <div className='ps-3 d-flex flex-column'>
          <span className='filter-alert fw-bold'>Piantine acquistabili</span>
          <span className='filter-alert'>Totale: {totApproved}</span>
        </div>
      </>
    );
  };
  const piantineAcquistate = () => {
    return (
      <>
        <img style={{ width: "1rem" }} src={`${iconBlue}`}></img>
        <div className='ps-3 d-flex flex-column'>
          <span className='filter-alert fw-bold'>Piantine acquistate</span>
          <span className='filter-alert'>Totale: {totBooked}</span>
        </div>
      </>
    );
  };
  return (
    <div className='section buttons-section'>
      {locationLoading && <Loading />}
      {!showTerms && <ProfileModal smShow={smShow} setSmShow={setSmShow} />}
      <div className='leftButton d-lg-none'>
        {/* <div className='test1'>
          <img src={logo} alt='' className='map-logo' />
        </div> */}
        <Button
          variant='primary'
          style={{ width: "3rem", height: "3rem" }}
          onClick={handleShow}
          className='circle-button menu-button p-0'
        >
          <BiMenu />
        </Button>
      </div>
      <div className='rightButtons'>
        <Avatar
          src={pic}
          size='3rem'
          round='50%'
          // src='https://example.com/user-avatar.jpg'
          className='avatar'
          fgColor='#0e722d'
          name={isAuthenticated ? loggedUserInfo.userName : null}
          onClick={() => setSmShow(true)}
        />
        {userRole === "admin" && (
          <Link
            className='circle-button add-plant-manual'
            to='addPlant'
            state={{ fromManual: true }}
          >
            <MdAdd />
          </Link>
        )}
        {userRole === "admin" ? (
          <Button
            variant='primary'
            onClick={handleShowFilters}
            className='circle-button p-0'
          >
            <MdFilterAlt />
          </Button>
        ) : (
          <>
            <Button
              variant='primary'
              onClick={() => {
                setFilters({ suburb: "", status: "approved" });
                setPosition(null);
                toast(piantineAcquistabili, {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "info",
                  className: "toast-approved",
                  // transition: Bounce,
                });
              }}
              className={
                filters.status === "approved"
                  ? "circle-button filter-plants-button filter-approved p-0"
                  : "circle-button filter-plants-button p-0"
              }
            >
              {/* <MdFilterAlt /> */}
              <img style={{ width: "1rem" }} src={iconGreen} alt='' />
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                setFilters({ suburb: "", status: "booked" });
                setPosition(null);
                toast(piantineAcquistate, {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  options: {
                    limit: 1,
                  },
                  newestOnTop: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "info",
                  className: "toast-booked",
                  // transition: Bounce,
                });
              }}
              className={
                filters.status === "booked"
                  ? "circle-button filter-plants-button filter-booked p-0"
                  : "circle-button filter-plants-button p-0"
              }
            >
              {/* <MdFilterAlt /> */}
              <img style={{ width: "1rem" }} src={iconBlue} alt='' />
            </Button>
          </>
        )}
        <Button
          onClick={() => {
            setLocationLoading(true);

            if (map) {
              map
                .locate({ timeout: 15000, enableHighAccuracy: true })
                .on("locationfound", function (e) {
                  // setPosition(e.latlng);
                  map.flyTo(e.latlng, 17);
                  setPosition({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                  });
                  setLocationLoading(false);
                  setShowCenter(true);
                })
                .on("locationerror", function (err) {
                  console.log("location error", err);
                  setLocationLoading(false);
                  switch (err.code) {
                    case 1:
                      alert(
                        "Per poter segnalare la zona di piantagione è necessario consetire l'accesso alla tua posizione nelle impostazioni del browser.",
                      );
                      break;
                    case 2:
                      alert("Errore due di geolocalizzazione");
                      break;
                  }
                });
            }
            if (!map) {
              console.log("non sta la mappa");
            }
          }}
          className='circle-button report-btn p-0'
        >
          <MdAddLocationAlt />
        </Button>
        {showCenter ? (
          <Button
            onClick={() => {
              // map.flyTo([41.118778112249046, 16.871917818963464], 13);
              map.flyTo([41.118778112249046, 16.881917818963464], 13);
              setShowCenter(false);
            }}
            className='circle-button center-btn p-0 '
          >
            <MdCenterFocusStrong />
          </Button>
        ) : null}
        {/* <a className='circle-button' href='tel:+393485384563'>
          <MdLocalPhone />
        </a> */}
      </div>
      {/* Include the SideMenu component */}
      <SideMenu
        data-bs-target='#staticBackdrop'
        // onLogout={handleLogout}
        handleClose={handleClose}
        show={show}
      />

      <FilterControls
        data-bs-target='#staticBackdrop'
        handleCloseFilters={handleCloseFilters}
        showFilters={showFilters}
      />
    </div>
  );
};

export default Buttons;
