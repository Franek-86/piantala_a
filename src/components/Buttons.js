import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";
import { MdFilterAlt } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { MdAddLocationAlt } from "react-icons/md";
import SideMenu from "./SideMenu";

import FilterControls from "./FilterControls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";
import Avatar from "react-avatar";
import Loading from "../pages/Loading";

import L from "leaflet";
import { AuthContext } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import { RiH1 } from "react-icons/ri";
import LocationLoading from "./LocationLoading";

const Buttons = ({ setPosition, langMatch, latMatch, markerRef }) => {
  const { getUserInfo, userId, loggedUserInfo } = useContext(AuthContext);
  const [locationLoading, setLocationLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [smShow, setSmShow] = useState(false);
  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);
  const navigate = useNavigate(); // Initialize the navigate function
  const map = useMap();
  const test = () => {
    console.log("test111");
  };
  console.log("test1", smShow);
  return (
    <div className='section buttons-section'>
      {locationLoading && <Loading />}
      <ProfileModal smShow={smShow} setSmShow={setSmShow} />
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
          size='3rem'
          round='50%'
          // src='https://example.com/user-avatar.jpg'
          className='avatar'
          fgColor='#0e722d'
          name={loggedUserInfo.userName}
          onClick={() => setSmShow(true)}
        />

        <Button
          onClick={() => {
            console.log("sta");
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
                })
                .on("locationerror", function (err) {
                  console.log("location error", err);
                });
            }
            if (!map) {
              console.log("non sta la mappa");
            }
          }}
          className='circle-button p-0'
        >
          <MdAddLocationAlt />
        </Button>
        <Link className='circle-button add-plant-manual' to='addPlant'>
          <MdAdd />
        </Link>
        <Button
          variant='primary'
          onClick={handleShowFilters}
          className='circle-button p-0'
        >
          <MdFilterAlt />
        </Button>

        <Button
          onClick={() => {
            console.log("ciao");
            map.flyTo([41.118778112249046, 16.871917818963464], 13);
          }}
          className='circle-button p-0 '
        >
          <MdCenterFocusStrong />
        </Button>
        <a className='circle-button' href='tel:+393485384563'>
          <MdLocalPhone />
        </a>
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
