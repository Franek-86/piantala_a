import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logo from "../assets/images/logo_albero_green.png";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
// import { SiStreamrunners } from "react-icons/si";
import { GrUndo } from "react-icons/gr";
const AuthForm = () => {
  const {
    setUserRole,
    setIsRegister,
    isRegister,
    login,
    setIsAuthenticated,
    getCities,
    cities,
    generateFiscalCode,
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
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

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
  const generateCF = async () => {
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
        const data = { name, lastName, gender, city, year, month, day };
        const response = await generateFiscalCode(data);
        if (response && response !== "error") {
          setValue("fiscalCode", response);
        }
      }
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const validateFiscalCode = async (cf) => {
    const response = await checkFiscalCode(cf);
    if (response === "Codice fiscale valido") {
      console.log("Codice fiscale valido");
      return true;
    }
    console.log("errore codice fiscale:", response);
    return false;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (isRegister) {
      console.log("aooooooooooooo");
      const isValid = await validateFiscalCode(data.fiscalCode);
      if (!isValid) {
        setLoading(false);
        return;
      }
    }

    try {
      const response = await login(data);

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
              Login
            </Button>

            <Form.Text className='text-muted ms-3'>
              {isRegister ? "Hai già un account?" : "Non hai un account?"}
              <Button
                className='pt-1'
                variant='link'
                disabled={loading}
                onClick={() => navigate("/register")}
              >
                Registati
              </Button>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
