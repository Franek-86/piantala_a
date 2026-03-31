import React, { useContext, useState, useEffect } from "react";

import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdBackspace } from "react-icons/md";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { MdImportContacts } from "react-icons/md";
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
      <div className='section-registration min-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center pt-5 pt-lg-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='section-center registration-container'>
            <div className='registration-header d-flex align-items-center mb-5 mb-lg-4'>
              <MdImportContacts className='fs-1 me-2' />
              <h4 className='m-0 p-0'>Contatti</h4>
            </div>
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
          </section>
          <section className='btn-steps-container'>
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
          </section>
        </form>
      </div>
    </>
  );
};

export default RegisterTwo;
