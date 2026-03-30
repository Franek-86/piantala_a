import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { MdBackspace } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const RegisterThree = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserData, userData, handleChange } = useContext(AuthContext);

  // const ref = useRef(null);
  // const handleClick = () => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const navigate = useNavigate();
  const back = () => {
    navigate("/register2");
  };
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  // const fields = watch();
  // const { name, lastName, region, district, gender, city, birthday } = fields;
  const onSubmit = (data) => {
    setLoading(true);
    const password = watch("password");
    const password2 = watch("password2");
    if (password !== password2) {
      setError("password2", {
        type: "error",
        message: "Le password non corrispondono",
      });
      setLoading(false);
      return;
    }
    setUserData({ ...userData, ...data });
    navigate("/register4");
  };
  // const backToLogin = () => {
  //   navigate("/");
  // };
  useEffect(() => {
    if (userData.user) {
      setValue("user", userData.user);
    }
    if (userData.password) {
      setValue("password", userData.password);
    }
    if (userData.password2) {
      setValue("password2", userData.password2);
    }
  }, [userData]);

  return (
    <>
      {/* <div className='section-center invisible'>
        <div className='back-btn'>
          <MdBackspace />
        </div>
      </div> */}
      <section className='section-registration min-100  d-flex align-items-center justify-content-center'>
        <div className='section-center registration-container'>
          <h4 className='mb-5'>Informazioni "Ti Pianto Per Amore"</h4>
          {/* NOME UTENTE PIANTAMI */}
          <form
            className='my-3'
            onSubmit={handleSubmit(onSubmit)}
            controlId='formBasicUser'
          >
            <Form.Group className='mb-3' controlId='formBasicUser'>
              <FloatingLabel
                controlId='floatingInput'
                label='Nome utente'
                className=''
              >
                <Form.Control
                  type='text'
                  name='user'
                  placeholder='Nome utente'
                  disabled={loading}
                  value={userData.user}
                  {...register("user", {
                    required: "Inserisci nome utente",
                    maxLength: {
                      value: 15,
                      message:
                        "Il nome utente può essere di massimo 15 caratteri",
                    },
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FloatingLabel>
              {errors?.user && (
                <em className='text-danger small'>{errors.user.message}</em>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <FloatingLabel controlId='floatingPassword' label='Password'>
                <span
                  className='showHidePassword'
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? (
                    <FaEyeSlash className='showHidePasswordIcon' />
                  ) : (
                    <FaEye className='showHidePasswordIcon' />
                  )}
                </span>
                <Form.Control
                  type={showPassword1 ? "text" : "password"}
                  placeholder='Password'
                  disabled={loading}
                  name='password'
                  value={userData.password}
                  {...register("password", {
                    required: "Inserisci password",
                    minLength: {
                      value: 6,
                      message: "La password deve essere di almeno 6 caratteri",
                    },
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FloatingLabel>
              {errors.password && (
                <em className='text-danger small'>
                  {errors?.password?.message}
                </em>
              )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <FloatingLabel
                controlId='floatingPassword'
                label='Ripeti Password'
              >
                <span
                  className='showHidePassword'
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? (
                    <FaEyeSlash className='showHidePasswordIcon' />
                  ) : (
                    <FaEye className='showHidePasswordIcon' />
                  )}
                </span>
                <Form.Control
                  type={showPassword2 ? "text" : "password"}
                  placeholder='Password'
                  name='password2'
                  disabled={loading}
                  value={userData.password2}
                  {...register("password2", {
                    required: "Inserisci password",
                    minLength: {
                      value: 6,
                      message: "La password deve essere di almeno 6 caratteri",
                    },
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FloatingLabel>
              {errors.password2 && (
                <em className='text-danger small'>
                  {errors?.password2?.message}
                </em>
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
                  <span className='ps-2'>contatti</span>
                </div>
              </div>
              <div className='position-relative btn-step-container registration step-next btn-submit-next'>
                <div className=''>Successivo</div>
                <div className='d-flex flex-row align-items-center justify-content-end'>
                  <span className='pe-2'>residenza</span>
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
                contatti
              </div>
            </button>
            <button type='submit' className='ms-3 btn btn-primary w-50'>
              <div className='d-flex align-items-center justify-content-center'>
                {" "}
                Residenza
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

export default RegisterThree;
