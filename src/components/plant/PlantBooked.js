import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaRegCopy, FaRegUser, FaUser } from "react-icons/fa";
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

const PlantBooked = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const updateImageRef = useRef();
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  const {
    plant,
    userInfo,
    getReporterInfo,
    getOwnerInfo,
    reporterInfo,
    ownerInfo,
    request,
    updatePlantPic,
  } = useContext(PlantsContext);

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
  } = useContext(PlantsContext);

  const backToMap = () => {
    navigate(fromPage);
    setPlant(null);
    setUserOwner(null);
  };
  useEffect(() => {
    getSinglePlant(plantId);
    // getOwnerUserName();
  }, [plantId, plateUrl]);
  // useEffect(() => {
  //   getOwnerUserName();
  // }, [ownerId]);

  // if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  // if (!plant) return <div>No plant found.</div>;
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
  } = plant;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const deleteAndGo = async (plantId) => {
    // setSinglePlantLoading(true);

    try {
      await deletePlant(plantId);
    } catch (err) {
      console.log(err);
      // setSinglePlantLoading(false);
    } finally {
      navigate("/map");
      // setSinglePlantLoading(false);
    }
  };
  const updatePlant = () => {
    updateImageRef.current.click();
  };

  return (
    <section className='section-background plant-section section-large'>
      <div className='section-center mb-5'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <h2 className='section-title'>Piantina</h2>
        <h5 className='mb-3'>Posizione</h5>
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
        <button
          // onClick={() => updatePlantPic(id)}
          className='btn btn-warning my-3'
          onClick={updatePlant}
        >
          Update pic
        </button>
        <br />
        <section className='plate-section'>
          <div className='plant-info-image'>
            {plate && !plateLoading && status_piantina === "booked" && (
              <div className='plate-info-pic'>
                <h5 className='mb-3'>Targa</h5>

                <Card.Img
                  variant='bottom'
                  src={plate}
                  onLoad={handleImageLoad}
                  className={`w-100  transition-opacity duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}
            {status_piantina === "booked" && !plate && (
              <div className='plate-info-pic'>
                <h5 className='mb-3'>Targa</h5>
                <Card.Img
                  class='placeholder-image'
                  variant='top'
                  src='https://placehold.co/600x300/c7dd85/5c3333/?text=Targa in elaborazione&font=Montserrat'
                />
              </div>
            )}
          </div>
        </section>

        {/* plant form or feedback time */}
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

        {/* funzionalità admin */}

        {userRole === "admin" && (
          <div className='admin-controls py-5'>
            <hr />
            <h5 className='mb-3'>Informazioni utente</h5>
            <div className='d-grid gap-2'>
              <UserInfo
                role={
                  request === "reporter" ? reporterInfo.role : ownerInfo.role
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
                    onChange={(event) => handlePlateUpload(plantId, event)}
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
                    onClick={() => handlePlateRemoval(plantId, plate_hash)}
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
  );
};

export default PlantBooked;
