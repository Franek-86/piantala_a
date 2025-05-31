import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ensurePermission } from "../utils/utils";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const PermissionModal = () => {
  const {
    showPermissionModal,
    handleClosePermissionModal,
    handleLogout,
    handleShowPermissionModal,
  } = useContext(AuthContext);
  const ensurePermissionAndCloseModal = async () => {
    const permission = await ensurePermission();
    if (!permission) {
      handleLogout();
      toast.error(`geolocalizzazione necessaria`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } else {
      handleClosePermissionModal();
    }
  };

  return (
    <Modal
      show={showPermissionModal}
      onHide={handleClosePermissionModal}
      centred
    >
      <Modal.Header>
        <Modal.Title>Consenti localizzazione</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Per utilizzare questa app e segnalare le zone di piantagione è
          necessario fornire informazioni relative alla geolocalizzazione
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleLogout()}>
          Esci dall'app
        </Button>
        <Button
          variant='primary'
          onClick={() => ensurePermissionAndCloseModal()}
        >
          Accetta geolocalizzazione
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermissionModal;
