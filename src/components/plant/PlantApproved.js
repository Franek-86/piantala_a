import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaArrowDown, FaRegCopy, FaShare } from "react-icons/fa";
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
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShareButton from "./ShareButton";
import { BsArrowRightShort } from "react-icons/bs";
import { LuTreeDeciduous } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
const PlantApproved = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { plant, userInfo } = useContext(PlantsContext);
  const fromPage = location.state?.from || "/map";
  const { setShareNow } = useContext(PlantsContext);

  const { userId, userRole, isAuthenticated, setLogReg, logReg } =
    useContext(AuthContext);
  const { deletePlant } = useContext(PlantsContext);

  const container = useRef();

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
  useEffect(() => {
    console.log("userid", userId);
  });
  const onSubmit = (data) => {
    console.log("aaaaaa", data);
    if (!isAuthenticated || !userId) {
      // let date = new Date();
      // let day = date.getDate();
      // let month = date.getMonth() + 1;
      // let year = date.getFullYear();
      // let currentDate = `${year}-${month}-${day}`;

      // data.id = parseInt(plantId);
      // data.owner_id = userId;
      // data.purchase_date = currentDate;
      // localStorage.setItem("booked-plant", JSON.stringify(data));
      setLogReg(true);
      return;
    }

    if (!plantId) {
      navigate("/map");
    }
    // const date = new Date().toLocaleDateString("it-IT");
    console.log("asdf", data);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    data.id = parseInt(plantId);
    data.owner_id = userId;
    data.purchase_date = currentDate;
    localStorage.setItem("booked-plant", JSON.stringify(data));
    navigate("/checkout");
  };

  return (
    <div className='plant-section white-background'>
      {isLarge && <BackBtnLarge />}
      <Terms id={plantId} />
      <BackBtn plant />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='single-plant'>
          <section
          // className={isLarge ? "section-large-intro" : "section-plant-intro"}
          >
            <div className='pt-2 pb-5'>
              <div className='section-center'>
                <Breadcrumb>
                  <Breadcrumb.Item href='/map'>Mappa</Breadcrumb.Item>
                  {/* <Breadcrumb.Item href='https://getbootstrap.com/docs/4.0/components/breadcrumb/'>
                      Library
                    </Breadcrumb.Item> */}
                  <Breadcrumb.Item active>
                    Zolla n&#176; {plant.id}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className='section-title d-flex justify-content-center align-items-center pt-3'>
                  <h2 className='pe-2 mb-0'>
                    {plant?.suburb} - Zolla{" "}
                    <span className='text-lowercase'>n&#176;</span> {plant.id}
                  </h2>
                  <ShareButton />
                  <div
                    className='ps-2'
                    onClick={() => {
                      setShareNow(true);
                    }}
                  >
                    <FaShare className='share-page' />
                  </div>
                </div>
                {/* <p>
                  Questa zolla di piantagione, avente nostro riferimento
                  numerico "{plant.id}", si trova nel{" "}
                  <b>quartiere {plant?.suburb} </b> di <b>{plant?.city}</b>.
                </p> */}
                <div className='intro-text intro-article p-2 mb-3'>
                  <span className='mb-3  d-flex flex-row align-items-center'>
                    <div className='step-title pb-2 pe-1'>
                      <LuTreeDeciduous />
                    </div>
                    <h5 className='mb-0'>Procedura d'acquisto</h5>
                  </span>
                  <span className='d-block mb-3'>
                    Puoi procedere con l'acquisto della tua piantina seguendo i{" "}
                    <b>tre passaggi</b> riportati qui di seguito.{" "}
                    {/* <Link to='/map/257/location'>test</Link> */}
                  </span>
                  {/* <FaArrowDown className='arrow-down text-center w-100 fs-3 mt-3' /> */}
                  <span className='d-block'>
                    <ul className='plant-intro-steps'>
                      <a
                        href='#location'
                        className='mb-4 plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                      >
                        <div className='d-flex align-items-center'>
                          <span className='ps-3 fs-1 d-flex'>
                            <TiLocation />
                          </span>
                          <span className='ps-3'>
                            Controlla la zona di piantumazione
                          </span>
                        </div>
                        <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <BsArrowRightShort />
                        </span>
                      </a>
                      <a
                        href='#plate'
                        className='mb-4 plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                      >
                        <div className='d-flex align-items-center'>
                          <span className='ps-3 fs-1 d-flex'>
                            <BsVectorPen />
                          </span>
                          <span className='ps-3'>
                            Inserisci il testo della tua targa
                          </span>
                        </div>
                        <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <BsArrowRightShort />
                        </span>
                      </a>
                      <a
                        href='#payment'
                        className='plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                      >
                        <div className='d-flex align-items-center'>
                          <span className='ps-3 fs-1 d-flex'>
                            <MdPayment />
                          </span>
                          <span className='ps-3'>Procedi con il pagamento</span>
                        </div>
                        <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <BsArrowRightShort />
                        </span>
                      </a>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section id='location' className='py-5'>
            <h4 className='section-center mb-3'>
              <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center'>
                  <FaLongArrowAltRight />{" "}
                  <span className='ps-2'>Zona di piantumazione</span>
                </div>
              </div>
            </h4>
            <div className='section-center'>
              <div className='intro-text'>
                <div className='mb-3 d-flex flex-row align-items-center'>
                  <div className='step-title pb-2 pe-1'>
                    <TiLocation />
                  </div>
                  <h5 className='mb-0'>Voglio essere piantata qui!</h5>
                </div>
                <span className='d-block mb-3'>
                  Questa zolla di piantagione, avente nostro riferimento
                  numerico "{plant.id}", si trova nel{" "}
                  <b>quartiere {plant?.suburb} </b> di <b>{plant?.city}</b>. Qui
                  di seguito tutte le informazioni sulla posizione di questa
                  zolla.
                </span>
                <InfoCard />
                {/* <span className='d-block mt-3'>
                  Per qualsiasi ulteriore informazione ti invitiamo a
                  contattarci, tutti i nostri riferimenti sono nella{" "}
                  <Link
                    className='text-decoration-none'
                    target='_blank'
                    href='/contacts'
                  >
                    pagina
                  </Link>{" "}
                  dei contatti.
                </span> */}
              </div>
            </div>
          </section>
          <section id='plate' className='py-5 white-background'>
            <h4 className='section-center mb-3'>
              <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center'>
                  <FaLongArrowAltRight />{" "}
                  <span className='ps-2'>Testo targa</span>
                </div>
              </div>
            </h4>
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
                    Definisci il <b>testo della tua targa</b>, una dedica o un
                    tuo pensiero che non superi i 500 caratteri e che noi
                    riporteremo su una targa realizzata <b>in alluminio</b>{" "}
                    avente come <b>sfondo</b> il quadro di <b>Ernest Verner</b>
                    <span className='d-inline d-md-none'>.</span>{" "}
                    <span className='d-none d-md-inline'>
                      che riportiamo qui in basso.
                    </span>
                  </p>
                  <p className='mb-0'>
                    {" "}
                    Puoi visualizzare tutte le vostre targe già da noi
                    realizzate e applicate sui vostri alberi nella{" "}
                    <Link className='text-decoration-none' to={"/plates"}>
                      pagina
                    </Link>{" "}
                    dedicata alle vostre targhe.
                  </p>
                </article>
                <article className='plate-form d-flex flex-column flex-md-row w-100'>
                  <FloatingLabel
                    controlId='formComment'
                    label='Inserisci qui il testo della tua targa'
                    className='textPlateContainer mb-3 '
                  >
                    <Form.Control
                      className='textPlate'
                      as='textarea'
                      rows={3}
                      {...register("comment", {
                        required: true,
                        maxLength: 500,
                      })}
                    />
                    {errors.comment && (
                      <p className='text-danger'>
                        È necessario un testo da inserire nella targa, il testo
                        deve essere di meno di 500 caratteri.
                      </p>
                    )}
                  </FloatingLabel>
                  <div
                    className='plate-background-pic d-none d-md-block'
                    style={{ backgroundImage: `url(${Verner})` }}
                  ></div>
                </article>
              </div>
              {/* <article className='pt-4 pb-5 d-flex btn-plant-article justify-content-center'>
                <a
                  href='#payment'
                  className='btn btn-primary d-flex align-items-center justify-content-between'
                >
                  <span className='pe-2'>Informazioni sul pagamento</span>
                  <FaArrowDown />
                </a>
              </article> */}
            </div>
          </section>
          <PlantForm />
        </div>
      </Form>
    </div>
  );
};

