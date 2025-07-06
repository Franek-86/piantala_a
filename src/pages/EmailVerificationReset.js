import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EmailVerificationReset = () => {
  const { token } = useParams();
  console.log("a12345", token);
  const { verificationEmailPasswordReset } = useContext(AuthContext);
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
  //     navigate(`/passwordReset/${token}`);
  //   }, 5000);
  // };

  // useEffect(() => {
  //   const getResponse = async () => {
  //     try {
  //       const response = await verificationEmail(token);
  //       if (response?.status === 200) {
  //         navigate("/");
  //       } else {
  //         console.log(
  //           "verification status is diffferent then 200 but we have a result anyway"
  //         );
  //       }
  //     } catch (e) {
  //       console.log("API call catched an error and is the following:");
  //     }
  //   };
  //   getResponse();
  //   return () => {};
  // }, []);

  useEffect(() => {
    // /reset-password/verify/:token
    const getResponse = async () => {
      try {
        const response = await verificationEmailPasswordReset(token);
        if (response?.status === 200) {
          navigate(`/passwordReset/${token}`);
        }
      } catch (error) {
        console.log("error during verification email password reset", error);
      }
    };
    getResponse();
    return;
  }, []);

  return (
    <section className='section section-center'>
      <p>
        Verifica del'indirizzo mail avvenuta con successo, puoi adesso resettare
        la tua password
      </p>
      {/* <p>
        Clicca in basso per resettare la tua password o attendi {timer} secondi
        per essere reinderizzato automaticamente.
      </p> */}
      <a href={`/passwordReset/${token}`}>pagina password reset</a>
    </section>
  );
};

export default EmailVerificationReset;
