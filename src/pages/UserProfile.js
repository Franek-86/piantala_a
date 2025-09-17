import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FaEdit } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Avatar from "react-avatar";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import DeleteProfile from "../components/user-profile/DeleteProfile";

const UserProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  const { loggedUserInfo, deleteProfile, handleUserPic } =
    useContext(AuthContext);
  console.log("logged user info", loggedUserInfo);
  const { id, userName, phone, pic } = loggedUserInfo;

  return (
    <>
      {/* {loading && <Loading />} */}
      <section className='section-page section-background'>
        <div className='back-container'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
        </div>
        <div className='section-center menu-section-center'>
          <h2 className='section-title'>Profilo</h2>
          <Card>
            <Card.Body>
              <div className='d-flex flex-column align-items-center py-3'>
                <Avatar name={userName} src={pic} />
                {!pic && (
                  <input
                    className=''
                    type='file'
                    onChange={(event) => {
                      handleUserPic(event, id);
                    }}
                  />
                )}

                <h6 className='mt-3'>{userName}</h6>
              </div>
            </Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <div className='profile-item d-flex justify-content-between'>
                  <div className='profile-info'>
                    <span>User name: </span>
                    <span>{userName}</span>
                  </div>
                  {/* <div className='profile-icon'>
                    <FaEdit />
                  </div> */}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className='profile-item d-flex justify-content-between'>
                  <div className='profile-info'>
                    <span>Telefono: </span>
                    <span>{phone}</span>
                  </div>
                  {/* <div className='profile-icon'>
                    <FaEdit />
                  </div> */}
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link
                className='modal-delete-btn'
                href='#'
                onClick={handleShowDeleteModal}
                // onClick={() => deleteProfile(id)}
              >
                {/* <Button variant='primary' onClick={handleShowDeleteModal}>
                  Launch demo modal
                </Button> */}
                Cancella profilo
              </Card.Link>
              {/* <Card.Link href='#'>Another Link</Card.Link> */}
            </Card.Body>
          </Card>
        </div>
        <DeleteProfile
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
        />
      </section>
    </>
  );
};

export default UserProfile;
