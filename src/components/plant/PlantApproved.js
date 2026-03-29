import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaArrowDown, FaRegCopy, FaShare } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
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
import { RiNumber1 } from "react-icons/ri";
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

  const { deletePlant, bookedInfo } = useContext(PlantsContext);

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
    <>
      <div className='plant-section white-background'>
        {isLarge && <BackBtnLarge />}
        <Terms id={plantId} />
        <BackBtn plant />
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        <div className='single-plant'>
          <section>
            <div className='pt-2 pb-5'>
              <div className='section-center'>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to='/map'>Mappa</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    Zolla n&#176; {plant.id}
                  </Breadcrumb.Item>
                </Breadcrumb>
                {/* <div className='section-title d-flex justify-content-center align-items-center pt-3'>
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
                </div> */}
                <div className='intro-article p-2 pt-xl-5 mb-3'>
                  <div className='intro-text'>
                    <span className='mb-3  d-flex flex-row align-items-center'>
                      <div className='step-title pb-2 pe-1'>
                        <LuTreeDeciduous />
                      </div>
                      <h5 className='mb-0'>Procedura d'acquisto</h5>
                    </span>
                    <span className='d-block mb-3'>
                      Puoi procedere con l'acquisto della tua piantina seguendo
                      i <b>tre passaggi</b> riportati qui di seguito.{" "}
                    </span>
                    <span className='d-block'>
                      <ul className='ms-3 plant-intro-steps'>
                        <div
                          className='mb-4 plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                          // to={`/map/${plant.id}/location`}
                        >
                          <div className='d-flex align-items-center'>
                            <span className='ps-3 fs-1 d-flex'>
                              <TiLocation />
                            </span>
                            <span className='ps-3'>
                              Controlla la zona di piantumazione
                            </span>
                          </div>
                          {/* <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <RiNumber1 />
                        </span> */}
                        </div>
                        <div
                          className='mb-4 plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                          // to={`/map/${plant.id}/plate`}
                        >
                          <div className='d-flex align-items-center'>
                            <span className='ps-3 fs-1 d-flex'>
                              <BsVectorPen />
                            </span>
                            <span className='ps-3'>
                              Inserisci il testo della tua targa
                            </span>
                          </div>
                          {/* <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <BsArrowRightShort />
                        </span> */}
                        </div>
                        <div
                          className='mb-4 plant-intro-step d-flex align-items-center justify-content-between py-3 text-decoration-none white-background'
                          // to={`/map/${plant.id}/payment`}
                        >
                          <div className='d-flex align-items-center'>
                            <span className='ps-3 fs-1 d-flex'>
                              <MdPayment />
                            </span>
                            <span className='ps-3'>
                              Procedi con il pagamento
                            </span>
                          </div>
                          {/* <span className='ps-3 fs-1 d-flex'>
                          {" "}
                          <BsArrowRightShort />
                        </span> */}
                        </div>
                      </ul>
                    </span>
                  </div>
                  <div className='d-flex w-100 justify-content-center mt-5'>
                    <Link
                      to={`/map/${plant.id}/location`}
                      className='btn btn-success w-100'
                    >
                      Inizia il tuo acquisto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PlantApproved;
