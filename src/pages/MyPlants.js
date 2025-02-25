import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import BottomBar from "../components/BottomBar";
import Table from "react-bootstrap/Table";
import { PlantsContext } from "../context/PlantsContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import copy from "copy-to-clipboard";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
  const copyToClipboard = (copyText) => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };
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
            <Row xs={1} md={2} className='g-4'>
              {myReports.map((plant, index) => (
                <Col key={index}>
                  <Card>
                    <Card.Img variant='top' src={plant?.image_url} />
                    {/* <Card.Body> */}
                    {/* <Card.Title>
                      {plant?.road !== "undefined"
                        ? plant?.road
                        : plant?.residential}
                    </Card.Title> */}
                    <Card.Header>
                      {" "}
                      <Card.Title>
                        {" "}
                        {plant?.road !== "undefined"
                          ? plant?.road
                          : plant?.residential}
                      </Card.Title>
                    </Card.Header>
                    {/* <Card.Text></Card.Text> */}
                    {/* </Card.Body> */}
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        {" "}
                        quartiere: {plant?.suburb}
                      </ListGroup.Item>
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
                        Data segnalazione: {formatDate(plant.created_at)}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
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
                    </Card.Body>
                    {/* <Card.Footer>
                    <small className='text-muted'>
                      Data segnalazione {formatDate(plant.created_at)}
                    </small>
                  </Card.Footer> */}
                  </Card>
                </Col>
              ))}
            </Row>

            // <Table striped bordered hover responsive>
            //   <thead>
            //     <tr>
            //       <th>Data</th>
            //       <th className='text-center'>Stato</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {myReports.map((plant, index) => (
            //       <>
            //         <tr
            //           key={plant.id}
            //           onClick={() => goToPlantPage(plant.id)}
            //           role='button'
            //         >
            //           <td>{formatDate(plant.created_at)}</td>
            //           {/* <td>{plant.lat}</td>
            //           <td>{plant.lang}</td> */}
            //           <td className={getStatusClasses(plant.status_piantina)}>
            //             {renderStatus(plant.status_piantina)}
            //           </td>
            //         </tr>
            //       </>
            //     ))}
            //   </tbody>
            // </Table>
          )}
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default MyPlants;
