import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    // validateFiscalCode: checkFiscalCode,
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
  // const onSubmit = async (data) => {
  //   setLoading(true);
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
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   setUserData({ ...userData, [name]: value });
  // };
  // useEffect(() => {
  //   if (userData.city) {
  //     setValue("city", userData.city);
  //   }
  // }, [userData]);

  return (
    <section className='section-center mt-5'>
      {/* Server error message */}
      {serverError && <p className='text-danger'>{serverError}</p>}
      {successMessage && <p className='text-success'>{successMessage}</p>}
      {loading && (
        <div className='login-loader-container'>
          <div className='login-loader'></div>
        </div>
      )}
      <h4 className='mb-4'>
        Informazioni aggiuntive{" "}
        <span className='small fw-normal fst-italic pag'>(4/5)</span>
      </h4>
      <form
        className='my-3'
        onSubmit={handleSubmit(onSubmit)}
        controlId='formBasicUser'
      >
        {/* RESIDENZA */}

        {userData.city ? (
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
                label='Regione di provenienza'
                className='mb-3'
              >
                <Form.Select
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

              {errors.region && (
                <span className='text-danger'>{errors?.region?.message}</span>
              )}
            </Form.Group>
            {region ? (
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
                  label='Provincia di provenienza'
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
                  label='Comune di nascita'
                  className='mb-3'
                >
                  <Form.Select
                    // type='text'
                    // placeholder='Nato a'
                    disabled={loading}
                    {...register("city", {
                      required: "Comune necessario",
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
                  <span className='text-danger'>{errors?.city?.message}</span>
                )}
              </Form.Group>
            ) : (
              <Form.Group>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Comune di nascita'
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

        <div className='d-flex justify-content-between'>
          <button onClick={back} type='button' className='btn btn-primary w-25'>
            Prev
          </button>
          <button type='submit' className='btn btn-primary w-50'>
            Verifica dati
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterFour;
