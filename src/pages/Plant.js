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

const Plant = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  const { plant } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const fileInputRef = useRef(null);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    deletePlant,
    singlePlantLoading,
    handlePlateUpload,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId]);

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

        {plate && status_piantina === "booked" && (
          <div className='plate-container'>
            <img className='w-100' src={plate} alt='' />
          </div>
        )}

        {/* funzionalità admin */}

        {userRole === "admin" && status_piantina === "pending" ? (
          <div className='admin-controls mt-5'>
            <hr />
            <h5 className='mb-3'>Funzionalità amministratore</h5>
            <button
              className='btn btn-success'
              onClick={() => handleStatusChange("approved", plantId)}
            >
              Approva
            </button>
            <button
              className='btn btn-danger ms-2'
              onClick={() => openRejectionModal()}
            >
              Rigetta
            </button>
            <button
              className='btn btn-dark ms-2'
              onClick={() => deleteAndGo(plantId)}
            >
              Elimina
            </button>
          </div>
        ) : userRole === "admin" && status_piantina === "booked" ? (
          <div className='admin-controls mt-5'>
            <hr />
            <h5 className='mb-3'>Funzionalità amministratore</h5>
            <button
              className='btn btn-dark ms-0'
              onClick={() => deleteAndGo(plantId)}
            >
              Elimina
            </button>
            <div className='d-inline-block'>
              <input
                className='d-none'
                type='file'
                ref={fileInputRef}
                onChange={(event) => handlePlateUpload(plantId, event)}
              />
              <button
                className='btn btn-warning ms-2'
                onClick={handleButtonClick}
              >
                Aggiungi targa
              </button>
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
