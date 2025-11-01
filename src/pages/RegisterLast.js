import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

// --

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import moment from "moment/moment";
import { MdBackspace } from "react-icons/md";

const RegisterLast = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { reset, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  //
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

  const onSubmit = async () => {
    setLoading(true);

    try {
      const response = await registerUser(userData);

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
          }
        );
        reset();

        // setIsRegister(false);
        setTimeout(() => {
          setSuccessMessage("");
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
  const birthday = userData?.birthday;
  return (
    <>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              back();
            }}
          />
        </div>
      </div>{" "}
      <section className='section-center mt-5'>
        <h4 className='mb-5'>
          Verifica i tuoi dati{" "}
          <span className='small fw-normal fst-italic pag'>(5/5)</span>
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListGroup>
            <ListGroup.Item>
              Nome: <span>{userData?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Cognome: <span>{userData?.lastName}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Data di nascita: <span>{moment(birthday).format("L")}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Genere:{" "}
              <span>
                {userData?.gender === "U"
                  ? "Uomo"
                  : userData?.gender === "F"
                  ? "Donna"
                  : "Preserisco non dirlo"}
              </span>
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
          <div className='mt-3'>
            <button type='submit' className='btn btn-primary w-100 my-3'>
              Registrati
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegisterLast;
