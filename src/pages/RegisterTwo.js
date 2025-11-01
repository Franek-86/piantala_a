import React, { useContext, useState, useEffect } from "react";

import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const RegisterTwo = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { setUserData, userData, handleChange, checkEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setUserData({ ...userData, ...data });
    if (userData.email) {
      const email = userData.email;
      const check = await checkEmail({ email });
      if (check.data.message === "User not registered") {
        navigate("/register3");
      } else if (check.data.message === "User already registered") {
        setError("email", {
          type: "error",
          message: "Indirizzo e-mail già registrato",
        });
        return;
      } else {
        setError("email", {
          type: "error",
          message:
            "Email già registrata e in attesa di essere verificata, controlla la tua casella di posta",
        });
      }
    }
  };
  useEffect(() => {
    if (userData.email) {
      setValue("email", userData.email);
    }
    if (userData.phone) {
      setValue("phone", userData.phone);
    }
  }, [userData]);
  const back = () => {
    navigate("/register");
  };
  return (
    <section className='section-center d-flex flex-column justify-content-center vh-100'>
      <h4 className='mb-4'>
        Dati di contatto{" "}
        <span className='small fw-normal fst-italic pag'>(2/5)</span>
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mobile */}
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <FloatingLabel
            controlId='floatingInput'
            label='Indirizzo e-mail'
            className=''
          >
            <Form.Control
              type='email'
              placeholder='Inserisci email'
              disabled={loading}
              name='email'
              value={userData.email}
              {...register("email", {
                required: "Email necessaria",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalido formato email",
                },
                onChange: (e) => {
                  handleChange(e);
                },
              })}
            />
          </FloatingLabel>
          {errors?.email && (
            <em className='text-danger small'>{errors?.email?.message}</em>
          )}
        </Form.Group>
        {/* Mobile */}
        <Form.Group className='mb-3' controlId='formBasicPhone'>
          <FloatingLabel
            controlId='floatingInput'
            label='Numero di telefono'
            className=''
          >
            <Form.Control
              type='phone'
              placeholder='Numero di telefono necessario'
              disabled={loading}
              name='phone'
              value={userData.phone}
              {...register("phone", {
                required: "Numero di telefono necessario",
                onChange: (e) => {
                  handleChange(e);
                },
              })}
            />
          </FloatingLabel>
          {errors?.phone && (
            <em className='text-danger small'>{errors?.phone?.message}</em>
          )}
        </Form.Group>
        <div className='d-flex justify-content-between'>
          <button onClick={back} type='button' className='btn btn-primary w-25'>
            Prev
          </button>
          <button type='submit' className='btn btn-primary w-25'>
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterTwo;
