import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import {
  FaArrowDown,
  FaClipboard,
  FaClipboardCheck,
  FaRegCopy,
  FaRegUser,
  FaShare,
  FaUser,
} from "react-icons/fa";

import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import { copyToClipboard } from "../../utils/utils";
import RejectionModal from "./RejectionModal";
import UserInfo from "./UserInfo";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import PlantFormSelect from "./PlantFormSelect";
import logo from "../../assets/images/ti pianto per amore-APP-verde.png";
import InfoCard from "./InfoCard";
import { TiLocation } from "react-icons/ti";
import { Capacitor } from "@capacitor/core";
import ShareButton from "./ShareButton";
import { UsersContext } from "../../context/UsersContext";
import BackBtn from "../menu/BackBtn";
import BackBtnLarge from "../menu/BackBtnLarge";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import { BsVectorPen } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
const PlantBooked = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLarge = useIsLargeScreen();
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const updateImageRef = useRef();
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, userId } = useContext(AuthContext);
  const {
    plant,
    userInfo,
    getReporterInfo,
    getOwnerInfo,
    reporterInfo,
    ownerInfo,
    request,
    updatePlantPic,
    getOwnerPublicInfo,
    updatePicMob,
  } = useContext(PlantsContext);
  const { loggedUserInfo } = useContext(UsersContext);
  const fromPage = location.state?.from || "/map";
  const fileInputRef = useRef(null);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    deletePlant,
    handlePlateUpload,
    plateUrl,
    plateLoading,
    handlePlateRemoval,
    modalUserShow,
    setModalUserShow,
    setPlant,
    userOwner,
    setUserOwner,
    ownerPublicInfo,
  } = useContext(PlantsContext);

  const backToMap = () => {
    navigate(fromPage);
    setPlant(null);
    setUserOwner(null);
  };
  const {
    lat,
    lang,
    image_url,
    status_piantina,
    rejection_comment,
    user_comment,
    plant_type,
    city,
    suburb,
    road,
    residential,
    shop,
    house_number,
    plate,
    plate_hash,
    owner_id,
  } = plant;

  useEffect(() => {
    getSinglePlant(plantId);
    getOwnerPublicInfo(owner_id);
    // getOwnerUserName();
  }, [plantId, plateUrl, image_url]);
  // useEffect(() => {
  //   getOwnerUserName();
  // }, [ownerId]);

  // if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  // if (!plant) return <div>No plant found.</div>;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const deleteAndGo = async (plantId) => {
    // setSinglePlantLoading(true);

    try {
      await deletePlant(plantId);
    } catch (err) {
      console.log(err);
      // setSinglePlantLoading(false);ßß
    } finally {
      navigate("/map");
      // setSinglePlantLoading(false);
    }
  };
  const updatePlant = () => {
    updateImageRef.current.click();
  };

  return (
    <div className='plant-section'>
      <div className='section-large'>
        <BackBtn plant />
        <div className='single-plant'>
          {isLarge && (
            <>
              <BackBtnLarge />
            </>
          )}

          <section className='section-booked-pic'>
            <div className='section-center'>
              <h2 className='section-title pt-3 pt-xl-4'>
                {plant_type ? plant_type : "Piantina"}{" "}
                <span className='lower-case'>di</span> {ownerPublicInfo}
              </h2>
              {/* share button */}
              <div className='my-3 text-end d-flex justify-content-end'>
                <ShareButton />
              </div>
              <article className='booked-plant-pic d-flex justify-content-center'>
                <div className='plant-pic-container w-100'>
                  <div
                    style={{ backgroundImage: `url(${image_url})` }}
                    className='plant-pic'
                  ></div>
                  <div className='mt-2 update-pic d-flex justify-content-end'>
                    {Capacitor.isNativePlatform() && (
                      <button
                        onClick={() => updatePicMob(plantId)}
                        className='btn btn-primary btn-small'
                      >
                        Aggiorna immagine
                      </button>
                    )}
                    {(!Capacitor.isNativePlatform() && userRole === "admin") ||
                    (!Capacitor.isNativePlatform() && userId === owner_id) ? (
                      <button
                        // onClick={() => updatePlantPic(id)}
                        className='btn btn-warning btn-small'
                        onClick={updatePlant}
                      >
                        <MdOutlineFileUpload className='fs-4' />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </article>

              <article className='pt-5 justify-content-center btn-plant-article d-none d-xl-flex'>
                <a
                  href='#plate'
                  className='btn btn-primary d-flex align-items-center justify-content-between'
                >
                  <span className='pe-2'>Targa</span>
                  <FaArrowDown />
                </a>
              </article>
            </div>
          </section>
          <section
            id='plate'
            className='pt-lg-5 pb-5 section-booked-plate position-background'
          >
            <article className='section-center'>
              <div className='plate-info-pic pt-5'>
                <span className='mb-3 h5 d-flex flex-row align-items-center'>
                  <div className='step-title pb-2 pe-1'>
                    <BsVectorPen />
                  </div>

                  <div className='ink'></div>
                </span>
                {plate && !plateLoading ? (
                  <div className='plate-image-container ms-auto me-auto'>
                    <Card.Img
                      variant='bottom'
                      src={plate}
                      onLoad={handleImageLoad}
                      className={`w-100  transition-opacity duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                ) : (
                  <div className='plate-image-container ms-auto me-auto'>
                    <Card.Img
                      className='placeholder-image w-100'
                      variant='top'
                      src='https://placehold.co/600x300/c7dd85/5c3333/?text=Targa in elaborazione&font=Montserrat'
                    />
                  </div>
                )}
              </div>
              {plateLoading && (
                <div className='loading-container-mini'>
                  <div className='loading-content'>
                    <img
                      src={logo}
                      alt='loading-logo'
                      className='loading-logo-mini'
                    />
                    <div className='spinner-mini'></div>
                  </div>
                </div>
              )}
            </article>
            <article className='pt-5 justify-content-center btn-plant-article d-none d-xl-flex'>
              <a
                href='#position'
                className='btn btn-primary d-flex align-items-center justify-content-between'
              >
                <span className='pe-2'>Posizione</span>
                <FaArrowDown />
              </a>
            </article>
            <article className='section-center d-xl-none'>
              <span className='pt-5 mb-3 h5 d-flex flex-row align-items-center'>
                <div className='step-title pb-2 pe-1'>
                  <TiLocation />
                </div>
                Mi trovo qui!
              </span>
              <InfoCard />

              <input
                className='d-none'
                onChange={(event) => {
                  updatePlantPic(plantId, event);
                }}
                ref={updateImageRef}
                type='file'
                name=''
                id=''
              />
            </article>
          </section>
          <section
            id='position'
            className='pt-lg-5 section-booked-plate position-background d-none d-xl-block'
          >
            <article className='section-center'>
              <span className='pt-5 mb-3 h5 d-flex flex-row align-items-center'>
                <div className='step-title pb-2 pe-1'>
                  <TiLocation />
                </div>
                Mi trovo qui!
              </span>
              <InfoCard />

              <input
                className='d-none'
                onChange={(event) => {
                  updatePlantPic(plantId, event);
                }}
                ref={updateImageRef}
                type='file'
                name=''
                id=''
              />
            </article>
          </section>
          <section className='section-booked-admin pb-5 plate-background'>
            <div className='section-center'>
              {/* funzionalità admin */}
              {userRole === "admin" && (
                <div className='admin-controls'>
                  <h5 className='pt-5 mb-3'>Informazioni utente</h5>
                  <div className='d-grid gap-2'>
                    <UserInfo
                      role={
                        request === "reporter"
                          ? reporterInfo.role
                          : ownerInfo.role
                      }
                      user={request === "reporter" ? reporterInfo : ownerInfo}
                      show={modalUserShow}
                      onHide={() => setModalUserShow(false)}
                    />
                    <button
                      className='btn btn-outline-info d-flex justify-content-between align-items-center'
                      onClick={() => getOwnerInfo()}
                    >
                      <span className='ps-2'>Informazioni acquirente</span>
                      <FaUser />
                    </button>
                    <button
                      className='btn btn-outline-info d-flex justify-content-between align-items-center'
                      onClick={() => getReporterInfo()}
                    >
                      <span className='ps-2'>Informazioni segnalatore</span>
                      <FaRegUser />
                    </button>
                  </div>
                  <hr />
                  <h5 className='mb-3'>Operazioni targa</h5>{" "}
                  <span className='fw-medium'>Testo targa:</span>{" "}
                  <span>{user_comment}</span>
                  <div className='d-grid gap-2 mt-3'>
                    {!plate && (
                      <>
                        <input
                          className='d-none'
                          type='file'
                          ref={fileInputRef}
                          onChange={(event) =>
                            handlePlateUpload(plantId, event)
                          }
                        />
                        <button
                          className='btn btn-warning d-flex justify-content-between align-items-center'
                          onClick={handleButtonClick}
                        >
                          <span className='ps-2'> Aggiungi targa</span>

                          <IoIosAddCircleOutline />
                        </button>
                        <button
                          className='btn btn-dark ms-0 d-flex justify-content-between align-items-center'
                          onClick={() => deleteAndGo(plantId)}
                        >
                          <span className='ps-2'> Elimina targa</span>
                          <IoIosRemoveCircleOutline />
                        </button>
                      </>
                    )}
                    {plate && (
                      <div className=''>
                        <button
                          className='btn btn-warning d-flex justify-content-between align-items-center'
                          onClick={() =>
                            handlePlateRemoval(plantId, plate_hash)
                          }
                        >
                          <span className='ps-2'>Rimuovi targa</span>
                          <IoIosRemoveCircleOutline />
                        </button>
                      </div>
                    )}
                  </div>
                  <hr />
                  <h5 className='mb-3'>Operazioni tipo pianta</h5>
                  <PlantFormSelect />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlantBooked;
