import BottomBar from "../components/map/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import React from "react";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";

const ChiSiamo = () => {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <>
      <section className='section-page section-background section-large'>
        <div className='back-container'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
        </div>
        <div className='section-center menu-section-center'>
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
        </div>
      </section>
      {isLargeScreen && <SideBar />}
    </>
  );
};

export default ChiSiamo;