export default PlantApproved;

{
  /* <article className='py-2 d-flex justify-content-center'>
                  <div className='steps-article my-2 d-flex flex-row justify-content-around p-2 p-xl-3'>
                    <div className='step-container d-flex flex-column align-items-center'>
                      <a
                        href='#location'
                        className='step-box d-flex flex-row align-items-center justify-content-center'
                      >
                        <TiLocation />
                      </a>
                      <div className='step-text text-center'>
                        <span className='d-block fw-bold my-1'>Posizione</span>
                        <span className='d-block small fw-medium'>
                          Zona di piantagione
                        </span>
                      </div>
                    </div>
                    <div className='step-container d-flex flex-column align-items-center'>
                      <a
                        href='#plate'
                        className='step-box d-flex flex-row align-items-center justify-content-center'
                      >
                        <BsVectorPen />
                      </a>
                      <div className='step-text text-center'>
                        <span className='d-block fw-bold my-1'>Targa</span>
                        <span className='d-block small fw-medium'>
                          Targa personalizzata
                        </span>
                      </div>
                    </div>
                    <div className='step-container d-flex flex-column align-items-center'>
                      <a
                        href='#payment'
                        className='step-box d-flex flex-row align-items-center justify-content-center'
                      >
                        <MdPayment />
                      </a>
                      <div className='step-text text-center'>
                        <spam className='d-block fw-bold my-1'>Pagamento</spam>
                        <span className='d-block small fw-medium'>
                          Informazioni e procedura
                        </span>
                      </div>
                    </div>
                  </div>
                </article> */
}
