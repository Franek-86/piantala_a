import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";

const DeleteProfile = ({ show, handleClose }) => {
  const {
    deleteProfile,
    loggedUserInfo: { id },
  } = useContext(UsersContext);
  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cancella profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sei sicuro di voler cancellare il profilo? Se clicchi su "cancella
        profilo" tuoi dati personali verranno cancellati.
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button
          variant='danger'
          onClick={() => {
            deleteProfile(id);
            navigate("/");
          }}
        >
          cancella profilo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProfile;
