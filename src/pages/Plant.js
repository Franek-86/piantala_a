import React, { useState, useEffect, useContext } from "react";
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
  console.log("aaa1", plant);
  const fromPage = location.state?.from || "/map";

  const {
    getSinglePlant,
    singlePlantLoading,
    singlePlantError,
    handleStatusChange,
    deletePlant,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId]);

  if (singlePlantLoading) return <div className='loading'>Loading...</div>;
  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <div>No plant found.</div>;
  console.log("this", plant);
  const {
    lat,
    lang,
    image_url,
    status_piantina,
    rejection_comment,
    user_comment,
    plant_type,
  } = plant;

  const openRejectionModal = () => {
    setModalShow(true);
  };

  const deleteAndGo = (plantId) => {
    try {
      deletePlant(plantId);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/map");
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
                        <span>Targa:</span> <span>{user_comment}</span>
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
            {/* <button
              className='btn btn-danger ms-2'
              onClick={() => handleStatusChange("rejected", plantId)}
            >
              Reject
            </button> */}
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
        ) : (userRole === "admin" && status_piantina === "rejected") ||
          (userRole === "admin" && status_piantina === "booked") ||
          (userRole === "admin" && status_piantina === "booked") ? (
          <div className='admin-controls mt-5'>
            <hr />
            <h5 className='mb-3'>Funzionalità amministratore</h5>
            <button
              className='btn btn-dark ms-0'
              onClick={() => deleteAndGo(plantId)}
            >
              Elimina
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Plant;
