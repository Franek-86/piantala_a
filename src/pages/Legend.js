import React from "react";
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

const Legend = () => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      <section className='section-page section-background map'>
        <div className='d-flex flex-row'>
          {isLargeScreen && <SideBar />}
          <section className='section-large section-page section-center-map'>
            <h2 className='section-title pt-5 d-lg-none'>legenda</h2>
            <ul className='d-block section-center mt-lg-5'>
              <li className='plants-list'>
                <div className='legend-box-container'>
                  <div className='legend-image icon '>
                    {/* <img src={greenPlant} alt='' /> */}
                    <MdAddLocationAlt className='legend-icon' />
                  </div>
                  <span className='legend-description'>geolocalizzazione</span>
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
              {/* <li className='plants-list'>
                <div className='legend-box-container'>
                  <div className='legend-image pending'>
                    <img src={yellowPlant} alt='' />
                  </div>
                  <span className='legend-description'>
                    piante in attesa di approvazione
                  </span>
                </div>
              </li> */}
              {/* <li className='plants-list'>
                <div className='legend-box-container'>
                  <div className='legend-image rejected'>
                    <img src={redPlant} alt='' />
                  </div>
                  <span className='legend-description'>
                    piante non approvate
                  </span>
                </div>
              </li> */}
              <li className='plants-list'>
                <div className='legend-box-container'>
                  <div className='legend-image booked'>
                    <img src={bluePlant} alt='' />
                  </div>
                  <span className='legend-description'>piante acquistate</span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default Legend;
