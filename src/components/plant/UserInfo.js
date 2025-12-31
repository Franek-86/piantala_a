import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
const UserInfo = (props) => {
  const {
    cratedAt,
    email,
    phone,
    role,
    user,
    firstName,
    lastName,
    city,
    birthday,
    fiscalCode,
  } = props.user;
  const infoUser = props.user;
  const userRole = props.user.type;
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Informazioni {userRole === "reporter" ? "segnalatore" : "acquirente"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <span>Nome:</span> {firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Cognome:</span> {lastName}
          </ListGroup.Item>
          {userRole !== "reporter" && (
            <>
              <ListGroup.Item>
                <span>Nato il:</span> {birthday ? birthday : "n/a"}
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Comune di residenza:</span> {city}
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <span>Codice Fiscale:</span> {fiscalCode}
              </ListGroup.Item> */}
            </>
          )}
          <ListGroup.Item>
            <span>Nome Utente:</span> {user}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Ruolo:</span> {role}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Phone:</span> {phone}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Email:</span> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Data registrazione:</span> {cratedAt}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfo;

// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size='lg'
//       aria-labelledby='contained-modal-title-vcenter'
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id='contained-modal-title-vcenter'>
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

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
