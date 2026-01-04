import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

const ProfileModal = ({ smShow, setSmShow }) => {
  const { handleLogout, clientDomain, googleAccess, isAuthenticated } =
    useContext(AuthContext);
  const { loggedUserInfo } = useContext(UsersContext);
  const navigate = useNavigate();

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
          {isAuthenticated ? loggedUserInfo.userName : "Effettua l'accesso!"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          {" "}
          {isAuthenticated
            ? loggedUserInfo.email
            : "Per poter segnalare zone di piantagione o acquistare piantine, partecipare alla chat e tanto altro ancora ti invitiamo ad effettuare l'accesso"}
        </span>
        <div className='profile-links mt-2 d-flex flex-row justify-content-between'>
          {/* <Link className='d-block w-100 mb-2'>Immagine profilo</Link> */}
          <Link to={`${clientDomain}/login`} onClick={handleLogout}>
            {" "}
            {isAuthenticated ? "Logout" : "Login/registrati"}
          </Link>
          {isAuthenticated ? (
            <Link to='/profile'> Modifica profilo</Link>
          ) : (
            <Button
              onClick={() => {
                googleAccess(navigate, null, null);
              }}
            >
              Accedi con Google
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
