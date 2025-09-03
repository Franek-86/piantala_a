import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import React from "react";

const ChiSiamo = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <>
      <section className='section-page section-background'>
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
            L'iniziativa "Ti pianto per amore" voluta dall'Associazione
            culturale no-profit "Amici di Ernest Verner" promuove l'adozione di
            alberi da parte di privati da piantare in punti della città di Bari
            privi di verde, in ottemperanza al Disciplinare tecnico (20/05/25)
            dell'iniziativa "Dona un albero alla tua città" del Comune di Bari.
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
    </>
  );
};

export default ChiSiamo;
