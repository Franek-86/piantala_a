import React, { useContext, useEffect, useState } from "react";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import BackBtn from "../../components/menu/BackBtn";
import BackBtnLarge from "../../components/menu/BackBtnLarge";
import { Breadcrumb, FloatingLabel, Form } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
import InfoCard from "../../components/plant/InfoCard";
import { TiLocation } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Loading from "../Loading";
import { BsVectorPen } from "react-icons/bs";
import Verner from "../../assets/images/verner.jpg";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import Terms from "../../components/registration/Terms";
import LoginReg from "../../components/registration/LoginReg";

const PlateText = () => {
  const isLarge = useIsLargeScreen();
  const { userId, isAuthenticated, logReg, setLogReg } =
    useContext(AuthContext);
  const { plant, getSinglePlant, bookedInfo, setBookingInfo } =
    useContext(PlantsContext);

  const { plantId } = useParams("plantId");
  useEffect(() => {
    getSinglePlant(plantId);
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleChange = (e) => {
    if (!userId || !isAuthenticated) {
      setBookingInfo({
        userId: userId,
        plantId: plantId,
        plateText: "",
      });
      setLogReg(true);
      return;
    }
    setBookingInfo({
      userId: userId,
      plantId: plantId,
      plateText: e.target.value,
    });

    return;
  };

  useEffect(() => {
    console.log("questo sarebbe booked info", bookedInfo);
    if (bookedInfo?.plateText) {
      localStorage.setItem("booking-info", JSON.stringify(bookedInfo));
    }
  }, [bookedInfo]);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("booking-info"));
    setBookingInfo(data);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      {!plant && <Loading />}
      {<Terms id={plantId} page={`/map/${plantId}/plate`} />}
      {plant && (
        <div
          className={isLarge ? "plants-container" : "plants-container-small"}
        >
          <div className='plant-section white-background'>
            {isLarge && <BackBtnLarge />}
            <BackBtn plant />

            <div className='single-plant'>
              <section
                className={
                  isLarge ? "section-large-intro" : "section-plant-intro"
                }
              >
                <div className='pt-2 pb-5'>
                  <div className='section-center'>
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to='/map'>Mappa</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to={`/map/${plant?.id}`}>
                          zolla n&#176; {plant?.id}
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>testo targa</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='pb-5'>
                      <section id='location' className='pt-3 pt-xl-5'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          {/* <h4 className='section-center mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex align-items-center'>
                                <FaLongArrowAltRight />{" "}
                                <span className='ps-2'>Testo targa</span>
                              </div>
                            </div>
                          </h4> */}

                          <div className='section-center section-plant '>
                            <div className='intro-text'>
                              <span className='mb-3 h5 d-flex flex-row align-items-center'>
                                <div className='step-title pb-2 pe-1'>
                                  <BsVectorPen />
                                </div>
                                Dedicami a qualcuno
                              </span>
                              <article className='mb-3'>
                                <p>
                                  Definisci il <b>testo della tua targa</b>, una
                                  dedica o un tuo pensiero che non superi i 500
                                  caratteri e che noi riporteremo su una targa
                                  realizzata <b>in alluminio</b> avente come{" "}
                                  <b>sfondo</b> il quadro di{" "}
                                  <b>Ernest Verner</b>
                                  <span className='d-inline d-md-none'>
                                    .
                                  </span>{" "}
                                  <span className='d-none d-md-inline'>
                                    che riportiamo qui in basso.
                                  </span>
                                </p>
                                <p className='mb-0'>
                                  {" "}
                                  Puoi visualizzare tutte le vostre targe già da
                                  noi realizzate e applicate sui vostri alberi
                                  nella{" "}
                                  <Link
                                    className='text-decoration-none'
                                    to={"/plates"}
                                  >
                                    pagina
                                  </Link>{" "}
                                  dedicata alle vostre targhe.
                                </p>
                              </article>
                              {logReg && (
                                <LoginReg
                                  val={`/map/${plantId}/plate`}
                                  id={plantId}
                                />
                              )}
                              <article className='plate-form d-flex flex-column flex-md-row w-100'>
                                <FloatingLabel
                                  controlId='formComment'
                                  label='Inserisci qui il testo della tua targa'
                                  className='textPlateContainer mb-3 '
                                >
                                  <Form.Control
                                    className='textPlate'
                                    as='textarea'
                                    disabled={logReg}
                                    rows={3}
                                    value={bookedInfo?.plateText}
                                    {...register("comment", {
                                      required: true,
                                      maxLength: 500,
                                    })}
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.comment && (
                                    <p className='text-danger'>
                                      È necessario un testo da inserire nella
                                      targa, il testo deve essere di meno di 500
                                      caratteri.
                                    </p>
                                  )}
                                </FloatingLabel>
                                <div
                                  className='plate-background-pic d-none d-md-block'
                                  style={{ backgroundImage: `url(${Verner})` }}
                                ></div>
                              </article>
                            </div>
                            <article className='d-flex justify-content-between section-center mt-3'>
                              <Link
                                className='btn btn-outline-secondary'
                                to={`/map/${plant?.id}/location`}
                              >
                                <IoMdArrowRoundBack className='' />
                                <span className='ps-2'>posizione</span>
                              </Link>
                              <Link
                                className='btn btn-outline-secondary'
                                to={`/map/${plant?.id}/payment`}
                              >
                                <span className='pe-2'>pagamento</span>
                                <IoMdArrowRoundForward className='' />
                              </Link>
                            </article>
                          </div>
                        </Form>
                      </section>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlateText;
