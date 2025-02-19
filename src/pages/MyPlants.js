import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import BottomBar from "../components/BottomBar";
import Table from "react-bootstrap/Table";
import { PlantsContext } from "../context/PlantsContext";
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
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Data</th>
                  <th className='text-center'>Stato</th>
                </tr>
              </thead>
              <tbody>
                {myReports.map((plant, index) => (
                  <>
                    <tr
                      key={plant.id}
                      onClick={() => goToPlantPage(plant.id)}
                      role='button'
                    >
                      <td>{formatDate(plant.created_at)}</td>
                      {/* <td>{plant.lat}</td>
                      <td>{plant.lang}</td> */}
                      <td className={getStatusClasses(plant.status_piantina)}>
                        {renderStatus(plant.status_piantina)}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default MyPlants;
