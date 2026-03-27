import React, { useContext, useEffect } from "react";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import BackBtn from "../../components/menu/BackBtn";
import BackBtnLarge from "../../components/menu/BackBtnLarge";
import { Breadcrumb } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
import InfoCard from "../../components/plant/InfoCard";
import { TiLocation } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Loading from "../Loading";

const Location = () => {
  const isLarge = useIsLargeScreen();
  const { plant, getSinglePlant } = useContext(PlantsContext);
  const { plantId } = useParams("plantId");
  useEffect(() => {
    getSinglePlant(plantId);
  }, []);
  return (
    <>
      {!plant && <Loading />}
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
                      <Breadcrumb.Item active>posizione</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='pb-5'>
                      <section id='location' className='pt-2 pt-xl-5'>
                        <div className='section-center'>
                          <div className='intro-text'>
                            <div className='mb-3 d-flex flex-row align-items-center'>
                              <div className='step-title pb-2 pe-1'>
                                <TiLocation />
                              </div>
                              <h5 className='mb-0'>
                                Voglio essere piantata qui!
                              </h5>
                            </div>
                            <span className='d-block mb-3'>
                              Questa zolla di piantagione, avente nostro
                              riferimento numerico "{plant?.id}", si trova nel{" "}
                              <b>quartiere {plant?.suburb} </b> di{" "}
                              <b>{plant?.city}</b>. Qui di seguito tutte le
                              informazioni sulla posizione di questa zolla.
                            </span>
                            <InfoCard />
                          </div>
                        </div>
                        <div className='d-flex justify-content-between section-center mt-3'>
                          <Link
                            className='btn btn-primary'
                            to={`/map/${plant?.id}`}
                          >
                            <IoMdArrowRoundBack className='text-white' />
                            <span className='text-white ps-2'>indietro</span>
                          </Link>
                          <Link
                            className='btn btn-primary'
                            to={`/map/${plant?.id}/plate`}
                          >
                            <span className='text-white pe-2'>testo targa</span>
                            <IoMdArrowRoundForward className='text-white' />
                          </Link>
                        </div>
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

export default Location;
