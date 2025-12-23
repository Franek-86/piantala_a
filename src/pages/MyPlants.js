import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import BottomBar from "../components/map/BottomBar";
import Table from "react-bootstrap/Table";
import { PlantsContext } from "../context/PlantsContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardImg from "react-bootstrap/CardImg";

import { copyToClipboard } from "../utils/utils";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";

const MyPlants = () => {
  const { myReports, loadingReports, fetchUserPlants } =
    useContext(PlantsContext);
  const isLargeScreen = useIsLargeScreen();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPlants(); // Fetch plants on component mount
  }, []);

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
      <section className='section-page section-background map'>
        <div className='d-flex flex-row'>
          {isLargeScreen && <SideBar />}
          <div className='section-large section-page section-center section-center-map w-100'>
            <h2 className='section-title d-lg-none pt-5'>
              Le mie segnalazioni
            </h2>

            {loadingReports ? (
              <Loading />
            ) : myReports.length === 0 ? (
              <p className='mt-lg-5'>Non hai ancora effettuato segalazioni</p>
            ) : (
              <div className='section-center'>
                <Row xs={1} md={2} xl={3} className='g-4'>
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
                        <Card.Header className='my-plants-card-header'>
                          {" "}
                          {/* <Card.Title>
                          {plant?.road !== "undefined" &&
                          plant?.house_number === "undefined"
                            ? `${plant?.road}`
                            : plant?.road !== "undefined" &&
                              plant?.house_number !== "undefined"
                            ? `${plant?.road} ${plant?.house_number}`
                            : plant?.residential }
                        </Card.Title> */}
                          <Card.Title>
                            {plant?.road !== "undefined" &&
                            plant?.house_number === "undefined"
                              ? `${plant?.road}`
                              : plant?.road !== "undefined" &&
                                plant?.house_number !== "undefined"
                              ? `${plant?.road} ${plant?.house_number}`
                              : plant?.road === "undefined" &&
                                plant?.house_number === "undefined" &&
                                plant?.residential === "undefined"
                              ? plant?.suburb
                              : plant?.residential}
                          </Card.Title>
                          {plant?.road === "undefined" &&
                          plant?.house_number === "undefined" &&
                          plant?.residential === "undefined" ? (
                            <span className='invisible'>{plant?.suburb}</span>
                          ) : (
                            <span>{plant?.suburb}</span>
                          )}
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
                              className={
                                plant.status_piantina === "approved"
                                  ? "approvedPlant"
                                  : plant.status_piantina === "rejected"
                                  ? "rejectedPlant"
                                  : plant.status_piantina === "booked"
                                  ? "bookedPlant"
                                  : "pendingPlant"
                              }
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
                              className='copy'
                              onClick={() => goToPlantPage(plant.id)}
                              href='#'
                            >
                              Dettagli
                            </Card.Link>
                            <Card.Link
                              className='copy'
                              onClick={() =>
                                copyToClipboard([`${plant.lat},${plant.lang}`])
                              }
                              href='#'
                            >
                              Coordinate
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
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default MyPlants;
