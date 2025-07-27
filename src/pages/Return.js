import React, { useCallback, useState, useEffect, useContext } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { PlantsContext } from "../context/PlantsContext";
import { AuthContext } from "../context/AuthContext";
import { OrdersContext } from "../context/OrdersContext";

const serverDomain =
  process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
    : process.env.REACT_APP_DOMAIN_NAME_SERVER;
console.log("a321", serverDomain);
export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [timer, setTimer] = useState(10);
  const { handleBookedPlant, clearBookedStorage } = useContext(PlantsContext);
  const { setIsAuthenticated, sendPaymentConfirmationEmail } =
    useContext(AuthContext);
  const { postPayment } = useContext(OrdersContext);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const getOut = () => {
    return setTimeout(() => {
      console.log("timeout");
      clearBookedStorage();
      navigate("/map");
    }, 10000);
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    fetch(`${serverDomain}/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        getOut();
      });
  }, []);
  useEffect(() => {
    if (customerEmail) {
      postPayment(customerEmail);
    }
  }, [customerEmail]);
  // useEffect(() => {

  //   if (customerEmail) {
  //     addOrder();
  //     sendPaymentConfirmationEmail(customerEmail);
  //   }
  // }, [customerEmail]);

  if (status === "open") {
    return <Navigate to='/checkout' />;
  }

  if (status === "complete") {
    handleBookedPlant();
    setIsAuthenticated(true);

    return (
      <section class='vh-100 d-flex align-items-center' id='success'>
        <div class='card text-center'>
          <div class='card-header'>Ti Pianto Per Amore</div>
          <div class='card-body'>
            <h5 class='card-title'>Grazie per l'acquisto</h5>
            <p class='card-text'>
              Ci fa molto piacere che tu abbia voluto dare il tuo contributo!
              Stiamo inviando una mail di conferma allindirizzo mail "
              {customerEmail}". In caso di domande contattaci all'indirizzo{" "}
              <a href='mailto:amicidiernestverner@gmail.com'>
                amicidiernestverner@gmail.com
              </a>
              .
            </p>
            <Link
              to='/map'
              class='btn btn-primary'
              onClick={() => clearBookedStorage()}
            >
              Torna alla mappa
            </Link>
          </div>
          <div class='card-footer text-body-secondary'>
            tornerai automaticamente alla mappa tra {timer}
          </div>
        </div>
      </section>
    );
  }

  return null;
};
