import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EmailVerificationReset = () => {
  const { token } = useParams();
  console.log(token);
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    test();
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const navigate = useNavigate();
  const test = () => {
    return setTimeout(() => {
      navigate(`/passwordReset/${token}`);
    }, 5000);
  };

  return (
    <section className='section section-center'>
      <p>
        Verifica del'indirizzo mail avvenuta con successo, puoi adesso resettare
        la tua password
      </p>
      <p>
        Clicca in basso per resettare la tua password o attendi {timer} secondi
        per essere reinderizzato automaticamente.
      </p>
      <a href={`/passwordReset/${token}`}>pagina password reset</a>
    </section>
  );
};

export default EmailVerificationReset;
