import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { MdBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/images/ti pianto per amore-APP-verde.png";
import { toast } from "react-toastify";
import Loading from "./Loading";
const PasswordReset = () => {
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
  useEffect(() => {
    reset();
  }, []);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  const backToLogin = () => {
    navigate("/");
  };
  const { newPassword, pswLoading } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log("cc", data.password);
    let psw = data.password1;
    const password = watch("password1");
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
      reset();
      return;
    }
    let newData = { psw, token };

    const response = await newPassword(newData);
    if (response === "ok") {
      navigate("/");
    }
  };

  return (
    <>
      {pswLoading === true && <Loading />}
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
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <FloatingLabel
                  controlId='floatingPasswordFirst'
                  label='Nuova password'
                >
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    // disabled={loading}
                    {...register("password1", {
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
                  controlId='floatingPasswordSecond'
                  label='Ripeti Password'
                >
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    // disabled={loading}
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

              <div className='d-flex justify-content-center'>
                <Button
                  className='d-block w-100'
                  variant='primary'
                  type='submit'
                  // disabled={loading}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordReset;
