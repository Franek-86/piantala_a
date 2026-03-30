import React, { useContext, useState, useEffect } from "react";

import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdBackspace } from "react-icons/md";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

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
    <>
      {/* <div className='section-center invisible'>
        <div className='back-btn'>
          <MdBackspace />
        </div>
      </div> */}
      <section className='section-registration min-100  d-flex align-items-center justify-content-center'>
        <div className='section-center registration-container'>
          <h4 className='mb-5'>Dati di contatto</h4>
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
                    required: "Inserisci indirizzo e-mail",
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
                    required: "Inserisci numero di telefono",
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
            <article className='btn-steps-container'>
              <div
                className='btn-step-container registration step-prev'
                onClick={back}
              >
                <div className=''>Indietro</div>
                <div className='d-flex align-items-center'>
                  <IoMdArrowRoundBack className='' />
                  <span className='ps-2'>Info base</span>
                </div>
              </div>
              <div className='position-relative btn-step-container registration step-next btn-submit-next'>
                <div className=''>Successivo</div>
                <div className='d-flex flex-row align-items-center justify-content-end'>
                  <span className='pe-2'>Info app</span>
                  <IoMdArrowRoundForward className='' />
                </div>
                <input className='test11' type='submit' value='' />
              </div>
            </article>
            {/* <div className='d-flex justify-content-between mt-5'>
            <button
              onClick={back}
              type='button'
              className='me-3 btn btn-primary w-50'
            >
              <div className='d-flex align-items-center justify-content-center'>
                <GrFormPreviousLink className='fs-5 me-2' />
                Info base
              </div>
            </button>
            <button type='submit' className='ms-3 btn btn-primary w-50'>
              <div className='d-flex align-items-center justify-content-center'>
                {" "}
                Info app
                <GrFormNextLink className='fs-5 ms-2' />
              </div>
            </button>
          </div> */}
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterTwo;
