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
  const [test, setTest] = useState("");
  const ref = useRef(null);
  // const handleClick = () => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const navigate = useNavigate();
  const { regionsLoading, setUserData, userData, handleChange } =
    useContext(AuthContext);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ userData });
  // React.useEffect(() => {
  //   setError("name", {
  //     type: "manual",
  //     message: "Dont Forget Your Username Should Be Cool!",
  //   });
  // }, [setError]);
  const fields = watch();
  const { name, lastName, gender, city, birthday } = fields;

  const backToLogin = () => {
    localStorage.removeItem("registration");
    setUserData({
      name: "",
      lastName: "",
      birthday: "",
      gender: "",
      email: "",
      phone: "",
      user: "",
      password: "",
      password2: "",
      city: "",
    });
    navigate("/");
  };

  const formWrapperRef = useRef(null);
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") return;

    const onKeyboardShow = (info) => {
      const keyboardHeight = info.keyboardHeight || 300; // fallback height
      if (formWrapperRef.current) {
        formWrapperRef.current.style.paddingBottom = `${keyboardHeight}px`;
      }
    };

    const onKeyboardHide = () => {
      if (formWrapperRef.current) {
        formWrapperRef.current.style.paddingBottom = `3rem`;
      }
    };

    const handleFocus = (e) => {
      setTimeout(() => {
        e.target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300); // wait for keyboard to animate in
    };
    const showSub = Keyboard.addListener("keyboardWillShow", onKeyboardShow);
    const hideSub = Keyboard.addListener("keyboardWillHide", onKeyboardHide);
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => input.addEventListener("focus", handleFocus));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onSubmit = async (data) => {
    setUserData({ ...userData, ...data });

    navigate("/register2");
  };
  useEffect(() => {
    if (userData.name) {
      setValue("name", userData.name);
    }
    if (userData.lastName) {
      setValue("lastName", userData.lastName);
    }
    if (userData.birthday) {
      setValue("birthday", userData.birthday);
    }
    if (userData.gender) {
      setValue("gender", userData.gender);
    }
  }, [userData]);

  return (
    <>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToLogin();
            }}
          />
        </div>
      </div>{" "}
      <section className='section-center mt-5'>
        {regionsLoading && <Loading />}
        {/* <div
        ref={formWrapperRef}
        className='form-wrapper d-flex flex-column pt-5 justify-content-center'
      > */}
        <form onSubmit={handleSubmit(onSubmit)} ref={formWrapperRef}>
          {/* Server error message */}
          {serverError && <p className='text-danger'>{serverError}</p>}
          {successMessage && <p className='text-success'>{successMessage}</p>}
          {loading && (
            <div className='login-loader-container'>
              <div className='login-loader'></div>
            </div>
          )}
          {/*-----------------------------------------INIZIO INFORMAZIONI DI BASE-------------------------------------------------*/}
          <h4 className='mb-5'>
            Informazioni base{" "}
            <span className='small fw-normal fst-italic pag'>(1/5)</span>{" "}
          </h4>

          {/* NOME */}
          <Form.Group className='mb-3' controlId='formBasicUser'>
            <FloatingLabel controlId='floatingInput' label='Nome' className=''>
              <Form.Control
                type='text'
                placeholder='Nome'
                disabled={loading}
                name='name'
                value={userData.name}
                // onChange={handleChange}
                {...register("name", {
                  required: "Inserisci nome",
                  maxLength: {
                    value: 15,
                    message: "Il nome può essere di massimo 15 caratteri",
                  },
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FloatingLabel>

            {errors.name && (
              <em className='text-danger small'>{errors?.name?.message}</em>
            )}
          </Form.Group>
          {/*COGNOME */}
          <Form.Group className='mb-3' controlId='formBasicUser'>
            <FloatingLabel
              controlId='floatingInput'
              label='Cognome'
              className=''
            >
              <Form.Control
                type='text'
                placeholder='Cognome'
                disabled={loading}
                name='lastName'
                value={userData.lastName}
                {...register("lastName", {
                  required: "Inserisci cognome",
                  maxLength: {
                    value: 15,
                    message: "Il cognome può essere di massimo 15 caratteri",
                  },
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FloatingLabel>

            {errors.lastName && (
              <em className='text-danger small'>{errors?.lastName?.message}</em>
            )}
          </Form.Group>
          {/* DATA DI NASCITA */}
          <Form.Group className='mb-4' controlId='formBasicUser'>
            <FloatingLabel
              controlId='floatingInput'
              label='Data di nascita'
              className=''
            >
              <Form.Control
                type='date'
                placeholder='Data di nascita'
                disabled={loading}
                name='birthday'
                value={userData.birthday}
                {...register("birthday", {
                  required: "Inserisci data di nascita",
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FloatingLabel>

            {errors.birthday && (
              <em className='text-danger small'>{errors?.birthday?.message}</em>
            )}
          </Form.Group>
          {/* GENERE */}
          <Form.Group className='mb-3' controlId='formBasicUser'>
            <label htmlFor='' className='mb-2'>
              Genere
            </label>
            <div className='d-flex justify-content-start'>
              <Form.Check
                id='Uomo'
                type='radio'
                label='Uomo'
                value='U'
                checked={userData.gender === "U"}
                disabled={loading}
                name='gender'
                {...register("gender", {
                  required: "Scegli una delle ozioni relative al genere",
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
              <Form.Check
                id='Donna'
                className='ms-3'
                type='radio'
                label='Donna'
                value='F'
                disabled={loading}
                checked={userData.gender === "F"}
                {...register("gender", {
                  required: "Necessario specicare il genere",
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
              <Form.Check
                id='Preferisco non dirlo'
                className='ms-3'
                type='radio'
                label='Preferisco non dirlo'
                value='N'
                checked={userData.gender === "N"}
                disabled={loading}
                {...register("gender", {
                  required: "Necessario specificare il genere",
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </div>
            {errors.gender && (
              <em className='text-danger small font-italic'>
                {errors?.gender?.message}
              </em>
            )}
          </Form.Group>
          {/* <hr className='mb-5' /> */}
          {/*-----------------------------------------FINE INFORMAZIONI DI BASE-------------------------------------------------- */}

          {/* <Button
                onClick={() => handleClick()}
                variant='primary'
                type='submit'
                disabled={loading}
                className='mt-3 btn btn-lg'
              >
                Registrati
              </Button> */}
          <div className='text-end'>
            <button className='btn btn-primary w-25 '>Next</button>
          </div>
        </form>
        {/* </div> */}
      </section>
    </>
  );
};

export default Register;

// <h6 className='mb-4'>
//   Dati di contatto (utilizzare la stessa mail con cui si intende
//   registrarsi)
// </h6>
// <Form.Group className='mb-3' controlId='formBasicEmail'>
//   <FloatingLabel
//     controlId='floatingInput'
//     label='Indirizzo e-mail'
//     className='mb-3'
//   >
//     <Form.Control
//       type='email'
//       placeholder='Inserisci email'
//       disabled={loading}
//       {...register("email", {
//         required: "Email necessaria",
//         pattern: {
//           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//           message: "Invalido formato email",
//         },
//       })}
//     />
//   </FloatingLabel>

//   {errors.email && (
//     <span className='text-danger'>{errors?.email?.message}</span>
//   )}
// </Form.Group>
// <Form.Group className='mb-3' controlId='formBasicPhone'>
//   <FloatingLabel
//     controlId='floatingInput'
//     label='Numero di telefono'
//     className='mb-3'
//   >
//     <Form.Control
//       type='phone'
//       placeholder='Numero di telefono necessario'
//       disabled={loading}
//       {...register("phone", {
//         required: "Numero di telefono necessario",
//       })}
//     />
//   </FloatingLabel>

//   {errors.phone && (
//     <span className='text-danger'>{errors?.phone?.message}</span>
//   )}
// </Form.Group>
// <hr className='mb-5' />
// {/*-----------------------------------------FINE DATI DI CONTATTO------------------------------------------------------ */}
// {/*-----------------------------------------INIZIO INFORMAZIONI PER LA WEBAPP------------------------------------------ */}
// {/* <h6 className='mb-4'>Dati per utilizzo "Ti Pianto Per Amore"</h6>
// {/* NOME UTENTE PIANTAMI */}
// <Form.Group className='my-3' controlId='formBasicUser'>
//   <FloatingLabel
//     controlId='floatingInput'
//     label='Nome utente piantami'
//     className='mb-3'
//   >
//     <Form.Control
//       type='text'
//       // qui
//       placeholder='Nome utente'
//       disabled={loading}
//       {...register("user", {
//         required: "Nome utente necessario",
//         maxLength: {
//           value: 15,
//           message:
//             "Il nome utente può essere di massimo 15 caratteri",
//         },
//       })}
//     />
//   </FloatingLabel>

//   {errors?.user && (
//     <span className='text-danger'>{errors.user.message}</span>
//   )}
// </Form.Group>
// <Form.Group className='mb-3' controlId='formBasicPassword'>
//   <FloatingLabel controlId='floatingPassword' label='Password'>
//     <span
//       className='showHidePassword'
//       onClick={() => setShowPassword1(!showPassword1)}
//     >
//       {showPassword1 ? (
//         <FaEye className='showHidePasswordIcon' />
//       ) : (
//         <FaEyeSlash className='showHidePasswordIcon' />
//       )}
//     </span>
//     <Form.Control
//       type={showPassword1 ? "text" : "password"}
//       placeholder='Password'
//       disabled={loading}
//       {...register("password", {
//         required: "Password necessaria",
//         minLength: {
//           value: 6,
//           message:
//             "La password deve essere di almeno 6 caratteri",
//         },
//       })}
//     />
//   </FloatingLabel>
//   {errors.password && (
//     <span className='text-danger'>
//       {errors?.password?.message}
//     </span>
//   )}
// </Form.Group>
// <Form.Group className='mb-3' controlId='formBasicPassword'>
//   <FloatingLabel
//     controlId='floatingPassword'
//     label='Ripeti Password'
//   >
//     <span
//       className='showHidePassword'
//       onClick={() => setShowPassword2(!showPassword2)}
//     >
//       {showPassword2 ? (
//         <FaEye className='showHidePasswordIcon' />
//       ) : (
//         <FaEyeSlash className='showHidePasswordIcon' />
//       )}
//     </span>
//     <Form.Control
//       type={showPassword2 ? "text" : "password"}
//       placeholder='Password'
//       disabled={loading}
//       {...register("password2", {
//         required: "Password necessaria",
//         minLength: {
//           value: 6,
//           message:
//             "La password deve essere di almeno 6 caratteri",
//         },
//       })}
//     />
//   </FloatingLabel>
//   {errors.password && (
//     <span className='text-danger'>
//       {errors?.password?.message}
//     </span>
//   )}
// </Form.Group>

// <Form.Group className='mb-3' controlId='formBasicUser'>
//   <FloatingLabel
//     controlId='floatingInput'
//     label='Regione di provenienza'
//     className='mb-3'
//   >
//     <Form.Select
//       // type='text'
//       // placeholder='Nato a'
//       disabled={loading || district || city}
//       {...register("region", {
//         required: "Regione necessaria",
//       })}
//     >
//       <option value=''>Seleziona regione</option>
//       {regions?.length > 0 &&
//         regions?.map((i, index) => (
//           <option key={index} value={i.geonameId}>
//             {i.toponymName}
//           </option>
//         ))}
//     </Form.Select>
//   </FloatingLabel>

//   {errors.user && (
//     <span className='text-danger'>{errors?.city?.message}</span>
//   )}
// </Form.Group>
// {region && (
//   <Form.Group className='mb-3' controlId='formBasicUser'>
//     <FloatingLabel
//       controlId='floatingInput'
//       label='Provincia di provenienza'
//       className='mb-3'
//     >
//       <Form.Select
//         // type='text'
//         // placeholder='Nato a'
//         disabled={loading || city}
//         {...register("district", {
//           required: "Provincia necessaria",
//         })}
//       >
//         <option value=''>Seleziona provincia</option>
//         {districts?.length > 0 &&
//           districts?.map((i, index) => (
//             <option key={index} value={i.geonameId}>
//               {i.toponymName}
//             </option>
//           ))}
//       </Form.Select>
//     </FloatingLabel>

//     {errors.user && (
//       <span className='text-danger'>{errors?.city?.message}</span>
//     )}
//   </Form.Group>
// )}
// {district && (
//   <Form.Group className='mb-3' controlId='formBasicUser'>
//     <FloatingLabel
//       controlId='floatingInput'
//       label='Comune di nascita'
//       className='mb-3'
//     >
//       <Form.Select
//         // type='text'
//         // placeholder='Nato a'
//         disabled={loading}
//         {...register("city", {
//           required: "Comune necessario",
//         })}
//       >
//         <option value=''>Seleziona comune</option>
//         {cities?.length > 0 &&
//           cities?.map((i, index) => (
//             <option key={index} value={i.toponymName}>
//               {i.toponymName}
//             </option>
//           ))}
//       </Form.Select>
//     </FloatingLabel>

//     {errors.user && (
//       <span className='text-danger'>{errors?.city?.message}</span>
//     )}
//   </Form.Group>
// )}

// const onSubmit = async (data) => {
//   setLoading(true);

//   const password = watch("password");
//   const password2 = watch("password2");
//   if (password !== password2) {
//     toast.error("Le password inserite non corrispondono", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       // transition: Bounce,
//     });
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await registerUser(data);

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

// const backToLogin = () => {
//   navigate("/");
// };

// const formWrapperRef = useRef(null);
// useEffect(() => {
//   if (Capacitor.getPlatform() === "web") return;

//   const onKeyboardShow = (info) => {
//     const keyboardHeight = info.keyboardHeight || 300; // fallback height
//     if (formWrapperRef.current) {
//       formWrapperRef.current.style.paddingBottom = `${keyboardHeight}px`;
//     }
//   };

//   const onKeyboardHide = () => {
//     if (formWrapperRef.current) {
//       formWrapperRef.current.style.paddingBottom = `3rem`;
//     }
//   };

//   const handleFocus = (e) => {
//     setTimeout(() => {
//       e.target.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }, 300); // wait for keyboard to animate in
//   };
//   const showSub = Keyboard.addListener("keyboardWillShow", onKeyboardShow);
//   const hideSub = Keyboard.addListener("keyboardWillHide", onKeyboardHide);
//   const inputs = document.querySelectorAll("input, textarea");
//   inputs.forEach((input) => input.addEventListener("focus", handleFocus));

//   return () => {
//     showSub.remove();
//     hideSub.remove();
//   };
// }, []);
// useEffect(() => {
//   if (name && lastName && gender && city && birthday) {
//     setDisabled(false);
//   } else {
//     setDisabled(true);
//   }
// }, [name, lastName, gender, city, birthday]);
