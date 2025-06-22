import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { PlantsContext } from "../context/PlantsContext";

const PlantForm = () => {
  const { userId } = useContext(AuthContext);
  const { plantId } = useParams();
  console.log("test", plantId);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // const date = new Date().toLocaleDateString("it-IT");
    // console.log("poi", date);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    console.log("currentDate", currentDate);

    data.id = parseInt(plantId);
    data.owner_id = userId;
    data.purchase_date = currentDate;
    localStorage.setItem("booked-plant", JSON.stringify(data));
    navigate("/checkout");
  };
  return (
    <article className='plant-form-article mt-3 w-100 pb-5'>
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
          </Form.Select>
          {errors.plantType && (
            <p className='text-danger'>È necessario selezionare una pianta</p>
          )}
        </FloatingLabel>
        <FloatingLabel
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
        </FloatingLabel>
        <button className='btn btn-success' type='submit'>
          Procedi con il pagamento
        </button>
      </Form>
    </article>
  );
};

export default PlantForm;
