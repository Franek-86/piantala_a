import React from "react";
import BottomBar from "../components/BottomBar";
import { Link, useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";

import Tabs from "react-bootstrap/Tabs";
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

          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                Segnalare zona di piantumazione
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  È possibile segnalare la zona di piantumazione seguendo i
                  seguenti passaggi.
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    Recarsi sul punto in cui si desidera piantare un albero (una
                    buca senza ceppo o uno spazio privo di verde).
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Scattare una fotografia del punto e del contesto
                    circostante.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    {" "}
                    Cliccare sull'icona della geolocalizzazione (a forma di
                    goccia) in alto a destra (riportare i l simbolo) e
                    successivamente su "aggiungi alla mappa". Si aprirà una
                    finestra con le coordinate del luogo prescelto: qui sarà
                    necessario caricare la foto scattata e iviare la
                    segnalazione.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Una volta inviata la segnalazione, un'icona a forma di
                    piantina (inizialmente di colore arancione) sarà subito
                    visibile sulla mappa.
                  </ListGroup.Item>
                  <ListGroup.Item as='li' className='info-list'>
                    {" "}
                    L'amministratore verificherà la possibilità di piantare un
                    albero sul punto indicato.
                    {/* <p>
                      {" "}
                      A seguito della verifica da parte dell'amministratore, la
                      segnalazione inoltrata potrà essere approvata o respinta.
                      <ul>
                        <li>
                          Nel caso in cui la segnalazione venga approvata la
                          zona sarà acquistabile sia dal segnalatore che da
                          terzi.
                        </li>
                        <li>
                          Nel caso in cui la segnalazione venga respinta
                          l'amministratore si impegna a dichiarare i motivi
                          della mancata approvazione.
                        </li>
                      </ul>
                      <Alert variant='info' className='mt-3'>
                        La modifica dello stato della segnalazione così come
                        l'eventuale nota in caso di respinta saranno visibili
                        sia sulla pagina "Le mie segnalazioni" in corrispondenza
                        della propria segnazione, che sulla mappa cliccando
                        sull'alberello relativo alla segnalazione in oggetto.
                        Tale modifica è anche immediatamente visibile sulla
                        mappa in quanto l'alberello cambia subito colore a
                        seguito della modifica dello stato da parte
                        dell'amministratore (vedi{" "}
                        <Link to={"/legend"}>legenda </Link> per informazione
                        completa sugli stati delle piantine).
                      </Alert>
                    </p> */}
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>
                Richiedere piantumazione albero
              </Accordion.Header>
              <Accordion.Body>
                <p>La richiesta di piantumazione può partire da:</p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    una zona già segnalata da un'altro utente
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    oppure dalla volontà di segnalare personalmente una nuova
                    zona
                  </ListGroup.Item>
                </ListGroup>
                <p className='mt-3'>
                  {" "}
                  Se si sceglie una zona già segnalata da altri:
                </p>

                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    selezionare dalla mappa una piantina acquistabile (quelle di
                    colore verde; vedi <Link to={"/legend"}>legenda </Link> per
                    informazione completa sugli stati delle piantine).
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Inserire il testo che si vuole riportare sulla targa che
                    verrà apposta sulla piantina{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Cliccare su "procedi con il pagamento" per essere
                    reindirizzato sulla piattaforma di pagamento
                  </ListGroup.Item>
                </ListGroup>
                <p className='mt-3'>
                  {" "}
                  Se si vuole segnalare personalmente una nuova zona vanno prima
                  seguiti i passaggi elencati nella sezione informativa
                  soprastante "Segnalare zona di piantagione".
                </p>
                {/* <Alert variant='info' className='mt-3'>
                      Il prezzo forfettario di 200 euro per ciascun albero
                      comprende l'iscrizione all'associazione Amici di Ernest
                      Verner, la realizzazione e stampa della targa in alluminio
                      con la dedica e la piantumazione. La tipologia di albero
                      sarà concordato con i competenti uffici del Comune.
                    </Alert> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>Monitorare i propri acquisti</Accordion.Header>
              <Accordion.Body>
                <p>
                  Dopo l'acquisti verrà inviata un'e-mail con i dettagli
                  dell'ordine (incluso il numero d'ordine). Quest'email
                  rapresenta la conferma dell'acquisto.
                </p>
                <p>
                  Nella pagina "Acquisti" apparirà una scheda con le
                  informazioni inerenti i propri aquisti, tra queste è presente
                  il numero del proprio ordine ed è anche possibile verificare
                  lo stato dell'ordine. Lo stato può essere:
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    Pending: l'ordine non è stato ancora preso in carico.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    In progress: l'ordine è stato preso in carico.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Completed: l'ordine è stato completato.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
              <Accordion.Header>
                Monitorare le proprie segnalazioni
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  {" "}
                  Dopo l'invio di una segnalazione, sulla mappa apparirà
                  un'icona a forma di piantina di colore arancione nella
                  posizione scelta.
                </p>
                <p>
                  Nella pagina "Le mie segnalazioni" sarà visibile una scheda
                  con le informazioni inerenti le proprie segnalazioni, tra
                  queste è presente lo stato della segnalazione. Lo stato può
                  essere:
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    In attesa di approvazione: l'amministrazione deve ancora
                    verificare la segnalazione.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Rejected: l'amministrazione non ha approvato la
                    segnalazione.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Approvato: l'amministrazione ha approvato la segnalazione.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Info;
