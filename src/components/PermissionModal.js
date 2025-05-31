import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ensurePermission } from "../utils/utils";
import { AuthContext } from "../context/AuthContext";

const PermissionModal = () => {
  const {
    showPermissionModal,
    handleClosePermissionModal,
    handleLogout,
    handleShowPermissionModal,
  } = useContext(AuthContext);
  const ensurePermissionAndCloseModal = () => {
    ensurePermission();
    handleClosePermissionModal();
  };

  return (
    <Modal show={showPermissionModal} onHide={handleClosePermissionModal}>
      <Modal.Header closeButton>
        <Modal.Title>Consenti localizzazione</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Per utilizzare questa app e segnalare le zone di piantagione è
          necessario fornire informazioni relative alla geolocalizzazione
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary'>Esci dall'app</Button>
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
