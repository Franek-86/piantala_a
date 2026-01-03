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
import Terms from "../registration/Terms";
import { FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const PlantApproved = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { plant, userInfo } = useContext(PlantsContext);
  const fromPage = location.state?.from || "/map";
  const {
    getSinglePlant,
    singlePlantError,
    plateUrl,
    singlePlantLoading,
    setPlant,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  // useEffect(() => {
  //   getSinglePlant(plantId);
  // }, [plantId, plateUrl]);

  // if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  // if (!plant) return <div>No plant found.</div>;
  // if (singlePlantLoading) return <Loading />;
  return (
    <section className='plant-section'>
      <Terms id={plantId} />{" "}
      <div className='section-large'>
        <div className='back-btn pe-3'>
          <MdBackspace
            onClick={() => {
              backToMap();
              setPlant(null);
            }}
          />
        </div>
        <div className='section-center single-plant pb-5'>
          <h2 className='section-title mb-5'>Ti pianto per amore &#127793;</h2>
          <section className='plant-intro'>
            <article className='plant-intro-text'>
              <p className='mb-0'>
                Puoi procedere con l'acquisto e la piantumazione della tua
                piantina seguendo questi tre passaggi. Controlla la zona di
                piantumazione, inserisci il testo della targa e procedura con il
                pagamento.
              </p>
            </article>
            <article className='steps-section d-flex flex-row justify-content-around'>
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
            </article>
          </section>

          <span className='mt-5 mb-3 h5 d-flex flex-row align-items-center'>
            <div className='step-title pb-2 pe-1'>
              <TiLocation />
            </div>
            Piantetemi qui!
          </span>
          {/* <p>
            Controlla se sono vicino a te o a chi dovrà prendersi cura di me. Li
            dove non c'è un sistema di irrigazione sarà tua premura accertarti
            che mi sia data tutta l'acqua di cui ho bisogno.
          </p> */}
          <InfoCard />
          <section className='plant-plate'>
            <span className='mt-5 mb-3 h5 d-flex flex-row align-items-center'>
              <div className='step-title pb-2 pe-1'>
                <BsVectorPen />
              </div>
              Dedicatemi a qualcuno
            </span>
            <article className='plate-info mb-4'>
              <p>
                Definisci il testo della tua targa, noi lo riporteremo su una
                targa realizzata in alluminio. Il testo può essere di non più di
                500 caratteri.
              </p>
              <p className='mb-0'>
                {" "}
                Tutte le targe sono esposte nella{" "}
                <Link className='page-link d-inline' to={"/plates"}>
                  pagina
                </Link>{" "}
                dedicata alle terghe.
              </p>
            </article>
            <FloatingLabel
              controlId='formComment'
              label='Testo targa'
              className='textPlateContainer mb-3'
            >
              <Form.Control
                className='textPlate'
                as='textarea'
                rows={3}
                {...register("comment", { required: true, maxLength: 500 })}
              />
              {errors.comment && (
                <p className='text-danger'>
                  È necessario un testo da inserire nella targa, il testo deve
                  essere di meno di 500 caratteri.
                </p>
              )}
            </FloatingLabel>
          </section>
          <PlantForm />
        </div>
      </div>
    </section>
  );
};

export default PlantApproved;
