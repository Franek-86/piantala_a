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
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const ChiSiamo = () => {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <div className=''>
      {isLargeScreen && <SideBar />}
      <div className='section-page section-full-page  section-large page-large-container'>
        <BackBtn />
        <section className='h-75 chi-article section-background menu-section-center pb-5'>
          <div className='section-center'>
            <h2 className='section-title pt-5'>Chi siamo</h2>
            <div className=''>
              <h4>Ti pianto per amore</h4>
            </div>
            <p>
              L'iniziativa{" "}
              <span className='primary-green fw-bold'>
                "Ti pianto per amore"
              </span>{" "}
              voluta dall'Associazione culturale no-profit{" "}
              <span className='primary-green fw-bold'>
                "Amici di Ernest Verner"
              </span>{" "}
              promuove l'adozione di alberi da parte di privati da piantare in
              punti della città di Bari privi di verde, in ottemperanza al
              Disciplinare tecnico (20/05/25) dell'iniziativa "Dona un albero
              alla tua città" del Comune di Bari.
            </p>
            <p className='mb-0'>
              {" "}
              L'app permette di localizzare queste zone e prenotare l'acquisto
              di un albero con apposita targa da dedicare. La filosofia di
              questa iniziativa è prendersi cura del verde pubblico ed è per
              questo che coloro che acquistano gli alberi si impegnano a
              innaffiarli regolarmente, soprattutto d'estate, almeno nei primi
              due anni dalla piantumazione.
            </p>
          </div>
        </section>
        <section className='h-50 chi-logo-section  pt-4 pt-lg-5'>
          <div className='section-center'>
            <h4 className=''>Patrocini</h4>
          </div>
          <div className='pt-5 logo-container d-flex flex-column flex-lg-row justify-content-around w-100'>
            <div className='single-logo mb-5 mb-lg-0'>
              {" "}
              <a
                href='https://www.ernestverner.it/'
                className='logo-background logo-verner'
              ></a>
            </div>
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
          </div>
        </section>
        <section className='h-50 pt-4 pb-5 pt-lg-5 position-background'>
          <div className='section-center'>
            <h4>Seguici sui nostri canali</h4>

            <div className='mt-5 contacts-social-container d-flex flex-column flex-xl-row justify-content-around justify-content-xl-start align-items-center w-100'>
              <article className='contacts-social-icon mb-4 pe-xl-5'>
                <a
                  target='_blank'
                  href='https://www.instagram.com/tipiantoperamore?igsh=MWY5cTFhZWJ2NXM2eQ=='
                >
                  {" "}
                  <FaInstagram />
                </a>
              </article>
              <article className='contacts-social-icon mb-4 pe-xl-5'>
                <a
                  target='_blank'
                  href='https://www.facebook.com/ti.pianto.per.amore/'
                >
                  {" "}
                  <FaFacebookF />
                </a>
              </article>
              <article className='contacts-social-icon mb-4'>
                <a target='_blank' href='  https://x.com/Amici_ErnestV'>
                  {" "}
                  <FaXTwitter />
                </a>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChiSiamo;
