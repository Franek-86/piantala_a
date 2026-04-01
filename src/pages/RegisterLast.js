import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import moment from "moment/moment";
import { MdBackspace, MdDangerous } from "react-icons/md";
import TermsOfService from "./TermsOfService";
import { Form } from "react-bootstrap";
import { BsPatchCheckFill } from "react-icons/bs";
const RegisterLast = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const {
    regionsLoading,
    setUserData,
    userData,
    handleChange,
    setIsAuthenticated,
    registerUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const back = () => {
    navigate("/register4");
  };

  const onSubmit = async (e) => {
    let terms = e?.terms;

    if (terms !== "accepted") {
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(userData, terms);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Richiesta inviata");
        toast(
          "🌱 Controlla la tua casella di posta per completare la registrazione.",
          {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toastify-registration-succeed",
            // transition: Bounce,
          },
        );
        reset();

        // setIsRegister(false);
        setTimeout(() => {
          setSuccessMessage("");
          localStorage.removeItem("registration");
          setUserData({
            name: "",
            lastName: "",
            email: "",
            phone: "",
            user: "",
            password: "",
            password2: "",
            city: "",
          });
          navigate("/login-form");
        }, 10000);

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
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='registration-container section-center mt-4'>
          <div className='registration-header d-flex align-items-center mb-4 pt-3 pt-xl-5'>
            <BsPatchCheckFill className='fs-1 me-2' />
            <h4 className='m-0 p-0'>Verifica i tuoi dati</h4>
          </div>
          <ListGroup>
            <ListGroup.Item>
              Nome: <span>{userData?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Cognome: <span>{userData?.lastName}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              E-mail: <span>{userData?.email}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Numero di telefono: <span>{userData?.phone}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Nome utente: <span>{userData?.user}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Password:{" "}
              <span>
                <input
                  type={showPassword ? "text" : "password"}
                  readOnly='true'
                  value={userData?.password}
                  className='resume-input'
                />
              </span>
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <FaEyeSlash className='showHidePasswordReview' />
                ) : (
                  <FaEye className='showHidePasswordReview' />
                )}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              Comune di residenza: <span>{userData?.city}</span>
            </ListGroup.Item>
          </ListGroup>
          <Form.Check
            id='terms'
            name='terms'
            type='checkbox'
            value='accepted'
            label={
              <Link className='small' to='/terms'>
                Termini e condizioni
              </Link>
            }
            {...register("terms", { required: true })}
            className='mt-3'
          />
          {errors.terms && (
            <span className='text-danger small fst-italic'>
              Necessario accettare per completare la registrazione
            </span>
          )}
        </section>
        {!loading && !successMessage && (
          <section className='section-center registration-buttons-container'>
            <div className='mt-3'>
              <Link
                to={"/register4"}
                type='submit'
                className='btn btn-outline-primary w-100 my-2'
              >
                Modifica i dati
              </Link>
            </div>
            <div className=''>
              <button type='submit' className='btn btn-primary w-100 mt-1'>
                Registrati
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default RegisterLast;
