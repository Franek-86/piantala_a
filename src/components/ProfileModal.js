import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProfileModal = ({ smShow, setSmShow }) => {
  const { loggedUserInfo, handleLogout } = useContext(AuthContext);
  return (
    <Modal
      className='profile-modal'
      size='sm'
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby='example-modal-sizes-title-sm'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-sm'>
          {loggedUserInfo.userName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span> {loggedUserInfo.email}</span>
        <div className='profile-links mt-2 d-flex flex-row justify-content-between'>
          {/* <Link className='d-block w-100 mb-2'>Immagine profilo</Link> */}
          <Link to='\' onClick={handleLogout}>
            {" "}
            Logout
          </Link>
          <Link to='/profile'> Modifica profilo</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
