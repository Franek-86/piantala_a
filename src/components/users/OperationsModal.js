import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UsersContext } from "../../context/UsersContext";

const OperationsModal = (props) => {
  // const { userInfo } = useContext(AuthContext);
  const { changeUserRole, changeUserStatus, userInfo } =
    useContext(UsersContext);

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Operazioni utente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-grid gap-2'>
          <Button
            onClick={() => {
              changeUserRole();
              props.handleClose();
            }}
            variant='primary'
            size='lg'
          >
            {userInfo.role === "admin"
              ? "Rimuovi da amministratore"
              : "Rendi amministratore"}
          </Button>
          <Button
            onClick={() => {
              changeUserStatus();
              props.handleClose();
            }}
            variant='secondary'
            size='lg'
          >
            {userInfo.status === 0 ? "Blocca" : "Sblocca"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OperationsModal;
