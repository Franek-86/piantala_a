import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/images/logo_albero_green.png";
import { SiStreamrunners } from "react-icons/si";
import { GrUndo } from "react-icons/gr";
const AuthForm = () => {
  const {
    login,
    setUserRole,
    setIsRegister,
    isRegister,
    loginOrRegister,
    setIsAuthenticated,
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
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fiscalData, setFiscalData] = useState(null);
  const [validating, setValidating] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [cities, setCities] = useState([]);
  // console.log("azx", cities);
  const navigate = useNavigate();
  // id italia Id=3169778
  // id puglia Id=3169778
  // id bari Id=3182350

  const fields = watch();
  const { name, lastName, gender, city, birthday } = fields;
  useEffect(() => {
    if (name && lastName && gender && city && birthday) {
      console.log("12321", name);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, lastName, gender, city, birthday]);
  const generateCF = () => {
    const fields = watch();
    const { name, lastName, gender, city, birthday } = fields;
    console.log("f", fields);
    if (name && lastName && gender && city && birthday) {
      console.log("12321");
      console.log("ciao", name, lastName, gender, city, birthday);
      console.log("stanno", birthday);

      const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = birthday.match(regex);

      if (match) {
        const year = match[1]; // "1986"
        const month = match[2]; // "12"
        const day = match[3]; // "27"

        console.log("Year:", year);
        console.log("Month:", month);
        console.log("Day:", day);
        const generate = async () => {
          try {
            const response = await axios.get(
              `http://api.miocodicefiscale.com/calculate?lname=${lastName}&fname=${name}&gender=${gender}&city=${city}&state=BA&day=${day}&month=${month}&year=${year}&access_token=${process.env.REACT_APP_CF_KEY}`
            );
            if (!response.data.status) {
              console.log("t1", response.data.message);
              return;
            }
            const cf = response.data.data.cf;
            setValue("fiscalCode", cf);
          } catch (error) {
            console.error("Something went wrong", error);
          }
        };
        generate();
      }
    }

    // http://api.miocodicefiscale.com/calculate?lname={cognome}&fname={nome}&gender={sesso}&city={luogo-di-nascita}&state={codice-provincia}&abolished={comune-soppresso}&day={giorno-di-nascita}&month={mese-di-nascita}&year={anno-di-nascita}&omocodia_level={livello-omocodia}&access_token={tua-chiave-API}
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://api.geonames.org/childrenJSON?geonameId=3182350&username=franek"
        );
        if (response) {
          let data = response.data.geonames;
          console.log("azx", cities);
          setCities(data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);
  const validateFiscalCode = async (cf) => {
    setValidating(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CF_URL}?cf=${cf}&access_token=${process.env.REACT_APP_CF_KEY}`
      );
      if (response.data.status) {
        clearErrors("fiscalCode");
        return true;
      } else {
        return "Codice fiscale non valido";
      }
    } catch (error) {
      return "Errore di validazione";
    } finally {
      setValidating(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const isValid = await validateFiscalCode(data.fiscalCode);
    if (!isValid) {
      setLoading(false);
      return;
    }
    try {
      const response = await loginOrRegister(data);

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
          navigate("/map");

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
    <Container
      className={`d-flex flex-column py-5 justify-content-center ${
        !isRegister ? "vh-100" : ""
      }`}
    >
      {!isRegister && (
        <div className='logo-container ms-auto me-auto pb-5'>
          <img src={logo} class='img-fluid' alt='Responsive image'></img>
        </div>
      )}
      <Row className='d-flex justify-content-center'>
        <Col className='col-xs-8 col-sm-7'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Server error message */}
            {serverError && <p className='text-danger'>{serverError}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}
            {loading && (
              <div className='login-loader-container'>
                <div className='login-loader'></div>
              </div>
            )}
            {isRegister && (
              <>
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
                      {cities?.map((i, index) => (
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
                    <span className='text-danger'>
                      {errors?.gender?.message}
                    </span>
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
                    <span className='text-danger'>
                      {errors?.phone?.message}
                    </span>
                  )}
                </Form.Group>
              </>
            )}
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
                      message: "La password deve essere di almeno 6 caratteri",
                    },
                  })}
                />
              </FloatingLabel>
              {errors.password && (
                <span className='text-danger'>{errors?.password?.message}</span>
              )}
            </Form.Group>

            <Button variant='primary' type='submit' disabled={loading}>
              {loading ? "Loading" : isRegister ? "Registrati" : "Login"}
            </Button>

            <Form.Text className='text-muted ms-3'>
              {isRegister ? "Hai già un account?" : "Non hai un account?"}
              <Button
                className='pt-1'
                variant='link'
                disabled={loading}
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Registrati"}
              </Button>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
