import React, { useState } from "react";
import { useContext } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";
import Avatar from "react-avatar";
import { Card, Col, Row } from "react-bootstrap";
import { formatDate } from "../utils/utils";
import Button from "react-bootstrap/Button";
import OperationsModal from "../components/OperationsModal";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [modalOperationsShow, setModalOperationsShow] = useState(false);

  const handleClose = () => setModalOperationsShow(false);
  const handleShow = () => setModalOperationsShow(true);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };

  const { allUsers, getAllUsers, setUserInfo, userRole, loading, listedRole } =
    useContext(AuthContext);

  useEffect(() => {
    getAllUsers();
  }, [listedRole]);
  console.log("aaa", allUsers);
  return (
    <section className='section-background section-full-page'>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <section className='section-page section-background'>
          <ToastContainer />;
          <div className='section-center'>
            <h2 className='section-title'>Lista Utenti</h2>
            <div className='d-md-flex justify-content-md-center'>
              {loading && <Loading />}

              <Col md={6} className='justify-content-md-center'>
                <ListGroup>
                  {allUsers &&
                    allUsers.map((i) => {
                      const {
                        id,
                        first_name,
                        last_name,
                        birthday,
                        city,
                        user_name,
                        role,
                        createdAt,
                      } = i;
                      console.log("qui", i);
                      return (
                        <ListGroup.Item className='mt-2 p-0'>
                          <div className='d-flex'>
                            <Avatar facebookId='100008343750912' size='100' />
                            <div className='d-flex flex-column justify-content-center ps-4'>
                              <span> Nome: {user_name}</span>
                              <span> Ruolo: {role}</span>
                              <span>Registrato: {formatDate(createdAt)}</span>
                              {userRole === "admin" && (
                                <Card.Link
                                  variant='primary'
                                  onClick={() => {
                                    handleShow(true);
                                    setUserInfo({
                                      id,
                                      role,
                                    });
                                  }}
                                >
                                  Modifica
                                </Card.Link>
                              )}
                              {/* <Button
                                onClick={() => setModalOperationsShow(true)}
                                variant='link'
                              >
                                Link
                              </Button> */}
                            </div>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </Col>
            </div>
          </div>
        </section>
      </div>
      <OperationsModal
        handleClose={handleClose}
        show={modalOperationsShow}
        onHide={() => handleClose()}
      />
    </section>
  );
};

export default Users;

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
