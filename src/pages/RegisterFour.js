import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { MdBackspace } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { FaTreeCity } from "react-icons/fa6";
import { toast } from "react-toastify";
const RegisterFour = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { registerUser, handleChange } = useContext(AuthContext);
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  const {
    cities,
    districts,
    regions,
    getDistricts,
    getCities,
    userData,
    setUserData,
  } = useContext(AuthContext);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const back = () => {
    navigate("/register3");
  };
  const fields = watch();
  const { name, lastName, region, district, gender, city, birthday } = fields;
  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    localStorage.setItem("registration", JSON.stringify(userData));
    navigate("/register5");
  };

  //   setUserData({ ...userData, ...data });
  //   // const password = watch("password");
  //   // const password2 = watch("password2");
  //   // if (password !== password2) {
  //   //   toast.error("Le password inserite non corrispondono", {
  //   //     position: "top-right",
  //   //     autoClose: 3000,
  //   //     hideProgressBar: false,
  //   //     closeOnClick: false,
  //   //     pauseOnHover: true,
  //   //     draggable: true,
  //   //     progress: undefined,
  //   //     theme: "light",
  //   //     // transition: Bounce,
  //   //   });
  //   //   setLoading(false);
  //   //   return;
  //   // }

  //   try {
  //     const response = await registerUser(userData);

  //     if (response.status === 201 || response.status === 200) {
  //       setSuccessMessage("Richiesta inviata");
  //       toast(
  //         "🌱 Controlla la tua casella di posta per completare la registrazione.",
  //         {
  //           position: "top-right",
  //           autoClose: 10000,
  //           hideProgressBar: false,
  //           closeOnClick: false,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           className: "toastify-registration-succeed",
  //           // transition: Bounce,
  //         }
  //       );
  //       reset();

  //       // setIsRegister(false);
  //       setTimeout(() => {
  //         setSuccessMessage("");
  //       }, 3000);

  //       setIsAuthenticated(true);
  //     }
  //   } catch (error) {
  //     const message = error.response?.data?.message || "Server error";
  //     toast(`${message}`, {
  //       position: "top-right",
  //       autoClose: 10000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       // transition: Bounce,
  //     });
  //     setServerError(error.response?.data?.message || "Autenticazione fallita");
  //     setTimeout(() => {
  //       setServerError("");
  //     }, 3000); // Clear error message after 3 seconds
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const backToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (region) {
      getDistricts(region);
    }
  }, [region]);
  useEffect(() => {
    if (district) {
      getCities(district);
    }
  }, [district]);

  return (
    <>
      <div className='section-center section-registration min-100 d-lg-flex flex-lg-column align-items-lg-center  justify-content-lg-center pt-5 pt-lg-0'>
        <form onSubmit={handleSubmit(onSubmit)} controlId='formBasicUser'>
          <section className='registration-container'>
            <div className='registration-header d-flex align-items-center mb-4 pt-3 pt-xl-5'>
              <FaTreeCity className='fs-1 me-2' />
              <h4 className='m-0 p-0'>Comune di residenza</h4>
            </div>
            {/* RESIDENZA */}

            {userData.city ? (
              <Form.Group className='mb-3' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Comune di residenza'
                  className='mb-3'
                >
                  <Form.Select
                    // type='text'
                    // placeholder='Nato a'
                    disabled={loading}
                    {...register("city", {
                      required: "Seleziona il comune di residenza",
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    // value={userData.city}
                  >
                    <option value=''>Seleziona regione e provincia</option>

                    <option selected>{userData.city}</option>
                  </Form.Select>
                </FloatingLabel>

                {errors.city && (
                  <span className='text-danger'>{errors?.city?.message}</span>
                )}
              </Form.Group>
            ) : (
              <>
                <Form.Group className='mb-3' controlId='formBasicUser'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Regione'
                    className='mb-3'
                  >
                    <Form.Select
                      disabled={loading || district || city}
                      {...register("region", {
                        required: "Selezionare la regione di residenza",
                      })}
                    >
                      <option value=''>Seleziona regione</option>
                      {regions?.length > 0 &&
                        regions?.map((i, index) => (
                          <option key={index} value={i.geonameId}>
                            {i.toponymName}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>

                  {errors.region && (
                    <span className='text-danger'>
                      {errors?.region?.message}
                    </span>
                  )}
                </Form.Group>
                {region ? (
                  <Form.Group className='mb-3' controlId='formBasicUser'>
                    <FloatingLabel
                      controlId='floatingInput'
                      label='Provincia'
                      className='mb-3'
                    >
                      <Form.Select
                        // type='text'
                        // placeholder='Nato a'
                        disabled={loading || city}
                        {...register("district", {
                          required: "Selezionare la provincia di residenza",
                        })}
                      >
                        <option value=''>Seleziona provincia</option>
                        {districts?.length > 0 &&
                          districts?.map((i, index) => (
                            <option key={index} value={i.geonameId}>
                              {i.toponymName}
                            </option>
                          ))}
                      </Form.Select>
                    </FloatingLabel>

                    {errors.district && (
                      <span className='text-danger'>
                        {errors?.district?.message}
                      </span>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <FloatingLabel
                      controlId='floatingInput'
                      label='Provincia'
                      className='mb-3'
                    >
                      <Form.Select
                        // type='text'
                        // placeholder='Nato a'
                        disabled='true'
                      >
                        <option value=''>seleziona prima la regione</option>
                        {/* {districts?.length > 0 &&
                  districts?.map((i, index) => (
                    <option key={index} value={i.geonameId}>
                      {i.toponymName}
                    </option>
                  ))} */}
                      </Form.Select>
                    </FloatingLabel>
                    {errors.district && (
                      <span className='text-danger'>
                        {errors?.district?.message}
                      </span>
                    )}
                  </Form.Group>
                )}
                {district ? (
                  <Form.Group className='mb-3' controlId='formBasicUser'>
                    <FloatingLabel
                      controlId='floatingInput'
                      label='Comune'
                      className='mb-3'
                    >
                      <Form.Select
                        // type='text'
                        // placeholder='Nato a'
                        disabled={loading}
                        {...register("city", {
                          required: "Selezionare il comune di residenza",
                          onChange: (e) => {
                            handleChange(e);
                          },
                        })}
                        value={userData.city}
                      >
                        <option value=''>Seleziona comune</option>
                        {cities?.length > 0 &&
                          cities?.map((i, index) => (
                            <option key={index} value={i.toponymName}>
                              {i.toponymName}
                            </option>
                          ))}
                      </Form.Select>
                    </FloatingLabel>

                    {errors.city && (
                      <span className='text-danger'>
                        {errors?.city?.message}
                      </span>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <FloatingLabel
                      controlId='floatingInput'
                      label='Comune di residenza'
                      className='mb-3'
                    >
                      <Form.Select disabled='true' value={userData.city}>
                        <option value=''>seleziona prima la provincia</option>
                        {/* {cities?.length > 0 &&
                  cities?.map((i, index) => (
                    <option key={index} value={i.toponymName}>
                      {i.toponymName}
                    </option>
                  ))} */}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                )}
              </>
            )}
          </section>
          <section className='btn-steps-container'>
            <div
              className='btn-step-container registration step-prev'
              onClick={back}
            >
              <div className=''>Indietro</div>
              <div className='d-flex align-items-center'>
                <IoMdArrowRoundBack className='' />
                <span className='ps-2'>info-app</span>
              </div>
            </div>
            <div className='position-relative btn-step-container registration step-next btn-submit-next'>
              <div className=''>Successivo</div>
              <div className='d-flex flex-row align-items-center justify-content-end'>
                <span className='pe-2'>verifica dati</span>
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

export default RegisterFour;
