import React, { useContext } from "react";
import useIsLargeScreen from "../../utils/useIsLargeScreen";
import BackBtn from "../../components/menu/BackBtn";
import BackBtnLarge from "../../components/menu/BackBtnLarge";
import { Breadcrumb } from "react-bootstrap";
import { PlantsContext } from "../../context/PlantsContext";
import InfoCard from "../../components/plant/InfoCard";
import { TiLocation } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";

const Location = () => {
  const isLarge = useIsLargeScreen();
  const { plant } = useContext(PlantsContext);
  return (
    <div className={isLarge ? "plants-container" : "plants-container-small"}>
      <div className='plant-section white-background'>
        {isLarge && <BackBtnLarge />}
        <BackBtn plant />

        <div className='single-plant'>
          <section
            className={isLarge ? "section-large-intro" : "section-plant-intro"}
          >
            <div className='pt-2 pb-5'>
              <div className='section-center'>
                <Breadcrumb>
                  <Breadcrumb.Item href='/map'>Mappa</Breadcrumb.Item>
                  {/* <Breadcrumb.Item href='https://getbootstrap.com/docs/4.0/components/breadcrumb/'>
                      Library
                    </Breadcrumb.Item> */}
                  <Breadcrumb.Item href={`/map/${plant.id}`}>
                    Zolla n&#176; {plant.id}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>posizione</Breadcrumb.Item>
                </Breadcrumb>
                <div className=''>
                  {/* <div className='section-title pt-3'> */}
                  {/* <h2 className='pe-2 mb-0'>
                    {plant?.suburb} - Zolla{" "}
                    <span className='text-lowercase'>n&#176;</span> {plant.id}
                  </h2> */}
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
                          <b>quartiere {plant?.suburb} </b> di{" "}
                          <b>{plant?.city}</b>. Qui di seguito tutte le
                          informazioni sulla posizione di questa zolla.
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Location;
