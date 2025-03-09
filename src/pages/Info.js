import React from "react";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";

const Info = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <>
      <section className='section-page section-background'>
        <div className='section-center'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
          <h2 className='section-title'>Chi siamo</h2>
          <p>
            L'iniziativa "Ti pianto per amore" voluta dall'Associazione
            culturale "Amici di Ernest Verner" intende promuovere l'adozione di
            alberi da parte di privati in punti della città di Bari dove ci
            siano buche o zone lasciate prive di verde. L'app ci permette di
            localizzare queste zone, segnalarle ed eventualmente prenotarle per
            l'acquisto di un albero con apposita targa da dedicare. I passaggi
            per l'acquisto dell'albero (scelta dell'albero, testo per la targa e
            pagamento) sono tutti indicati nella legenda. Per qualsiasi
            chiarimento contattaci 3485384563.
          </p>
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default Info;
