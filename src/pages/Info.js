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
          <h2 className='section-title'>Informazioni</h2>
          <p>
            Per richiedere la piantumazione di un a l b e r o : Recarsi sul
            punto dove si vuole piantare l'albero (una buca senza ceppo o uno
            spazio privo di verde), scattare una fotografia del punto e del
            contesto circostante. Cliccare sull'icona della geolocalizzazione (a
            forma di goccia) in alto a destra riportare i l s i m b o l o Si
            aprirà una finestra che riporta le coordinate del luogo prescelto.
            Caricare la fotografia e premere sul tasto "invia segnalazione".
            L'amministratore provvederà a verificare la possibilità di piantare
            un albero sul punto indicato (per verificare lo stato della
            segnalazione V. Leggenda inserire icona) In caso positivo, l'utente
            potrà procedere al pagamento e alla scrittura della dedica. I prezzo
            forfettario di 200 euro per ciascun albero comprende l'iscrizione
            all'associazione Amici di Ernest Verner, la messa a dimora
            dell'albero, la realizzazione e stampa della targa in alluminio con
            la dedica, la piantumazione entro 6 mesi dalla richiesta.Il numero
            di caratteri per la targa non può eccedere i . . . La tipologia di
            albero sarà concordato con i competenti uffici del Comune.
          </p>
        </div>
      </section>
    </>
  );
};

export default Info;
