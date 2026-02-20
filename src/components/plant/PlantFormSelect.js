import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
const PlantFormSelect = () => {
  const { userId } = useContext(AuthContext);
  const { handleTypeUpdate } = useContext(PlantsContext);
  const { plantId } = useParams();
  console.log("test", plantId);
  const container = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("aaa1", data);
    const type = data.plantType;
    handleTypeUpdate(type, plantId);
  };

  return (
    <article ref={container} className='plant-form-article mt-3 w-100'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel
          controlId='formPlantType'
          label='Tipo di pianta'
          className='mb-3'
        >
          <Form.Select {...register("plantType", { required: true })}>
            <option value=''>Seleziona una pianta</option>
            <option value='Bagolaro'>Bagolaro</option>
            <option value='Carrubo'>Carrubo</option>
            <option value='Cercis'>Cercis</option>
            <option value='Quercia Vallonea'>Quercia Vallonea</option>
            <option value='Alloro'>Alloro</option>
            <option value='Pino Halepensis'>Pino Halepensis</option>
            <option value='Tamarice'>Tamarice</option>
            <option value='Melocotogno'>Melocotogno</option>
            <option value='Mandorlo'>Mandorlo</option>
            <option value='Tiglio'>Tiglio</option>
            <option value='Noce'>Noce</option>
            <option value='Platano'>Platano</option>
            <option value='Mirto'>Mirto</option>
            <option value='Crespo'>Crespo</option>
          </Form.Select>
          {errors.plantType && (
            <p className='text-danger'>È necessario selezionare una pianta</p>
          )}
        </FloatingLabel>
        {/* <FloatingLabel
          controlId='formComment'
          label='Testo targa'
          className='mb-3'
        >
          <Form.Control
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
        </FloatingLabel> */}
        <button className='btn btn-success' type='submit'>
          salva
        </button>
      </Form>
    </article>
  );
};

export default PlantFormSelect;
