import React from "react";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
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
        <div className='section-center menu-section-center section-info'>
          <h2 className='section-title'>Informazioni</h2>
          <h6>Come richiedere la piantumazione di un albero </h6>
          <p>
            La richiesta di piantumazione può partire dalla volontà di piantare
            su una zona già segnalata da un'altro utente oppure dalla volontà di
            segnalare personalmente la zona di piantagione.
          </p>
          <p>
            {" "}
            Nel primo caso l'utente dovrà semplicemente selezionare dalla mappa
            una piantina acquistabile (vedi legenda) e procedere alla scrittura
            della dedica ed al pagamento.
          </p>
          <p>Nel secondo caso l'utente dovrà:</p>
          <ListGroup as='ol' numbered>
            <ListGroup.Item as='li'>
              {" "}
              Recarsi sul punto dove si vuole piantare l'albero (una buca senza
              ceppo o uno spazio privo di verde).
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Scattare una fotografia del punto e del contesto circostante.
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              {" "}
              Cliccare sull'icona della geolocalizzazione (a forma di goccia) in
              alto a destra (riportare i l simbolo). Si aprirà una finestra che
              riporta le coordinate del luogo prescelto.
            </ListGroup.Item>
            <Alert variant='info' className='mt-3'>
              L'amministratore provvederà a verificare la possibilità di
              piantare un albero sul punto indicato (per verificare lo stato
              della segnalazione V. Leggenda inserire icona). In caso positivo,
              l'utente potrà procedere al pagamento e alla scrittura della
              dedica.
            </Alert>
            <ListGroup.Item as='li'>
              In caso positivo, l'utente potrà procedere al pagamento e alla
              scrittura della dedica.
            </ListGroup.Item>
          </ListGroup>
          <Alert variant='info' className='mt-3'>
            Il prezzo forfettario di 200 euro per ciascun albero comprende
            l'iscrizione all'associazione Amici di Ernest Verner, la
            realizzazione e stampa della targa in alluminio con la dedica e la
            piantumazione. La tipologia di albero sarà concordato con i
            competenti uffici del Comune.
          </Alert>

          <h6>
            Come verificare l stato dell'ordine successivamente all'acquisto{" "}
          </h6>
          <ListGroup as='ol' numbered>
            <ListGroup.Item as='li'>
              {" "}
              Successivamente all'avvenuto acquisto verrà inviata una mail con i
              dettagli dell'ordine tra cui un numero d'ordine, questa mail
              rappresenta la conferma dell'avvenuto acquisto.
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Nella pagina "Aquisti" apparirà una scheda con le informazioni
              inerenti i propri aquisti, tra queste è presente il numero del
              proprio ordine ed è anche posibile verificare lo stato dell'ordine
              che può essere "in progress", "pending" o "completato".
              <ul>
                <li>pending: l'ordine non è stato ancora preso in carico</li>
                <li>in progress: l'ordine è stato preso in carico</li>
                <li>complete: l'ordine è concluso.</li>
              </ul>
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              In caso di dubbi o domande sul proprio ordine sarà possibile
              inviare una mail direttamente dalla pagina "Contattaci" riportando
              il numero d'ordine del proprio acquisto.
            </ListGroup.Item>
            <Alert variant='info' className='mt-3'>
              Il completamento dell'ordine deve avvenire entro 6 mesi dalla
              richiesta.
            </Alert>
          </ListGroup>
        </div>
      </section>
    </>
  );
};

export default Info;
