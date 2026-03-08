import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Image from "react-bootstrap/Image";

const ApprovedPic = ({ handleClosePic, showPic, img }) => {
  // const handleClosePic = () => setShowPic(false);
  // console.log("test", handleClosePic, showPic);
  console.log("test", img);

  return (
    <Modal show={showPic} onHide={handleClosePic}>
      <Modal.Header closeButton>
        <Modal.Title>Zona di piantagione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Image className='w-100' src={`${img}/171x180`} rounded />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClosePic}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovedPic;
