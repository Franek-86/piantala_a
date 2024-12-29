import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/images/logo_albero_green.png";
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
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginOrRegister(data);
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        console.log("sta1");
        if (isRegister) {
          console.log("sta1-2");
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
          console.log("sta1-3");

          const { token, user } = response.data;
          let userRole = user.role;
          setUserRole(userRole);
          localStorage.setItem("userToken", token);
        }
      }
    } catch (error) {
      console.log("sta2");
      setServerError(error.response?.data?.message || "Autenticazione fallita");
      setTimeout(() => {
        setServerError("");
      }, 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='vh-100 d-flex flex-column justify-content-center'>
      <div className='logo-container ms-auto me-auto pb-5'>
        <img src={logo} class='img-fluid' alt='Responsive image'></img>
      </div>
      <Row className='d-flex justify-content-center'>
        <Col className='col-xs-8 col-sm-7'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Server error message */}
            {serverError && <p className='text-danger'>{serverError}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}

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
                <span className='text-danger'>{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <FloatingLabel controlId='floatingPassword' label='Password'>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  disabled={loading}
                  {...register("password", {
                    disabled: { loading },
                    required: "Password necessaria",
                    minLength: {
                      value: 6,
                      message: "La password deve essere di almeno 6 caratteri",
                    },
                  })}
                />
              </FloatingLabel>
              {errors.password && (
                <span className='text-danger'>{errors.password.message}</span>
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
