import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { OrdersContext } from "../../context/OrdersContext";

const OrderModal = (props) => {
  const { modalShow, setModalShow, updateOrder } = useContext(OrdersContext);
  const updateFunk = async (props, status) => {
    console.log("tt", props);
    const data = { id: props.id, status };
    await updateOrder(data);
    setModalShow(false);
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
          Modifica stato dell'ordine
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Modifica stato dell'ordine</h4> */}
        <p>
          Lo stato dell'ordine può essere modificato in "in progress" se la
          richiesta viene presa in carico oppure in "completed" se l'ordine è
          stato evaso.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            updateFunk(props, "In progress");
          }}
        >
          In progress
        </Button>
        <Button
          onClick={() => {
            updateFunk(props, "completed");
          }}
        >
          Completed
        </Button>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant='primary' onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
