import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { PlantsContext } from "../context/PlantsContext";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { PlantsContext } from "../../context/PlantsContext";
import { MdPayment } from "react-icons/md";
import LoginReg from "../registration/LoginReg";
const PlantForm = () => {
  const { userId, userRole, isAuthenticated, setLogReg, logReg } =
    useContext(AuthContext);
  const { deletePlant } = useContext(PlantsContext);
  const { plantId } = useParams();
  const container = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!isAuthenticated) {
      // let date = new Date();
      // let day = date.getDate();
      // let month = date.getMonth() + 1;
      // let year = date.getFullYear();
      // let currentDate = `${year}-${month}-${day}`;

      // data.id = parseInt(plantId);
      // data.owner_id = userId;
      // data.purchase_date = currentDate;
      // localStorage.setItem("booked-plant", JSON.stringify(data));
      setLogReg(true);
      return;
    }
    // const date = new Date().toLocaleDateString("it-IT");
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    data.id = parseInt(plantId);
    data.owner_id = userId;
    data.purchase_date = currentDate;
    localStorage.setItem("booked-plant", JSON.stringify(data));
    navigate("/checkout");
  };
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") return;
    const onKeyboardShow = (info) => {
      const keyboardHeight = info.keyboardHeight || 300;
      container.current.style.paddingBottom = `${keyboardHeight}px`;
    };
    const onKeyboardHide = (info) => {
      container.current.style.paddingBottom = `3rem`;
    };

    Keyboard.addListener("keyboardWillShow", onKeyboardShow);
    Keyboard.addListener("keyboardWillHide", onKeyboardHide);
    const input = document.querySelector("textarea");
    const onFocus = (e) => {
      setTimeout(() => {
        e.target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    };

    input.addEventListener("focus", onFocus);

    return () => {
      Keyboard.removeAllListeners();
    };
  });
  const deleteAndGo = async (plantId) => {
    // setSinglePlantLoading(true);
    try {
      await deletePlant(plantId);
    } catch (err) {
      // setSinglePlantLoading(false);
    } finally {
      navigate("/map");
      // setSinglePlantLoading(false);
    }
  };
  return (
    <>
      <section
        id='payment'
        ref={container}
        className='mt-3 mt-lg-5 section-plant-form position-background'
      >
        <div className='section-plant section-center'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <span className='pt-5 h5 d-flex flex-row align-items-center'>
              <div className='step-title pb-2 pe-1'>
                <MdPayment />
              </div>
              Infomazioni sul pagamento
            </span>
            <article className='plant-payment-info'>
              <p>
                Il <b>prezzo</b> di una piantina è di <b>200 euro</b> ed
                include:
                <ul>
                  <li>la messa a dimora dell'albero</li>
                  <li>la realizzazione e stampa della targa</li>
                  <li>la piantumazione entro 6 mesi dalla richiesta </li>
                  <li>l'iscrizione all'associazione Amici di Ernest Verner.</li>
                </ul>{" "}
              </p>
              <p>
                La <b>tipologia di albero</b> sarà concordata con i competenti
                uffici del Comune e resa visibile online sia nella tua scheda di
                acquisto che su questa stessa pagina.
              </p>
              <p>
                Procedendo con il pagamento verrai reindirizzato sulla
                piattaforma di pagamento.
              </p>
            </article>
            <article className='plant-payment mt-5 d-flex justify-content-center'>
              <button
                className={!logReg ? "d-block btn btn-success" : "d-none"}
                type='submit'
              >
                Procedi con il pagamento
              </button>
            </article>
          </Form>
        </div>
        {logReg && <LoginReg val='plant' id={plantId} />}
      </section>
      {userRole === "admin" && (
        <>
          <hr />
          <h5 className='mb-3'>Operazioni di amministrazione</h5>
          <button
            className='btn btn-dark '
            onClick={() => deleteAndGo(plantId)}
          >
            Elimina segnalazione
          </button>
        </>
      )}
    </>
  );
};

export default PlantForm;
