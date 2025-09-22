import React, { useContext, useRef, useEffect } from "react";
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
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Loading from "./Loading";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

const UserProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputRefDel = useRef(null);
  const inputRefAdd = useRef(null);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  const {
    loggedUserInfo,
    deleteProfile,
    handleUserPic,
    deleteProfilePic,
    loading,
    getUserInfo,
    takePicture,
  } = useContext(AuthContext);
  console.log("logged user info", loggedUserInfo);
  const { id, userName, phone, pic } = loggedUserInfo;

  const handleRefClick = () => {
    inputRefAdd.current.click();
  };

  return (
    <>
      {loading && <Loading />}
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
                {Capacitor.isNativePlatform() && userName === "Franek2" && (
                  <button onClick={() => takePicture(id)}>test</button>
                )}
                <input
                  ref={inputRefAdd}
                  className='d-none'
                  type='file'
                  onChange={(event) => {
                    handleUserPic(event, id);
                  }}
                />
                {!pic ? (
                  <div
                    onClick={handleRefClick}
                    className='btn btn-small btn-outline-primary mt-2 d-flex align-items-center'
                  >
                    <IoIosAddCircleOutline className='me-2 fs-6' />

                    <span className='me-2 fs-6'>Aggiungi immagine</span>
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => deleteProfilePic(id)}
                      className='btn btn-outline-danger mt-2 d-flex align-items-center'
                    >
                      <IoIosRemoveCircleOutline className='me-2 fs-6' />

                      <span className='me-2 fs-6'>Rimuovi immagine</span>
                    </div>
                  </>
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
              >
                Cancella profilo
              </Card.Link>
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
