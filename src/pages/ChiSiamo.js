import BottomBar from "../components/map/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import React from "react";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
import logoBari from "../assets/images/layout_set_logo.png";
import donaBari from "../assets/images/donalogo.jpg";
import logoVerner from "../assets/images/logoverner.jpg";
import BackBtn from "../components/menu/BackBtn";

const ChiSiamo = () => {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <div className='d-flex flex-row'>
      {isLargeScreen && <SideBar />}
      <section className='section-page section-full-page  section-background section-large page-large-container'>
        <BackBtn />
        <article className='chi-article section-center menu-section-center pt-5 pb-lg-5'>
          <h2 className='section-title'>Chi siamo</h2>
          <p>
            L'iniziativa{" "}
            <span className='primary-green fw-bold'>"Ti pianto per amore"</span>{" "}
            voluta dall'Associazione culturale no-profit{" "}
            <span className='primary-green fw-bold'>
              "Amici di Ernest Verner"
            </span>{" "}
            promuove l'adozione di alberi da parte di privati da piantare in
            punti della città di Bari privi di verde, in ottemperanza al
            Disciplinare tecnico (20/05/25) dell'iniziativa "Dona un albero alla
            tua città" del Comune di Bari.
          </p>
          <p>
            {" "}
            L'app permette di localizzare queste zone e prenotare l'acquisto di
            un albero con apposita targa da dedicare. La filosofia di questa
            iniziativa è prendersi cura del verde pubblico ed è per questo che
            coloro che acquistano gli alberi si impegnano a innaffiarli
            regolarmente, soprattutto d'estate, almeno nei primi due anni dalla
            piantumazione.
          </p>
        </article>
        <article className='logo-article section-center'>
          <div className='logo-header my-5 text-center'>
            <h4>Patrocini</h4>
          </div>
          <div className='logo-container d-flex flex-column flex-lg-row justify-content-around w-100'>
            <div className='single-logo mb-5 mb-lg-0'>
              {" "}
              <a
                href='https://www.comune.bari.it/'
                className='logo-background logo-city'
              ></a>
            </div>
            <div className='single-logo mb-5 mb-lg-0'>
              {" "}
              <a
                href='https://www.comune.bari.it/web/ambiente-verde-energia-e-impianti/dona-un-albero-alla-tua-citta'
                className='logo-background logo-dona'
              ></a>
            </div>
            <div className='single-logo mb-5 mb-lg-0'>
              {" "}
              <a
                href='https://www.ernestverner.it/'
                className='logo-background logo-verner'
              ></a>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ChiSiamo;
