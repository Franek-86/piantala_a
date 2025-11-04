import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { PlantsContext } from "../context/PlantsContext";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { PlantsContext } from "../../context/PlantsContext";
const PlantForm = () => {
  const { userId, userRole } = useContext(AuthContext);
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
      <article ref={container} className='plant-form-article mt-3 w-100'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel
            controlId='formComment'
            label='Testo targa'
            className='textPlateContainer mb-3'
          >
            <Form.Control
              className='textPlate'
              as='textarea'
              rows={3}
              {...register("comment", { required: true, maxLength: 500 })}
            />
            {errors.comment && (
              <p className='text-danger'>
                È necessario un testo da inserire nella targa, il testo deve
                essere di meno di 500 caratteri.
              </p>
            )}
          </FloatingLabel>
          <button className='btn btn-success' type='submit'>
            Procedi con il pagamento
          </button>
        </Form>
      </article>
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
