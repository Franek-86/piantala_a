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
        <div className='profile-links mt-2'>
          {/* <Link className='d-block w-100 mb-2'>Immagine profilo</Link> */}
          <Link to='\' onClick={handleLogout}>
            {" "}
            Logout
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

// function Example() {
//   const [smShow, setSmShow] = useState(false);
//   const [lgShow, setLgShow] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setSmShow(true)} className="me-2">
//         Small modal
//       </Button>

//       <Modal
//         size="sm"
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-sm">
//             Small Modal
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>...</Modal.Body>
//       </Modal>
//       <Modal
//         size="lg"
//         show={lgShow}
//         onHide={() => setLgShow(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             Large Modal
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>...</Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Example;
