import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FaRegCopy } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { MdBackspace } from "react-icons/md";
import { PlantsContext } from "../context/PlantsContext";
import PlantForm from "../components/PlantForm";
import RejectionModal from "../components/RejectionModal";
import PlantImage from "../components/PlantImage";
import Loading from "./Loading";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
import UserInfo from "../components/UserInfo";
import { FaLeftLong, FaUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { copyToClipboard } from "../utils/utils";

const Plant = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

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
  } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const fileInputRef = useRef(null);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    deletePlant,
    singlePlantLoading,
    handlePlateUpload,
    plateUrl,
    plateLoading,
    handlePlateRemoval,
    modalUserShow,
    setModalUserShow,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  if (singlePlantLoading) return <Loading />;
  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <div>No plant found.</div>;
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
    delete_hash,
    user_id,
  } = plant;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const openRejectionModal = () => {
    setModalShow(true);
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
  return (
    <section className='section-background plant-section section-large'>
      <RejectionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onReject={() => openRejectionModal()}
        handleStatusChange={() => handleStatusChange("rejected", plantId)}
        plantId={plantId}
      />
      <div className='section-center mb-5'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <h2 className='section-title'>Informazioni piantina</h2>
        <Card className='flex-md-row card-plant-info1'>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Segnalatore:</span>{" "}
              <span>{userInfo}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Città:</span> <span>{city}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Quartiere:</span>{" "}
              <span>{suburb}</span>
            </ListGroup.Item>
            {road !== "undefined" && (
              <ListGroup.Item>
                {" "}
                <span className='fw-medium'>Indirizzo:</span>{" "}
                <span>{road}</span>
              </ListGroup.Item>
            )}
            {shop != "undefined" && (
              <ListGroup.Item>
                {" "}
                <span>Negozio:</span> <span>{shop}</span>
              </ListGroup.Item>
            )}
            {residential !== "undefined" && (
              <ListGroup.Item>
                {" "}
                <span className='fw-medium'>Residenza:</span>{" "}
                <span>{residential}</span>
              </ListGroup.Item>
            )}
            {house_number !== "undefined" && (
              <ListGroup.Item>
                {" "}
                <span className='fw-medium'>Numero:</span>{" "}
                <span>{house_number}</span>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Stato:</span>{" "}
              <span
                className={
                  status_piantina === "approved"
                    ? "approvedPlant"
                    : status_piantina === "rejected"
                    ? "rejectedPlant"
                    : status_piantina === "booked"
                    ? "bookedPlant"
                    : status_piantina
                }
              >
                {status_piantina === "pending"
                  ? "in attesa di approvazione"
                  : status_piantina === "approved"
                  ? "approvata"
                  : status_piantina === "rejected"
                  ? "non approvata"
                  : status_piantina === "booked"
                  ? "acquistata"
                  : status_piantina}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Coordinate:</span>{" "}
              <span
                className='copy'
                onClick={() => copyToClipboard([`${lat},${lang}`])}
              >
                {lat} / {lang} <FaRegCopy className='copy-icon' />
              </span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              {" "}
              <span>Lang:</span> <span>{lang}</span>
            </ListGroup.Item> */}
            {status_piantina === "rejected" && (
              <ListGroup.Item>
                {" "}
                <span className='fw-medium'>Motivazione:</span>{" "}
                <span>{rejection_comment}</span>
              </ListGroup.Item>
            )}
          </ListGroup>

          <Card.Img
            className='w-100 plant-info-image'
            variant='bottom'
            src={image_url}
          />
        </Card>

        {/* </div> */}

        <br />
        <Card className='card-plant-info2'>
          {status_piantina === "booked" && (
            <ListGroup className='list-group-flush d-med-flex flex-md-row-reverse'>
              <div className='plant-info-text'>
                <ListGroup.Item>
                  {" "}
                  <span className='fw-medium'>Tipo di pianta:</span>{" "}
                  <span>{plant_type}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <span className='fw-medium'>Testo targa:</span>{" "}
                  <span>{user_comment}</span>
                </ListGroup.Item>
              </div>
              <div className='plant-info-image'>
                {plate && !plateLoading && status_piantina === "booked" && (
                  <ListGroup.Item className='plate-info-pic'>
                    <span class='mb-2 text-center d-block fw-medium d-md-none'>
                      Immagine targa
                    </span>
                    <Card.Img
                      variant='bottom'
                      src={plate}
                      onLoad={handleImageLoad}
                      className={`w-100  transition-opacity duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </ListGroup.Item>
                )}
                {status_piantina === "booked" && !plate && (
                  <ListGroup.Item className='plate-info-pic'>
                    {" "}
                    <span class='mb-2 text-center d-block fw-medium d-md-none'>
                      Immagine targa
                    </span>
                    <Card.Img
                      class='placeholder-image'
                      variant='top'
                      src='https://placehold.co/600x300/c7dd85/5c3333/?text=Targa in elaborazione&font=Montserrat'
                    />
                  </ListGroup.Item>
                )}
              </div>
            </ListGroup>
          )}
        </Card>

        {/* plant form or feedback time */}

        {status_piantina === "approved" ? (
          <PlantForm />
        ) : status_piantina === "pending" ? (
          <i className='small mt-3'>
            Il tempo medio di approvazione è di una settimana lavorativa dalla
            data di ricezione della segnalazione.
          </i>
        ) : (
          <></>
        )}
        {/* </div> */}
        {/* loading */}
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

        {userRole === "admin" && status_piantina === "pending" ? (
          <div className='admin-controls pt-5 pb-3'>
            <UserInfo
              role={request === "reporter" ? reporterInfo.role : ownerInfo.role}
              user={request === "reporter" ? reporterInfo : ownerInfo}
              show={modalUserShow}
              onHide={() => setModalUserShow(false)}
            />
            <hr />
            <h5 className='mb-3'>Informazioni utente</h5>
            <div className='d-grid gap-2'>
              <button
                className='btn btn-outline-info'
                onClick={() => getReporterInfo()}
              >
                Informazioni Segnalatore
              </button>
            </div>
            <hr />
            <h5 className='mb-3'>Operazioni di amministrazione</h5>
            <div className='d-grid gap-2'>
              <button
                className='btn btn-success'
                onClick={() => handleStatusChange("approved", plantId)}
              >
                Approva segnalazione
              </button>
              <button
                className='btn btn-danger'
                onClick={() => openRejectionModal()}
              >
                Rigetta segnalazione
              </button>
              <button
                className='btn btn-dark '
                onClick={() => deleteAndGo(plantId)}
              >
                Elimina segnalazione
              </button>
            </div>
          </div>
        ) : userRole === "admin" && status_piantina === "booked" ? (
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
            <h5 className='mb-3'>Operazioni di amministrazione</h5>
            <div className='d-grid gap-2'>
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Plant;
