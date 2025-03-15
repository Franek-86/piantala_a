import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";
import { MdFilterAlt } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import logo from "../assets/images/logo-mappa-1.png";
import SideMenu from "./SideMenu";
import FilterControls from "./FilterControls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { MdAddLocation } from "react-icons/md";
import Avatar from "react-avatar";

import L from "leaflet";
import { AuthContext } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
const Buttons = ({ setPosition, langMatch, latMatch, markerRef }) => {
  const { getUserInfo, userId, loggedUserInfo } = useContext(AuthContext);
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
      <ProfileModal smShow={smShow} setSmShow={setSmShow} />
      <div className='leftButton'>
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
          src='https://example.com/user-avatar.jpg'
          color='#b7d9c2'
          fgColor='#0e722d'
          name={loggedUserInfo.userName}
          onClick={() => setSmShow(true)}
        />

        <Button
          onClick={() =>
            map.locate().on("locationfound", function (e) {
              // setPosition(e.latlng);
              map.flyTo(e.latlng, 17);
              setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
              // const marker = markerRef.current;
              // console.log("aooo", marker);
              // if (marker) {
              //   console.log("aoooa", marker);
              //   marker.openPopup();
              // }
              // console.log(markerRef);
            })
          }
          className='circle-button p-0'
        >
          <MdAddLocation />
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
