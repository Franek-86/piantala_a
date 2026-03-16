import React, { useContext, useEffect } from "react";
import BottomBar from "../components/map/BottomBar";
import greenPlant from "../assets/images/ti pianto per amore-APP-verde.png";
import yellowPlant from "../assets/images/ti pianto per amore-APP-giallo.png";
import redPlant from "../assets/images/ti pianto per amore-APP-rosso.png";
import bluePlant from "../assets/images/ti pianto per amore-APP-azzurro.png";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import { MdAddLocationAlt } from "react-icons/md";
import { MdFilterAlt } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";
import SideBar from "../components/menu/SideBar";
import BackBtn from "../components/menu/BackBtn";
import { PlantsContext } from "../context/PlantsContext";
import BackBtnLarge from "../components/menu/BackBtnLarge";

const Legend = () => {
  const isLargeScreen = useIsLargeScreen();
  const { dropIt } = useContext(PlantsContext);
  useEffect(() => {
    dropIt();
  }, []);
  return (
    <>
      <section className='min-100 section-background map'>
        <BackBtn />
        {isLargeScreen && <BackBtnLarge />}
        <div className='d-flex flex-row'>
          {isLargeScreen && <SideBar />}
          <section className='w-100 section-center-map'>
            <div className='section-center'>
              <h3 className='section-title pt-4'>legenda</h3>
              <ul className='d-block mt-lg-5'>
                <li className='plants-list'>
                  <div className='legend-box-container'>
                    <div className='legend-image approved'>
                      <img src={greenPlant} alt='' />
                    </div>
                    <span className='legend-description'>
                      piante disponibili all'acquisto
                    </span>
                  </div>
                </li>
                <li className='plants-list'>
                  <div className='legend-box-container'>
                    <div className='legend-image booked'>
                      <img src={bluePlant} alt='' />
                    </div>
                    <span className='legend-description'>
                      piante acquistate
                    </span>
                  </div>
                </li>
                <li className='plants-list'>
                  <div className='legend-box-container'>
                    <div className='legend-image icon '>
                      {/* <img src={greenPlant} alt='' /> */}
                      <MdAddLocationAlt className='legend-icon' />
                    </div>
                    <span className='legend-description'>
                      geolocalizzazione
                    </span>
                  </div>
                </li>
                {/* <li className='plants-list'>
                <div className='legend-box-container'>
                  <div className='legend-image icon '>
                    <MdFilterAlt className='legend-icon' />
                  </div>
                  <span className='legend-description'>
                    filtra risultati di ricerca
                  </span>
                </div>
              </li> */}
                <li className='plants-list'>
                  <div className='legend-box-container'>
                    <div className='legend-image icon '>
                      {/* <img src={greenPlant} alt='' /> */}
                      <MdCenterFocusStrong className='legend-icon' />
                    </div>
                    <span className='legend-description'>Accentra mappa</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default Legend;
