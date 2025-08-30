import React from "react";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
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

          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                Richiedere piantumazione albero
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  La richiesta di piantumazione può partire dalla volontà di
                  piantare su una zona già segnalata da un'altro utente (segn.
                  terzi) oppure dalla volontà di segnalare personalmente la zona
                  di piantagione (segn. propria).
                </p>
                <Tabs
                  defaultActiveKey='profile'
                  id='uncontrolled-tab-example'
                  className='mb-3'
                >
                  <Tab eventKey='profile' title='Segn. terzi'>
                    <p>
                      Nel caso si voglia piantare su una zolla segnalata da
                      terzi l'utente dovrà semplicemente selezionare dalla mappa
                      una piantina acquistabile, le piantine acquistabili sono
                      tutte quelle piantie colorate di verde (vedi legenda per
                      informazione completa sugli stati delle piantine) e
                      procedere alla scrittura della dedica ed al pagamento.
                    </p>
                    <p>
                      Una volta scritto il testo della targa, cliccando su
                      "procedi con il pagamento", l'utente sarà direttamente
                      reindirizzato sulla piattaforma di pagamento.
                    </p>
                  </Tab>
                  <Tab eventKey='home' title='Segn. propria'>
                    <p>
                      Nel caso in cui l'utente voglia segnalare personalmente la
                      zona di piantagione dove poi aquistare eventualmente il
                      servizio di piantumazione sarà necessario seguire i
                      seguenti passaggi.
                    </p>
                    <ListGroup as='ol' numbered>
                      <ListGroup.Item as='li'>
                        {" "}
                        Recarsi sul punto dove si vuole piantare l'albero (una
                        buca senza ceppo o uno spazio privo di verde).
                      </ListGroup.Item>
                      <ListGroup.Item as='li'>
                        Scattare una fotografia del punto e del contesto
                        circostante.
                      </ListGroup.Item>
                      <ListGroup.Item as='li'>
                        {" "}
                        Cliccare sull'icona della geolocalizzazione (a forma di
                        goccia) in alto a destra (riportare i l simbolo). Si
                        aprirà una finestra che riporta le coordinate del luogo
                        prescelto.
                      </ListGroup.Item>
                      <ListGroup.Item as='li'>
                        In caso positivo, l'utente potrà procedere al pagamento
                        e alla scrittura della dedica.
                      </ListGroup.Item>
                      <Alert variant='info' className='mt-3'>
                        L'amministratore provvederà a verificare la possibilità
                        di piantare un albero sul punto indicato (per verificare
                        lo stato della segnalazione V. Leggenda inserire icona).
                        In caso positivo, l'utente potrà procedere al pagamento
                        e alla scrittura della dedica.
                      </Alert>
                    </ListGroup>
                    {/* <Alert variant='info' className='mt-3'>
                      Il prezzo forfettario di 200 euro per ciascun albero
                      comprende l'iscrizione all'associazione Amici di Ernest
                      Verner, la realizzazione e stampa della targa in alluminio
                      con la dedica e la piantumazione. La tipologia di albero
                      sarà concordato con i competenti uffici del Comune.
                    </Alert> */}
                  </Tab>
                </Tabs>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Monitoraggio aquisti</Accordion.Header>
              <Accordion.Body>
                <p>
                  {" "}
                  Successivamente all'avvenuto acquisto verrà inviata una mail
                  con i dettagli dell'ordine tra cui un numero d'ordine, questa
                  mail rappresenta la conferma dell'avvenuto acquisto.
                </p>
                <p>
                  Nella pagina "Aquisti" apparirà una scheda con le informazioni
                  inerenti i propri aquisti, tra queste è presente il numero del
                  proprio ordine ed è anche posibile verificare lo stato
                  dell'ordine che può essere "in progress", "pending" o
                  "completated". pending: l'ordine non è stato ancora preso in
                  carico in progress: l'ordine è stato preso in carico complete:
                  l'ordine è concluso.
                </p>
                <p>
                  In caso di dubbi o domande sul proprio ordine sarà possibile
                  inviare una mail direttamente dalla pagina "Contattaci"
                  riportando il numero d'ordine del proprio acquisto.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>
                Segnalare zona di piantumazione
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  È possibile segnalare la zona di piantagione seguendo i
                  seguenti passaggi.
                </p>
                <ListGroup as='ol' numbered>
                  <ListGroup.Item as='li'>
                    Recarsi sul punto dove si vuole piantare l'albero (una buca
                    senza ceppo o uno spazio privo di verde).
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Scattare una fotografia del punto e del contesto
                    circostante.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    {" "}
                    Cliccare sull'icona della geolocalizzazione (a forma di
                    goccia) in alto a destra (riportare i l simbolo) e cliccare
                    successivamente su "aggiungi alla mappa". Si aprirà una
                    finestra che riporta le coordinate del luogo prescelto. Qui
                    sarà necessariio caricare l'immagine precedentemente
                    scattata per poi procedere con l'invio della segnalazione.
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Una volta inviata la segnalazione, un'alberello
                    (inizialmente di colore arancione) sarà da subito visibile
                    sulla mappa. La stessa segnalazione varrà inoltre salvata
                    sulla pagina dell'utente segnalante in modo da rendere più
                    facilmente accessibile tutte le informazioni inerenti le
                    proprie segnalazioni.
                  </ListGroup.Item>

                  <ListGroup.Item as='li' className='info-list'>
                    {" "}
                    L'amministratore provvederà a verificare la possibilità di
                    piantare un albero sul punto indicato.
                    <p>
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
                        sia pagina "Le mie segnalazioni" in corrispondenza della
                        segnazione specifica, che sulla mappa cliccando
                        sull'alberello relativo alla segnalazione in oggetto.
                      </Alert>
                    </p>
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
