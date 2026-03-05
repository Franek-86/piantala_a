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
import { UsersContext } from "../context/UsersContext";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import BackBtnLarge from "../components/menu/BackBtnLarge";
import BackBtn from "../components/menu/BackBtn";

const UserProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputRefDel = useRef(null);
  const inputRefAdd = useRef(null);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const navigate = useNavigate();
  const isLarge = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  const {
    // loggedUserInfo,
    // deleteProfile,
    // handleUserPic,
    // deleteProfilePic,
    // loading,
    // getUserInfo,
    // takePicture,
  } = useContext(AuthContext);
  const {
    loggedUserInfo,
    handleUserPic,
    takePicture,
    deleteProfilePic,
    loading: userLoading,
  } = useContext(UsersContext);
  console.log("logged user info", loggedUserInfo);
  const { id, userName, phone, pic } = loggedUserInfo;

  const handleRefClick = () => {
    inputRefAdd.current.click();
  };

  return (
    <div className={isLarge ? "plants-container" : "plants-container-small"}>
      {userLoading && <Loading />}
      <BackBtn />
      {/* {userLoading && <Loading />} */}
      <section
        className={
          isLarge ? "section-large-intro" : "section-plant-intro min-100"
        }
      >
        <div className='pt-4 pt-lg-0'>
          {isLarge && (
            <>
              <BackBtnLarge />
              <h2 className='section-title pt-3 pt-xl-4'>Modifica Profilo</h2>
            </>
          )}
        </div>
        <div className='section-center pb-5'>
          <Card>
            <Card.Body>
              <div className='d-flex flex-column align-items-center py-3'>
                <Avatar name={userName} src={pic} />
                <input
                  ref={inputRefAdd}
                  className='d-none'
                  type='file'
                  onChange={(event) => {
                    handleUserPic(event, id);
                  }}
                />
                <h6 className='mt-3'>{userName}</h6>
                {!pic && !Capacitor.isNativePlatform() ? (
                  <div
                    onClick={handleRefClick}
                    className='btn btn-small btn-outline-primary mt-2 d-flex align-items-center'
                  >
                    <IoIosAddCircleOutline className='me-2 fs-6' />

                    <span className='me-2 fs-6'>Aggiungi immagine</span>
                  </div>
                ) : !pic && Capacitor.isNativePlatform() ? (
                  <span
                    className="btn btn-small btn-outline-primary mt-2 d-flex align-items-center'"
                    onClick={() => takePicture(id)}
                  >
                    <IoIosAddCircleOutline className='me-2 fs-6' />
                    Aggiungi immagine
                  </span>
                ) : pic ? (
                  <>
                    <div
                      onClick={() => deleteProfilePic(id)}
                      className='btn btn-outline-danger mt-2 d-flex align-items-center'
                    >
                      <IoIosRemoveCircleOutline className='me-2 fs-6' />

                      <span className='me-2 fs-6'>Rimuovi immagine</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <div className='profile-item d-flex justify-content-between'>
                  <div className='profile-info'>
                    <span>Nome utente: </span>
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
                    <span>{phone ? phone : "N/A"}</span>
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
    </div>
  );
};

export default UserProfile;
