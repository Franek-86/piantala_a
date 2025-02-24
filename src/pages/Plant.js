import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { MdBackspace } from "react-icons/md";
import greenPlant from "../assets/images/ti pianto per amore-APP-verde.png";
import yellowPlant from "../assets/images/ti pianto per amore-APP-giallo.png";
import redPlant from "../assets/images/ti pianto per amore-APP-rosso.png";
import bluePlant from "../assets/images/ti pianto per amore-APP-azzurro.png";
import { PlantsContext } from "../context/PlantsContext";
import PlantForm from "../components/PlantForm";
import RejectionModal from "../components/RejectionModal";
import PlantImage from "../components/PlantImage";
import Loading from "./Loading";
import logo from "../assets/images/logo_albero_green.png";
import UserInfo from "../components/UserInfo";
import { FaUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

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
    <section className='section-background plant-section'>
      <PlantImage show={show} setShow={setShow} image_url={image_url} />
      <RejectionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onReject={() => openRejectionModal()}
        handleStatusChange={() => handleStatusChange("rejected", plantId)}
        plantId={plantId}
      />
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <h2 className='section-title'>Informazioni piantina</h2>
        {/* {reporterInfo && <h3>{reporterInfo}</h3>}
        {ownerInfo && <h3>{ownerInfo}</h3>} */}
        <div className='info-plant'>
          <div className='info-plant-container w-100'>
            <article className='image-plant-box'>
              <img
                className='info-image'
                src={
                  status_piantina === "approved"
                    ? greenPlant
                    : status_piantina === "pending"
                    ? yellowPlant
                    : status_piantina === "booked"
                    ? bluePlant
                    : redPlant
                }
                alt='stato piantina'
              />
            </article>
            <article className='info-plant-box'>
              <ul>
                <li>
                  <div className='d-flex align-items-center'></div>
                </li>
                <li>
                  <span>Segnalatore:</span> <span>{userInfo}</span>
                </li>
                <li>
                  <span>image:</span>{" "}
                  <span>
                    <Button
                      size='sm'
                      variant='outline-primary'
                      onClick={() => setShow(true)}
                    >
                      piantina
                    </Button>
                  </span>
                </li>
                <li>
                  <span>Lat:</span> <span>{lat}</span>
                </li>
                <li>
                  <span>Lang:</span> <span>{lang}</span>
                </li>
                <li>
                  <span>Città:</span> <span>{city}</span>
                </li>
                <li>
                  <span>Quartiere:</span> <span>{suburb}</span>
                </li>
                {road !== "undefined" && (
                  <li>
                    <span>Indirizzo:</span> <span>{road}</span>
                  </li>
                )}
                {shop != "undefined" && (
                  <li>
                    <span>Negozio:</span> <span>{shop}</span>
                  </li>
                )}
                {residential !== "undefined" && (
                  <li>
                    <span>Residenza:</span> <span>{residential}</span>
                  </li>
                )}
                {house_number !== "undefined" && (
                  <li>
                    <span>Numero:</span> <span>{house_number}</span>
                  </li>
                )}
                <li>
                  <span>Stato:</span>{" "}
                  <span
                    className={
                      status_piantina === "approved"
                        ? "approvedPlant"
                        : status_piantina === "rejected"
                        ? "rejectedPlant"
                        : status_piantina === "booked"
                        ? "bookedPlant"
                        : "pendingPlant"
                    }
                  >
                    {status_piantina}
                  </span>
                  {status_piantina === "booked" && (
                    <>
                      <li>
                        <span>Testo targa:</span> <span>{user_comment}</span>
                      </li>
                      <li>
                        <span>Tipo di pianta:</span> <span>{plant_type}</span>
                      </li>
                    </>
                  )}
                  {status_piantina === "rejected" && (
                    <li>
                      <span>Motivazione:</span> <span>{rejection_comment}</span>
                    </li>
                  )}
                </li>
              </ul>
            </article>
          </div>

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

        {plate && !plateLoading && status_piantina === "booked" && (
          <div className='plate-container mt-2'>
            <div className='plate-image'>
              <img
                onLoad={handleImageLoad}
                className={`w-100 transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={plate}
                alt=''
              />
            </div>
          </div>
        )}

        {/* funzionalità admin */}

        {userRole === "admin" && status_piantina === "pending" ? (
          <div className='admin-controls py-5'>
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
