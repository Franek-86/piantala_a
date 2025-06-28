import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmailVerification = () => {
  // const [timer, setTimer] = useState(5);
  // useEffect(() => {
  //   test();
  //   const interval = setInterval(() => {
  //     setTimer(timer - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [timer]);
  const navigate = useNavigate();
  // const test = () => {
  //   return setTimeout(() => {
  //     navigate("/");
  //   }, 5000);
  // };
  const { verificationEmail } = useContext(AuthContext);

  const { token } = useParams();
  useEffect(() => {
    const getResponse = async () => {
      const response = await verificationEmail(token);
      if (response.status === 200) {
        navigate("/");
      }
    };
    getResponse();
    return () => {};
  }, []);

  return (
    <section className='section section-center'>
      {/* <p>
        Verifica del'indirizzo mail avvenuta con successo e registrazione
        completata
      </p>
      <p>
        Clicca in basso per andare alla pagina di login o attendi {timer}{" "}
        secondi per essere reinderizzato automaticamente.
      </p>
      <a href='/'>pagina login</a> */}
    </section>
  );
};

export default EmailVerification;
