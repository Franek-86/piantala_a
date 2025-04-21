import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logo from "../assets/images/logo_albero_green.png";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
import Loading from "./Loading";
// import { SiStreamrunners } from "react-icons/si";
import { GrUndo } from "react-icons/gr";
import { toast } from "react-toastify";

const Reset = () => {
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
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/");
  };
  const onSubmit = (data) => {
    console.log(data);
    resetPassword(data);
    reset();
  };
  const { resetPassword, emailLoading } = useContext(AuthContext);

  return (
    <>
      {emailLoading && <Loading />}
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToLogin();
            }}
          />
        </div>
      </div>
      <Container className={`d-flex flex-column py-5 justify-content-center`}>
        <div className='logo-container ms-auto me-auto pb-5'>
          <img src={logo} class='img-fluid' alt='Responsive image'></img>
        </div>

        <Row className='d-flex justify-content-center'>
          <Col className='col-xs-8 col-sm-7'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Server error message */}
              {/* {loading && (
              <div className='login-loader-container'>
                <div className='login-loader'></div>
              </div>
            )} */}
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Indirizzo e-mail'
                  className='mb-3'
                >
                  <Form.Control
                    type='email'
                    placeholder='Inserisci email'
                    // disabled={loading}
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
              <div className='d-flex justify-content-center'>
                <Button
                  className='d-block w-100'
                  variant='primary'
                  type='submit'
                  // disabled={loading}
                >
                  Invia mail
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reset;
