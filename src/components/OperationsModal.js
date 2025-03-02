import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const OperationsModal = (props) => {
  const makeUserAdmin = () => {
    console.log("make user admin");
    // setModalOperationsShow(false)
  };
  const blockUser = () => {
    console.log("block user");
    // setModalOperationsShow(false)
  };
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
          <Button onClick={() => makeUserAdmin()} variant='primary' size='lg'>
            Admin
          </Button>
          <Button onClick={() => blockUser()} variant='secondary' size='lg'>
            Blocca
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OperationsModal;
