import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaArrowDown, FaRegCopy } from "react-icons/fa";
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
import BackBtn from "../menu/BackBtn";
import Alert from "react-bootstrap/Alert";
import Verner from "../../assets/images/verner.jpg";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import BackBtnLarge from "../menu/BackBtnLarge";

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
  const isLarge = useIsLargeScreen();
  // useEffect(() => {
  //   getSinglePlant(plantId);
  // }, [plantId, plateUrl]);

  // if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  // if (!plant) return <div>No plant found.</div>;
  // if (singlePlantLoading) return <Loading />;
  return (
    <div className='plant-section'>
      <Terms id={plantId} />{" "}
      <div className='section-large'>
        <BackBtn plant />
        <div className='single-plant'>
          <section className='section-center section-plant-intro pt-5 pt-lg-0'>
            {isLarge && (
              <>
                <BackBtnLarge />
                <h2 className='section-title pt-3 pt-md-5'>
                  Zona <span className='text-lowercase'>-</span> {plant?.suburb}{" "}
                  &#127793;
                </h2>
              </>
            )}
            {/* <h2 className='section-title mt-3 mt-md-5 mb-5'>
              Piantami <span className='text-lowercase'>a</span> {plant?.suburb}{" "}
              &#127793;
            </h2> */}
            <article className='plant-intro-text intro-article p-2 p-lg-3 p-xl-5'>
              <p className='mb-2 mb-lg-4'>
                Puoi procedere con l'acquisto e la piantumazione della tua
                piantina nel <b>quartiere {plant?.suburb} </b> di{" "}
                <b>{plant?.city} </b>
                seguendo questi tre passaggi.
              </p>
              <p className='mb-0'>
                Controlla la zona di piantumazione, ossia la <b>posizione</b>{" "}
                sulla mappa, tenendo presente che li dove non c'è un sistema di
                irrigazione sarà tua premura innaffiare il tuo albero, inserisci
                il <b>testo della targa</b> dedicandola a chi preferisci e
                procedi infine con il <b>pagamento</b>.
              </p>
            </article>
            <article className='d-flex justify-content-center my-5'>
              <div className='steps-article my-2 d-flex flex-row justify-content-around p-2 p-xl-3'>
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
              </div>
            </article>
            <article className='d-flex justify-content-center btn-plant-article'>
              <a
                href='#location'
                className='btn btn-primary d-flex align-items-center justify-content-between'
              >
                <span className='pe-2'>Zona di piantagione</span>
                <FaArrowDown />
              </a>
            </article>
          </section>
          <section
            id='location'
            className='mt-3 mt-lg-5 section-center section-plant-position'
          >
            <span className='pt-5 mb-3 h5 d-flex flex-row align-items-center'>
              <div className='step-title pb-2 pe-1'>
                <TiLocation />
              </div>
              Voglio essere piantata qui!
            </span>
            <InfoCard />
            <Alert className='mt-5' variant='info'>
              Per qualsiasi ulteriore informazione ti invitiamo a contattarci,
              tutti i nostri riferimenti sono nella pagina{" "}
              <Alert.Link target='_blank' href='/contacts'>
                "Contatti"
              </Alert.Link>
              .{" "}
            </Alert>
            <article className=' mt-5 d-flex btn-plant-article  justify-content-center'>
              <a
                href='#plate'
                className='btn btn-primary d-flex align-items-center justify-content-between'
              >
                <span className='pe-2'>Definisci il testo della tua targa</span>
                <FaArrowDown />
              </a>
            </article>
          </section>
          <section
            id='plate'
            className='mt-3 mt-lg-5 section-plant-plate plate-background'
          >
            <div className='section-center section-plant'>
              <span className='pt-5 mb-3 h5 d-flex flex-row align-items-center'>
                <div className='step-title pb-2 pe-1'>
                  <BsVectorPen />
                </div>
                Dedicami a qualcuno
              </span>
              <article className='plate-info mb-5'>
                <p>
                  Definisci il testo della tua targa, una dedica o un tuo
                  pensiero che non superi i 500 caratteri e che noi riporteremo
                  su una targa realizzata in alluminio avente como sfondo il
                  quadro di Ernest Verner che riportiamo qui in basso.
                </p>
                <p className='mb-0'>
                  {" "}
                  Puoi visualizzare tutte le vostre targe già da noi realizzate
                  e applicate sui vostri alberi nella pagina{" "}
                  <Link className='page-link d-inline' to={"/plates"}>
                    "Le vostre targhe"
                  </Link>{" "}
                  dedicata alle vostre terghe.
                </p>
              </article>
              <article className='plate-form d-flex flex-column flex-md-row w-100'>
                <FloatingLabel
                  controlId='formComment'
                  label='Testo targa'
                  className='textPlateContainer mb-3 '
                >
                  <Form.Control
                    className='textPlate'
                    as='textarea'
                    rows={3}
                    {...register("comment", { required: true, maxLength: 500 })}
                  />
                  {errors.comment && (
                    <p className='text-danger'>
                      È necessario un testo da inserire nella targa, il testo
                      deve essere di meno di 500 caratteri.
                    </p>
                  )}
                </FloatingLabel>
                <div
                  className='plate-background-pic'
                  style={{ backgroundImage: `url(${Verner})` }}
                >
                  {/* <img
                    className='plate-background-img'
                    src={Verner}
                    alt=''
                    srcset=''
                  /> */}
                </div>
              </article>
              <article className='mt-5 d-flex btn-plant-article  justify-content-center'>
                <a
                  href='#payment'
                  className='btn btn-primary d-flex align-items-center justify-content-between'
                >
                  <span className='pe-2'>Informazioni sul pagamento</span>
                  <FaArrowDown />
                </a>
              </article>
            </div>
          </section>
          <PlantForm />
        </div>
      </div>
    </div>
  );
};

export default PlantApproved;
