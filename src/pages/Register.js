import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "./Loading";
// import logo from "../assets/images/logo_albero_green.png";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
// import { SiStreamrunners } from "react-icons/si";
import { GrUndo } from "react-icons/gr";
const Register = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
  // console.log("aaa", regions);
  // console.log("aab", districts);
  // console.log("aac", cities);

  // useEffect(() => {
  //   getCities();
  // }, []);

  const validateFiscalCode = async (cf) => {
    const response = await checkFiscalCode(cf);
    if (response === "Codice fiscale valido") {
      return true;
    }

    return false;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const isValid = await validateFiscalCode(data.fiscalCode);
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(data);

      if (response.status === 201 || response.status === 200) {
        if (isRegister) {
          setSuccessMessage(
            "Controlla la tua casella di posta per completare la registrazione."
          );
          reset();
          setIsRegister(false);
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          setIsAuthenticated(true);
          // navigate("/map");

          const { token, user } = response.data;
          let userRole = user.role;
          setUserRole(userRole);
          localStorage.setItem("userToken", token);
        }
      }
    } catch (error) {
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
      <Container className='d-flex flex-column py-5 justify-content-center'>
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
                    disabled={loading}
                    {...register("region", {
                      required: "Regione necessaria",
                    })}
                  >
                    <option value=''>Seleziona regione</option>
                    {regions?.length > 0 &&
                      regions?.map((i, index) => (
                        <option key={index} value={i.geonameId}>
                          {i.adminName1}
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
                      disabled={loading}
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
                      required: "Necessario specicare il sesso",
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
                  <Form.Control
                    type='password'
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

              <Button variant='primary' type='submit' disabled={loading}>
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
