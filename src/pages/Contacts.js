import React from "react";
import { useForm } from "react-hook-form";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTruckLoading } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GiLion } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import Loading from "./Loading";
import { UsersContext } from "../context/UsersContext";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";

const Contacts = () => {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { isAuthenticated } = useContext(AuthContext);
  const { sendEmail, loading } = useContext(UsersContext);
  const onSubmit = async (data) => {
    console.log(data.messageBody);

    const response = await sendEmail(data);

    if (response?.status === 200) {
      reset();
    }
  };
  return (
    <div className='d-flex flex-row'>
      {isLargeScreen && <SideBar />}
      <div className='section-page section-background section-full-page section-orders section-large page-large-container'>
        <div className='back-container'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
        </div>
        {loading && <Loading />}

        <section className='section-page section-background'>
          <div className='section-center menu-section-center mb-3'>
            <h2 className='section-title'>I nostri contatti</h2>
            <section className='contacts-form-section d-flex flex-column flex-lg-row flex-lg-row-reverse'>
              <article className='contact-info w-100 p-lg-3 p-xl-4'>
                <h4>Hai domande?</h4>
                <p>
                  Per entrare in contatto con noi ti invitiamo a compilare il
                  form, cosi facendo invierai una mail alla casella di posta di
                  "tipiantoperamore".
                </p>
                <p>
                  Saremo felici di leggere e ti informiamo che normalmente
                  intercorre una settimana di tempo prima di ricevere una nostra
                  risposta.
                </p>
                <p>Non esitare a contattarci!</p>
              </article>
              <article className='contact-form w-100 p-lg-3 p-xl-4'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* <h5 className='mb-3'>Scrivici una mail (non attivo)</h5> */}

                  {!isAuthenticated && (
                    <Form.Group
                      className='mb-3'
                      controlId='exampleForm.ControlTextarea1'
                    >
                      <Form.Control
                        type='email'
                        placeholder='Inserisci il tuo indirizzo mail'
                        disabled={loading}
                        {...register("email", {
                          required: "inserisci indirizzo mail",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          },
                        })}
                      />
                      {errors.email && (
                        <em className='text-danger small'>
                          {errors.email?.message}
                        </em>
                      )}
                    </Form.Group>
                  )}
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Control
                      placeholder='Come possiamo aiutarti?'
                      disabled={loading}
                      as='textarea'
                      {...register("messageBody", {
                        required: "inserisci un messaggio",
                        minLength: 2,
                        message: "test",
                      })}
                      rows={4}
                    />
                    {errors.messageBody && (
                      <em className='text-danger small'>
                        {errors.messageBody?.message}
                      </em>
                    )}
                  </Form.Group>
                  <div className='d-flex justify-content-center'>
                    <Button
                      disabled={loading}
                      className='w-100 text-align-center'
                      variant='primary'
                      type='submit'
                    >
                      Invia mail
                    </Button>
                  </div>
                </Form>
              </article>
            </section>

            <hr />
            <section className='contact-info-section my-3'>
              <div className='contacts-location mb-3 d-flex align-items-center'>
                <span className='contacts-location-icon pe-3'>
                  <IoLocationSharp />{" "}
                </span>
                <span> contrada gravinella, 60 Fasano</span>
              </div>
              <div className='contacts-email mb-3 d-flex align-items-center'>
                <span className='contacts-location-icon pe-3'>
                  <MdEmail />
                </span>
                <span> tipiantoperamore@gmail.com </span>
              </div>
              {/* <div className='contacts-phone mb-3 d-flex align-items-center'>
              <span className='contacts-location-icon pe-3'>
                <MdLocalPhone />
              </span>
              <span> +39 3485384563</span>
            </div> */}
            </section>
            <hr />
            <section className='contact-social-section d-flex align-items-center mt-3'>
              <span className='text-center'>Seguici sui nostri canali</span>
              <div className='contacts-socials-container'>
                <div className='social-icons-center d-flex justify-content-around align-items-center w-75'>
                  {/* <div className='contacts-social-icon ps-3'>
                  <a target='_blank' href='  https://x.com/Amici_ErnestV'>
                    {" "}
                    <FaXTwitter />
                  </a>
                </div> */}

                  <div className='contacts-social-icon ps-3'>
                    <a
                      target='_blank'
                      href='https://www.instagram.com/tipiantoperamore?igsh=MWY5cTFhZWJ2NXM2eQ=='
                    >
                      {" "}
                      <FaInstagram />
                    </a>
                  </div>
                  <div className='contacts-social-icon ps-3'>
                    <a
                      target='_blank'
                      href='https://www.facebook.com/ti.pianto.per.amore/'
                    >
                      {" "}
                      <FaFacebookF />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contacts;
