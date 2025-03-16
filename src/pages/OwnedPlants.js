import React, { useContext, useEffect } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PlantsContext } from "../context/PlantsContext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ListGroup } from "react-bootstrap";
import BottomBar from "../components/BottomBar";
import { copyToClipboard } from "../utils/utils";

const OwnedPlants = () => {
  const { getMyPlants, myPlants } = useContext(PlantsContext);
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  useEffect(() => {
    getMyPlants(userId);
  }, [userId]);
  const goToPlantPage = (prop) => {
    navigate(`/map/${prop}`, { state: { from: "/bookedPlants" } });
  };
  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-pending text-dark text-center"; // Yellow background, dark text
      case "rejected":
        return "bg-rejected text-white text-center"; // Red background, white text
      case "approved":
        return "bg-approved text-white text-center"; // Green background, white text
      case "booked":
        return "bg-booked text-white text-center"; // Green background, white text
      default:
        return "bg-secondary text-white text-center"; // Default styling for unknown status
    }
  };

  return (
    <>
      <section className='section-page section-background'>
        <div className='section-center'>
          {/* <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div> */}
          <h2 className='section-title'>Le mie piante</h2>
          {myPlants && myPlants?.length > 0 ? (
            /* <th>Data acquisto</th>
                <th>Tipo</th>
                <th>Targa</th> */

            <Row xs={1} md={2} className='g-4'>
              {myPlants &&
                myPlants.map((plant, index) => {
                  const formatDate = (date) => {
                    const newDate = new Date(date);
                    return newDate.toLocaleDateString("en-GB");
                  };
                  // let dateObj = new Date(plant.purchase_date);
                  // let myDate = dateObj.toLocaleDateString("it-IT");
                  // let date = myDate.split("T")[0];

                  // let [year, month, day] = date.split("-");
                  // day = day < 10 ? "0" + day : day;
                  // month = month < 10 ? "0" + month : month;
                  // let formattedDate = `${day}/${month}/${year}`;

                  return (
                    <div className='d-flex mb-2'>
                      <div className='card-image-container w-25 rounded-left'>
                        <img
                          className='image-my rounded-left'
                          src={plant?.image_url}
                        />
                      </div>
                      <Card className='w-75 card-my'>
                        <Card.Header>
                          {" "}
                          <Card.Title>
                            {" "}
                            {plant?.road !== "undefined" && !plant?.house_number
                              ? `${plant?.road}`
                              : plant?.road && plant?.house_number
                              ? `${plant?.road} nº ${plant?.house_number}`
                              : plant?.residential}
                          </Card.Title>
                          <span>{plant?.suburb}</span>
                        </Card.Header>
                        {/* <Card.Text></Card.Text> */}
                        {/* </Card.Body> */}
                        <ListGroup variant='flush'>
                          {/* <ListGroup.Item>
                        {" "}
                        quartiere: {plant?.suburb}
                      </ListGroup.Item> */}
                          {/* <ListGroup.Item>
                            stato:{" "}
                            <span
                              className={getStatusClasses(
                                plant.status_piantina
                              )}
                            >
                              {" "}
                              {plant?.status_piantina}
                            </span>{" "}
                          </ListGroup.Item> */}
                          <ListGroup.Item>
                            Tipo pianta: {plant.plant_type}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Card.Link
                              onClick={() => goToPlantPage(plant.id)}
                              href='#'
                            >
                              Dettagli
                            </Card.Link>
                            <Card.Link
                              onClick={() =>
                                copyToClipboard([`${plant.lat},${plant.lang}`])
                              }
                              href='#'
                            >
                              Copia coordinate
                            </Card.Link>
                            {/* <Card.Link href='#'>Another Link</Card.Link> */}
                          </ListGroup.Item>
                        </ListGroup>

                        {/* <Card.Footer>
                    <small className='text-muted'>
                      Data segnalazione {formatDate(plant.created_at)}
                    </small>
                  </Card.Footer> */}
                      </Card>
                    </div>
                    // <tr
                    //   onClick={() => {
                    //     goToPlantPage(plant.id);
                    //   }}
                    //   key={index}
                    // >
                    //   {/* <td>{index + 1}</td> */}
                    //   <td className='bg-info'>
                    //     {formatDate(plant.purchase_date)}
                    //   </td>
                    //   <td className='bg-info'>{plant.plant_type}</td>
                    //   <td className='bg-info'>{plant.user_comment}</td>
                    // </tr>
                  );
                })}
            </Row>
          ) : (
            <p>
              Non hai ancora nessuna piantina, puoi scegliere di acquistare una
              piantina direttamente dalla mappa scegliendo tra le piantine
              approvate. In alternativa puoi scegliere una piantina approvata
              dalla lista delle tue segnalazioni.
            </p>
          )}
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default OwnedPlants;
