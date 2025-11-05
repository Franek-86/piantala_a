import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaRegCopy } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import { copyToClipboard } from "../../utils/utils";
import PlantForm from "./PlantForm";
import InfoCard from "./InfoCard";
import { TiLocation } from "react-icons/ti";
import { BsVectorPen } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
const PlantApproved = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { plant, userInfo } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const { getSinglePlant, singlePlantError, plateUrl } =
    useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <div>No plant found.</div>;

  return (
    <div>
      {" "}
      <section className='section-background plant-section section-large'>
        <div className='section-center mb-5'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
          <h2 className='section-title mb-5'>Piantami per amore &#127793;</h2>
          {/* <p>
            Informazioni sulla zona di piantantagione, inserimento testo targa e
            procedura di pagamento.
          </p> */}
          <section className='steps-section mb-5 d-flex flex-row justify-content-around'>
            <div className='step-container d-flex flex-column align-items-center'>
              <div className='step-box d-flex flex-row align-items-center justify-content-center'>
                <TiLocation />
              </div>
              <div className='step-text text-center'>
                <span className='d-block fw-medium my-1'>Posizione</span>
                <span className='d-block small'>
                  Informazioni zona di piantagione
                </span>
              </div>
            </div>
            <div className='step-container d-flex flex-column align-items-center'>
              <div className='step-box d-flex flex-row align-items-center justify-content-center'>
                <BsVectorPen />
              </div>
              <div className='step-text text-center'>
                <span className='d-block fw-medium my-1'>Targa</span>
                <span className='d-block small'>
                  Scrivi la tua targa personalizzata
                </span>
              </div>
            </div>
            <div className='step-container d-flex flex-column align-items-center'>
              <div className='step-box d-flex flex-row align-items-center justify-content-center'>
                <MdPayment />
              </div>
              <div className='step-text text-center'>
                <span className='d-block fw-medium my-1'>Pagamento</span>
                <span className='d-block small'>
                  Informazioni e procedura pagamento
                </span>
              </div>
            </div>
          </section>
          <h5 className='mt-4 mb-3'>Posizione</h5>
          <p>
            {" "}
            Verifica qui di seguito le informazioni su questa zona di
            piantagione tenendo a mente che, li dove non c'è un sistema di
            irrigazione, sarà tua premura prenderti cura della tua piantina
            dandogli tutta l'acqua di cui ha bisogno.
          </p>
          <InfoCard />
          <h5 className='mt-5 mb-3'>Targa</h5>
          <p>
            Definisci qui il testo della tua targa, noi lo riporteremo su una
            targa relizzata in alluminio. Il testo può essere di non più di 500
            caratteri.
          </p>
          Tutte le targe sono esposte nella pagina{" "}
          <Link to={"/plates"}>"le vostre targhe"</Link>.
          <PlantForm />
        </div>
      </section>
    </div>
  );
};

export default PlantApproved;
