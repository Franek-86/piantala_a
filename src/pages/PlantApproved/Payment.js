import React, { useContext, useEffect, useState } from "react";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import BackBtn from "../../components/menu/BackBtn";
import BackBtnLarge from "../../components/menu/BackBtnLarge";
import { Breadcrumb, Form } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
import InfoCard from "../../components/plant/InfoCard";
import { TiLocation } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Loading from "../Loading";
import { MdPayment } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import LoginReg from "../../components/registration/LoginReg";
import Terms from "../../components/registration/Terms";
const Payment = () => {
  const [logReg, setLogReg] = useState(false);
  const isLarge = useIsLargeScreen();
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { plant, getSinglePlant } = useContext(PlantsContext);
  const { plantId } = useParams("plantId");
  const navigate = useNavigate();
  // const { handleSubmit } = useForm();

  useEffect(() => {
    getSinglePlant(plantId);

    let bookingInfo = JSON.parse(localStorage.getItem("booking-info"));
    if (bookingInfo) {
      console.log("booking-info from existing data", bookingInfo);
    } else if (!bookingInfo && !userId) {
      console.log("user not logged in");
    } else {
      localStorage.setItem(
        "booking-info",
        JSON.stringify({
          userId: userId,
          plantId: plantId,
          plateText: "",
        }),
      );
    }
  }, []);
  const submitPayment = (e) => {
    e.preventDefault();
    if (userId && isAuthenticated) {
      navigate("/checkout");
    } else {
      setLogReg(true);
    }
  };

  return (
    <>
      {!plant && <Loading />}
      {<Terms id={plantId} page={`/map/${plantId}/payment`} />}
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
                <Form onSubmit={(e) => submitPayment(e)}>
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
                        <Breadcrumb.Item active>pagamento</Breadcrumb.Item>
                      </Breadcrumb>
                      <div className='pb-5'>
                        <section id='location' className='pt-3 pt-xl-5'>
                          <div className='section-plant'>
                            <div className='intro-text'>
                              <article className='mb-3 d-flex flex-row align-items-center'>
                                <div className='step-title pb-2 pe-1'>
                                  <MdPayment />
                                </div>
                                <h5 className='mb-0'>
                                  Infomazioni sul pagamento
                                </h5>
                              </article>
                              <article className='plant-payment-info'>
                                <p>
                                  Il <b>prezzo</b> di una piantina è di{" "}
                                  <b>200 euro</b> ed include:
                                  <ul>
                                    <li>la messa a dimora dell'albero</li>
                                    <li>
                                      la realizzazione e stampa della targa
                                    </li>
                                    <li>
                                      la piantumazione entro 6 mesi dalla
                                      richiesta{" "}
                                    </li>
                                    <li>
                                      l'iscrizione all'associazione Amici di
                                      Ernest Verner.
                                    </li>
                                  </ul>
                                </p>
                                <p>
                                  La <b>tipologia di albero</b> sarà concordata
                                  con i competenti uffici del Comune e resa
                                  visibile online sia nella tua scheda di
                                  acquisto che su questa stessa pagina.
                                </p>

                                <p>
                                  Procedendo con il pagamento verrai
                                  reindirizzato sulla piattaforma di pagamento.
                                </p>
                              </article>
                            </div>
                            <article className='d-flex justify-content-left section-center mt-3'>
                              <Link
                                className='btn btn-outline-secondary'
                                to={`/map/${plant?.id}/plate`}
                              >
                                <IoMdArrowRoundBack className='' />
                                <span className='ps-2'>targa</span>
                              </Link>
                            </article>
                            {!logReg && (
                              <article className='plant-payment pt-4 pb-5 d-flex justify-content-center'>
                                <button
                                  className={
                                    !logReg
                                      ? "d-block btn btn-success"
                                      : "d-none"
                                  }
                                  type='submit'
                                >
                                  Procedi con il pagamento
                                </button>
                              </article>
                            )}
                            {logReg && (
                              <LoginReg
                                val={`/map/${plantId}/payment`}
                                id={plantId}
                              />
                            )}
                          </div>
                          {/* <div className='d-flex justify-content-between section-center mt-3'>
                          <Link
                            className='btn btn-primary'
                            to={`/map/${plant?.id}/plate`}
                          >
                            <IoMdArrowRoundBack className='text-white' />
                            <span className='text-white ps-2'>testo targa</span>
                          </Link>
                        </div> */}
                        </section>
                      </div>
                    </div>
                  </div>
                </Form>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
