import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import BottomBar from "../components/BottomBar";
import Table from "react-bootstrap/Table";
import { PlantsContext } from "../context/PlantsContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardImg from "react-bootstrap/CardImg";
import { copyToClipboard } from "../utils/utils";

const MyPlants = () => {
  const { myReports, loadingReports, fetchUserPlants } =
    useContext(PlantsContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPlants(); // Fetch plants on component mount
  }, []);

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
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "in attesa";
      case "rejected":
        return "non approvata";
      case "approved":
        return "approvata";
      case "booked":
        return "acquistata";
      default:
        return "stato sconosciuto"; // Default case if needed
    }
  };
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };
  const goToPlantPage = (id) => {
    navigate(`/map/${id}`, { state: { from: "/myPlants" } });
  };
  console.log(myReports);

  return (
    <>
      <section className='section-page section-background'>
        <div className='section-center'>
          <h2 className='section-title'>Le mie segnalazioni</h2>

          {loadingReports ? (
            <Loading />
          ) : myReports.length === 0 ? (
            <p>Non hai ancora effettuato segalazioni.</p>
          ) : (
            <div
              className='
            d-flex
            flex-column
            align-items-center

            '
            >
              <Row xs={1} md={2} className='g-4'>
                {myReports.map((plant, index) => (
                  // <Col key={index}>
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
                          {plant?.road !== "undefined" && !plant?.house_number
                            ? `${plant?.road}`
                            : plant?.road && plant?.house_number
                            ? `${plant?.road} ${plant?.house_number}`
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
                        <ListGroup.Item>
                          stato:{" "}
                          <span
                            className={getStatusClasses(plant.status_piantina)}
                          >
                            {" "}
                            {plant?.status_piantina}
                          </span>{" "}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Segnalato il: {formatDate(plant.created_at)}
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
                  // </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default MyPlants;
