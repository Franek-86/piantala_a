import React, { useContext, useEffect, useRef, useState } from "react";
import { MdBackspace } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "./Loading";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Capacitor } from "@capacitor/core";
// import logo from "../assets/images/logo_albero_green.png";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
// import { SiStreamrunners } from "react-icons/si";
import { GrUndo } from "react-icons/gr";
import { toast } from "react-toastify";
import { Keyboard } from "@capacitor/keyboard";
import {
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
  IoMdExit,
} from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";
import { VersionContext } from "../context/VersionContext";
import { MdOutlinePermIdentity } from "react-icons/md";
const Register = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState("");
  const ref = useRef(null);
  // const handleClick = () => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const navigate = useNavigate();
  const { version } = useContext(VersionContext);
  const { regionsLoading, setUserData, userData, handleChange } =
    useContext(AuthContext);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ userData });
  useEffect(() => {
    version();
  });

  const fields = watch();

  const backToLogin = () => {
    localStorage.removeItem("registration");
    setUserData({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      user: "",
      password: "",
      password2: "",
      city: "",
    });
    navigate("/login");
  };

  const formWrapperRef = useRef(null);

  const onSubmit = async (data) => {
    setUserData({ ...userData, ...data });

    navigate("/register2");
  };
  useEffect(() => {
    if (userData.name) {
      setValue("name", userData.name);
    }
    if (userData.lastName) {
      setValue("lastName", userData.lastName);
    }
  }, [userData]);

  return (
    <div className='section-center section-registration min-100 d-lg-flex flex-lg-column align-items-lg-center justify-content-lg-center pt-5 pt-lg-0'>
      <form onSubmit={handleSubmit(onSubmit)} ref={formWrapperRef}>
        <section className='registration-container'>
          {regionsLoading && <Loading />}
          {serverError && <p className='text-danger'>{serverError}</p>}
          {successMessage && <p className='text-success'>{successMessage}</p>}
          {loading && (
            <div className='login-loader-container'>
              <div className='login-loader'></div>
            </div>
          )}
          {/*-----------------------------------------INIZIO INFORMAZIONI DI BASE-------------------------------------------------*/}
          <div className='registration-header d-flex align-items-center mb-4 pt-3 pt-xl-5'>
            <MdOutlinePermIdentity className='fs-1 me-2' />
            <h4 className='m-0 p-0'>Informazioni base</h4>
          </div>

          {/* NOME */}
          <Form.Group className=' mb-3' controlId='formBasicUser'>
            <FloatingLabel controlId='floatingInput' label='Nome' className=''>
              <Form.Control
                autoFocus={true}
                type='text'
                placeholder='Nome'
                disabled={loading}
                name='name'
                value={userData.name}
                {...register("name", {
                  required: "Inserisci nome",
                  maxLength: {
                    value: 15,
                    message: "Il nome può essere di massimo 15 caratteri",
                  },
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FloatingLabel>

            {errors.name && (
              <em className='text-danger small'>{errors?.name?.message}</em>
            )}
          </Form.Group>
          {/*COGNOME */}
          <Form.Group className='mb-3' controlId='formBasicUser'>
            <FloatingLabel
              controlId='floatingInput'
              label='Cognome'
              className=''
            >
              <Form.Control
                type='text'
                placeholder='Cognome'
                disabled={loading}
                name='lastName'
                value={userData.lastName}
                {...register("lastName", {
                  required: "Inserisci cognome",
                  maxLength: {
                    value: 15,
                    message: "Il cognome può essere di massimo 15 caratteri",
                  },
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FloatingLabel>

            {errors.lastName && (
              <em className='text-danger small'>{errors?.lastName?.message}</em>
            )}
          </Form.Group>

          {/* qui */}
          {/* </div> */}
        </section>
        <section className='btn-steps-container'>
          <div
            className='btn-step-container registration step-prev'
            onClick={() => backToLogin()}
          >
            <div className=''>Esci</div>
            <div className='d-flex align-items-center'>
              <IoMdArrowRoundBack className='' />
              <span className='ps-2'>Login page</span>
            </div>
          </div>
          <div className='position-relative btn-step-container registration step-next btn-submit-next'>
            <div className=''>Successivo</div>
            <div className='d-flex flex-row align-items-center justify-content-end'>
              <span className='pe-2'>Contatti</span>
              <IoMdArrowRoundForward className='' />
            </div>
            <input className='test11' type='submit' value='' />
          </div>
        </section>
      </form>
    </div>
  );
};

export default Register;
