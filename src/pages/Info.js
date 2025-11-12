import React from "react";
import BottomBar from "../components/map/BottomBar";
import { Link, useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
import Tabs from "react-bootstrap/Tabs";
const Info = () => {
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
        <div className='section-center menu-section-center section-info'>
          <h2 className='section-title'>Informazioni</h2>

          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Scarica l'app come "tester"</Accordion.Header>
              <Accordion.Body>
                <p>
                  Al fine di rendere l'app disponibile il prima possibile a
                  tutti gli utenti su Google Play, vi invitiamo a scaricare
                  l'app di "Ti Pianto Per Amore" come "tester" seguendo le
                  indicazioni che riportiamo qui di seguito.
                </p>
                <p>
                  Più o meno 24h dopo esservi registrati potrete installare
                  l'app sceglierdo tra una delle due opzioni che riporto in
                  basso.
                </p>
                <ListGroup as='ol'>
                  <ListGroup.Item variant='info' as='li'>
                    {" "}
                    Accedere alla app di "Ti Pianto Per Amore" da Google Play su
                    Android cliccando{" "}
                    <a href='https://play.google.com/store/apps/details?id=com.piantala.app'>
                      qui
                    </a>{" "}
                    ed installarla sul vostro dispositivo android.
                  </ListGroup.Item>
                  <ListGroup.Item as='li' variant='info'>
                    In alternativa potete accedere ed installare l'app di "Ti
                    Pianto Per Amore" da web cliccando{" "}
                    <a href='https://play.google.com/apps/testing/com.piantala.app'>
                      qui
                    </a>{" "}
                    ed effettuando l'installazione sul vostro dispositivo mobile
                    android direttamente da web
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
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
                  {/* <ListGroup.Item as='li'>
                    Scattare una fotografia del punto e del contesto
                    circostante.
                  </ListGroup.Item> */}
                  <ListGroup.Item as='li'>
                    {" "}
                    Cliccare sull'icona della geolocalizzazione (icona a forma
                    di goccia; vedi <Link to={"/legend"}>legenda </Link> per
                    informazione completa sulle icone della mappa).
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    {" "}
                    Si aprirà una finestra con le coordinate del luogo
                    prescelto. Qui sarà necessario aggiungere una fotografia del
                    punto e del contesto circostante e successivamente inviare
                    la segnalazione.
                  </ListGroup.Item>
                  {/* <ListGroup.Item as='li'>
                    Una volta inviata la segnalazione, un'icona a forma di
                    piantina (inizialmente di colore arancione) sarà subito
                    visibile sulla mappa.
                  </ListGroup.Item> */}{" "}
                  <Alert variant='info' className='mt-3'>
                    L'amministratore verificherà la possibilità di piantare un
                    albero sul punto indicato.
                  </Alert>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>
                Monitorare le proprie segnalazioni
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Dopo l'invio di una segnalazione, nella pagina "Le mie
                  segnalazioni" apparirà una scheda informativa con i dettagli
                  inerenti la propria segnalazione, tra queste è presente lo
                  stato della segnalazione. <br /> Lo stato può essere:
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    <span className='pendingPlant'>
                      In attesa di approvazione:{" "}
                    </span>
                    lo è inizialmente ogni segnalazione nella fase che precede
                    la verifica della stessa da parte dell'amministrazione.
                    Sulla mappa apparirà una icona a forma di piantina di colore
                    arancione.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <span className='rejectedPlant'>Non approvata:</span>{" "}
                    l'amministrazione non ha approvato la segnalazione. Nella
                    scheda relativa a questa segnalazione sarà visibile la
                    motivazione rilasciata dall'amministrazione per il non aver
                    approvato la segnalazione in oggetto. Sulla mappa apparirà
                    una icona a forma di piantina di colore rosso.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <span className='approvedPlant'>Approvata: </span>
                    l'amministrazione ha approvato la segnalazione. In
                    corrispondenza di questo stato sulla mappa apparirà una
                    icona a forma di piantina di colore verde.
                  </ListGroup.Item>
                </ListGroup>
                <p className='mt-3'>
                  {" "}
                  Sulla mappa inoltre apparirà un'icona a forma di piantina,
                  inizialmente di colore arancione, nella posizione scelta. Per
                  poterla visualizzare sarà necessario filtrare i risultati di
                  ricerca selezionando le piantine "in attesa di approvazione".
                  Cliccandoci su sarà possibile verificare i dettagli della
                  segnalazione.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
              <Accordion.Header>
                Richiedere piantumazione albero
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  È possibile richiedere la piantumazione seguendo i seguenti
                  passaggi.
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

                <Alert variant='info' className='mt-3'>
                  Se si vuole acquistare un albero da piantare in un punto
                  specifico vanno prima seguiti i passaggi elencati nella
                  sezione informativa "Segnalare zona di piantagione", bisogna
                  attendere l'approvazione dell'amministrazione e
                  successivamente seguire i tre passaggi di cui sopra.
                </Alert>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='4'>
              <Accordion.Header>
                Servizio offerto, costi e tempi
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Il servizio offerto è volto a promuovere l'adozione di alberi
                  da parte di privati da piantare in punti della città di Bari
                  privi di verde.
                </p>
                <p>
                  La filosofia di questa iniziativa è prendersi cura del verde
                  pubblico ed è per questo che coloro che acquistano gli alberi
                  si impegnano a innaffiarli regolarmente, soprattutto d'estate,
                  almeno nei primi due anni dalla piantumazione.
                </p>
                <p>
                  {" "}
                  Il prezzo forfettario per ciascun albero è di 200 euro e
                  comprende:
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    la messa a dimora dell'albero
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    la realizzazione e stampa della targa in alluminio con la
                    dedica
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    la piantumazione entro sei mesi dalla richiesta
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    l'iscrizione all'associazione Amici di Ernest Verner
                  </ListGroup.Item>
                </ListGroup>
                <p className='mt-3'>
                  {" "}
                  La tipologia di albero sarà concordata con i competenti uffici
                  del Comune e resa visibile online nella scheda di acquisto e
                  nei dettagli della piantina non appena stabilita.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='5'>
              <Accordion.Header>Monitorare i propri acquisti</Accordion.Header>
              <Accordion.Body>
                <p>
                  Dopo ciascun acquisto verrà inviata un'e-mail con i dettagli
                  dell'ordine (incluso il numero d'ordine). Questa e-mail
                  rapresenta la conferma dell'acquisto.
                </p>
                <p>
                  Nella pagina "Acquisti" apparirà una scheda con le
                  informazioni inerenti ai propri aquisti ed è anche possibile
                  verificare lo stato dell'ordine. <br /> Lo stato dell'ordine
                  può essere:
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    <span className='rejectedPlant'>In attesa</span>: l'ordine
                    non è stato ancora preso in carico.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <span className='pendingPlant'>In elaborazione</span>:
                    l'ordine è stato preso in carico.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <span className='approvedPlant'>Completato</span>: l'ordine
                    è stato concluso.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
      {isLargeScreen && <SideBar />}
    </>
  );
};

export default Info;
