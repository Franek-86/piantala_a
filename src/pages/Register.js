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
const Register = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const ref = useRef(null);
  const handleClick = () => {
    console.log("sta");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  const {
    setUserRole,
    setIsRegister,
    isRegister,
    registerUser,
    setIsAuthenticated,
    cities,
    districts,
    regions,
    getDistricts,
    generateFiscalCode,
    getCities,
    regionsLoading,
    validateFiscalCode: checkFiscalCode,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    watch,
    clearErrors,
  } = useForm();
  const fields = watch();
  const { name, lastName, region, district, gender, city, birthday } = fields;

  const backToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (region) {
      console.log("region", region);
      getDistricts(region);
    }
  }, [region]);
  useEffect(() => {
    if (district) {
      console.log("district", district);
      getCities(district);
    }
  }, [district]);
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") return;

    const showSub = Keyboard.addListener("keyboardWillShow", () => {
      document.body.classList.add("keyboard-open");
    });

    const hideSub = Keyboard.addListener("keyboardWillHide", () => {
      document.body.classList.remove("keyboard-open");
    });

    const handleFocus = (e) => {
      setTimeout(() => {
        e.target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300); // wait for keyboard to animate in
    };

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => input.addEventListener("focus", handleFocus));

    return () => {
      inputs.forEach((input) =>
        input.removeEventListener("focus", handleFocus)
      );
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // console.log("aaa", fields);
  useEffect(() => {
    if (name && lastName && gender && city && birthday) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, lastName, gender, city, birthday]);
  const generateCF = async () => {
    const fields = watch();
    const { name, lastName, gender, city, birthday } = fields;
    console.log("f", fields);
    if (name && lastName && gender && city && birthday) {
      const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = birthday.match(regex);

      if (match) {
        const year = match[1]; // "1986"
        const month = match[2]; // "12"
        const day = match[3]; // "27"

        const data = { name, lastName, gender, city, year, month, day };
        const response = await generateFiscalCode(data);
        if (response && response !== "error") {
          setValue("fiscalCode", response);
        }
      }
    }
  };

  const validateFiscalCode = async (cf) => {
    const response = await checkFiscalCode(cf);
    if (response === "Codice fiscale valido") {
      return true;
    }

    return false;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const password = watch("password");
    const password2 = watch("password2");
    if (password !== password2) {
      toast.error("Le password inserite non corrispondono", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      setLoading(false);
      return;
    }

    const isValid = await validateFiscalCode(data.fiscalCode);
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(data);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Richiesta inviata");
        toast(
          "🌱 Controlla la tua casella di posta per completare la registrazione.",
          {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toastify-registration-succeed",
            // transition: Bounce,
          }
        );
        reset();

        // setIsRegister(false);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsAuthenticated(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast(`${message}`, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      setServerError(error.response?.data?.message || "Autenticazione fallita");
      setTimeout(() => {
        setServerError("");
      }, 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      {regionsLoading && <Loading />}
      <div className='section-center'>
        <div className='back-btn' ref={ref}>
          <MdBackspace
            onClick={() => {
              backToLogin();
            }}
          />
        </div>
      </div>
      <Container className='form-wrapper d-flex flex-column py-5 justify-content-center'>
        <Row className='d-flex justify-content-center'>
          <Col className='col-xs-8 col-sm-7'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Server error message */}
              {serverError && <p className='text-danger'>{serverError}</p>}
              {successMessage && (
                <p className='text-success'>{successMessage}</p>
              )}
              {loading && (
                <div className='login-loader-container'>
                  <div className='login-loader'></div>
                </div>
              )}

              <Form.Group className='mb-3' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Nome'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    placeholder='Nome'
                    disabled={loading}
                    {...register("name", {
                      required: "Nome necessario",
                      maxLength: {
                        value: 15,
                        message: "Il nome può essere di massimo 15 caratteri",
                      },
                    })}
                  />
                </FloatingLabel>

                {errors.user && (
                  <span className='text-danger'>{errors?.name?.message}</span>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Cognome'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    placeholder='Cognome'
                    disabled={loading}
                    {...register("lastName", {
                      required: "Cognome necessario",
                      maxLength: {
                        value: 15,
                        message:
                          "Il cognome può essere di massimo 15 caratteri",
                      },
                    })}
                  />
                </FloatingLabel>

                {errors.user && (
                  <span className='text-danger'>
                    {errors?.lastName?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Regione di provenienza'
                  className='mb-3'
                >
                  <Form.Select
                    // type='text'
                    // placeholder='Nato a'
                    disabled={loading || district || city}
                    {...register("region", {
                      required: "Regione necessaria",
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

                {errors.user && (
                  <span className='text-danger'>{errors?.city?.message}</span>
                )}
              </Form.Group>
              {region && (
                <Form.Group className='mb-3' controlId='formBasicUser'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Provincia di provenienza'
                    className='mb-3'
                  >
                    <Form.Select
                      // type='text'
                      // placeholder='Nato a'
                      disabled={loading || city}
                      {...register("district", {
                        required: "Provincia necessaria",
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

                  {errors.user && (
                    <span className='text-danger'>{errors?.city?.message}</span>
                  )}
                </Form.Group>
              )}
              {district && (
                <Form.Group className='mb-3' controlId='formBasicUser'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Comune di nascita'
                    className='mb-3'
                  >
                    <Form.Select
                      // type='text'
                      // placeholder='Nato a'
                      disabled={loading}
                      {...register("city", {
                        required: "Comune necessario",
                      })}
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

                  {errors.user && (
                    <span className='text-danger'>{errors?.city?.message}</span>
                  )}
                </Form.Group>
              )}
              <Form.Group className='mb-4' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Data di nascita'
                  className='mb-3'
                >
                  <Form.Control
                    type='date'
                    placeholder='Data di nascita'
                    disabled={loading}
                    {...register("birthday", {
                      required: "Data di nascita necessaria",
                    })}
                  />
                </FloatingLabel>

                {errors.user && (
                  <span className='text-danger'>
                    {errors?.birthday?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicUser'>
                {/* <FloatingLabel
                      controlId='floatingInput'
                      label='Gender'
                      className='mb-3'
                    > */}
                <label htmlFor='' className='mb-2'>
                  Sesso
                </label>
                <div className='d-flex justify-content-start mb-3'>
                  <Form.Check
                    type='radio'
                    label='Maschio'
                    value='M'
                    disabled={loading}
                    {...register("gender", {
                      required: "Necessario specificare il sesso",
                    })}
                  />
                  <Form.Check
                    className='ms-3'
                    type='radio'
                    label='Femmina'
                    value='F'
                    disabled={loading}
                    {...register("gender", {
                      required: "Necessario specicare il sesso",
                    })}
                  />
                </div>
                {/* </FloatingLabel> */}

                {errors.user && (
                  <span className='text-danger'>{errors?.gender?.message}</span>
                )}
              </Form.Group>
              <Form.Group className='' controlId='formBasicUser'>
                <div className='d-flex w-100 mt-4 mb-3'>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Codice Fiscale'
                    className='w-100'
                  >
                    <Form.Control
                      className='cf-input'
                      type='text'
                      placeholder='Codice fiscale'
                      disabled={loading}
                      {...register("fiscalCode", {
                        required: "Codice fiscale necessario",
                        maxLength: {
                          value: 17,
                          message: "codice fiscale errato",
                        },
                        validate: validateFiscalCode,
                      })}
                    />
                  </FloatingLabel>
                  <Button
                    disabled={disabled}
                    className='cf-Btn'
                    type='button'
                    onClick={() => generateCF()}
                  >
                    <GrUndo />
                    {/* <SiStreamrunners /> */}
                  </Button>
                </div>
                {errors.user && (
                  <span className='text-danger'>
                    {errors?.fiscalCode?.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className='my-3' controlId='formBasicUser'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Nome utente piantami'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    // qui
                    placeholder='Nome utente'
                    disabled={loading}
                    {...register("user", {
                      required: "Nome utente necessario",
                      maxLength: {
                        value: 15,
                        message:
                          "Il nome utente può essere di massimo 15 caratteri",
                      },
                    })}
                  />
                </FloatingLabel>

                {errors?.user && (
                  <span className='text-danger'>{errors.user.message}</span>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPhone'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Numero di telefono'
                  className='mb-3'
                >
                  <Form.Control
                    type='phone'
                    placeholder='Numero di telefono necessario'
                    disabled={loading}
                    {...register("phone", {
                      required: "Numero di telefono necessario",
                    })}
                  />
                </FloatingLabel>

                {errors.phone && (
                  <span className='text-danger'>{errors?.phone?.message}</span>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <FloatingLabel controlId='floatingPassword' label='Password'>
                  <span
                    className='showHidePassword'
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? (
                      <FaEye className='showHidePasswordIcon' />
                    ) : (
                      <FaEyeSlash className='showHidePasswordIcon' />
                    )}
                  </span>
                  <Form.Control
                    type={showPassword1 ? "text" : "password"}
                    placeholder='Password'
                    disabled={loading}
                    {...register("password", {
                      required: "Password necessaria",
                      minLength: {
                        value: 6,
                        message:
                          "La password deve essere di almeno 6 caratteri",
                      },
                    })}
                  />
                </FloatingLabel>
                {errors.password && (
                  <span className='text-danger'>
                    {errors?.password?.message}
                  </span>
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
                      <FaEye className='showHidePasswordIcon' />
                    ) : (
                      <FaEyeSlash className='showHidePasswordIcon' />
                    )}
                  </span>
                  <Form.Control
                    type={showPassword2 ? "text" : "password"}
                    placeholder='Password'
                    disabled={loading}
                    {...register("password2", {
                      required: "Password necessaria",
                      minLength: {
                        value: 6,
                        message:
                          "La password deve essere di almeno 6 caratteri",
                      },
                    })}
                  />
                </FloatingLabel>
                {errors.password && (
                  <span className='text-danger'>
                    {errors?.password?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Indirizzo e-mail'
                  className='mb-3'
                >
                  <Form.Control
                    type='email'
                    placeholder='Inserisci email'
                    disabled={loading}
                    {...register("email", {
                      required: "Email necessaria",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalido formato email",
                      },
                    })}
                  />
                </FloatingLabel>

                {errors.email && (
                  <span className='text-danger'>{errors?.email?.message}</span>
                )}
              </Form.Group>

              <Button
                onClick={() => handleClick()}
                variant='primary'
                type='submit'
                disabled={loading}
              >
                Registrati
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
