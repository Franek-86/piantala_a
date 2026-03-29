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
                      <section id='location' className='pt-3 pt-xl-5'>
                        <div className='intro-text'>
                          <article className='mb-3 d-flex flex-row align-items-center'>
                            <div className='step-title pb-2 pe-1'>
                              <TiLocation />
                            </div>
                            <h5 className='mb-0'>
                              Voglio essere piantata qui!
                            </h5>
                          </article>
                          <article className='d-block mb-3'>
                            Zolla di piantagione avente nostro riferimento
                            numerico "{plant?.id}" e sita nel{" "}
                            <b>quartiere {plant?.suburb} </b> di{" "}
                            <b>{plant?.city}</b>.
                          </article>
                          <article>
                            <InfoCard />
                          </article>
                        </div>
                        <article className='btn-steps-container'>
                          <Link
                            className='btn-step-container step-prev'
                            to={`/map/${plant?.id}`}
                          >
                            <div className=''>Precedente</div>
                            <div className='d-flex align-items-center'>
                              <IoMdArrowRoundBack className='' />
                              <span className='ps-2'>Procedura</span>
                            </div>
                          </Link>
                          <Link
                            className='btn-step-container step-next'
                            to={`/map/${plant?.id}/plate`}
                          >
                            <div className=''>Successivo</div>
                            <div className='d-flex flex-row align-items-center justify-content-end'>
                              <span className='pe-2'>targa</span>
                              <IoMdArrowRoundForward className='' />
                            </div>
                          </Link>
                        </article>
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
