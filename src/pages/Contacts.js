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
import BackBtn from "../components/menu/BackBtn";

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
      <div className='section-page section-background   section-full-page section-orders section-large page-large-container'>
        <BackBtn />
        {loading && <Loading />}

        <div className='section-page'>
          <div className='mb-3'>
            <section className='plate-background'>
              <div className='section-center'>
                <h2 className='section-title pt-5'>I nostri contatti</h2>
                <div className='contacts-form-section d-flex align-items-lg-center'>
                  <div className='contacts-main-container d-flex flex-column flex-lg-row align-items-center flex-lg-row-reverse p-xl-5'>
                    <article className='contact-info w-100 p-lg-3 p-xl-4'>
                      <h4>Hai domande?</h4>
                      <p>
                        Per entrare in contatto con noi ti invitiamo a compilare
                        il form, cosi facendo invierai una mail alla casella di
                        posta di "tipiantoperamore".
                      </p>
                      <p>
                        Saremo felici di leggere e ti informiamo che normalmente
                        intercorre una settimana di tempo prima di ricevere una
                        nostra risposta.
                      </p>
                      <p>Non esitare a contattarci!</p>
                    </article>
                    <article className='contact-form w-100 p-lg-3 p-xl-4'>
                      <Form
                        className='contact-form-container'
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                              className='contact-form-email'
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
                          className='contact-form-input mb-3'
                          controlId='exampleForm.ControlTextarea1'
                        >
                          <Form.Control
                            className='contact-form-input'
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
                        <div className=''>
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
                  </div>
                </div>
              </div>
            </section>

            <section className='contacts-info-section py-4 py-lg-5'>
              <div className='section-center'>
                {" "}
                <h4>Chiamaci, scrivici o vienici a trovare</h4>
              </div>
              <div className='section-center contacts-box-info'>
                <div className='d-flex flex-column h-75 justify-content-center'>
                  <div className='d-flex flex-column flex-xl-row p-xl-5 justify-content-between'>
                    <article className='me-xl-1 contacts-info-item contacts-location mb-3 d-flex align-items-center d-flex flex-column'>
                      <span className='contacts-location-icon pb-3'>
                        <IoLocationSharp />{" "}
                      </span>
                      <span> contrada gravinella, 60 Fasano</span>
                    </article>
                    <article className='me-xl-1 contacts-info-item  contacts-email mb-3 d-flex align-items-center d-flex flex-column'>
                      <span className='contacts-location-icon pb-3'>
                        <MdEmail />
                      </span>
                      <span> tipiantoperamore@gmail.com </span>
                    </article>
                    <article className='contacts-info-item  contacts-email mb-3 d-flex align-items-center d-flex flex-column'>
                      <span className='contacts-location-icon pb-3'>
                        <MdLocalPhone />
                      </span>
                      <span>+39 3485384563</span>
                    </article>
                    {/* <div className='contacts-phone mb-3 d-flex align-items-center'>
              <span className='contacts-location-icon pe-3'>
                <MdLocalPhone />
              </span>
              <span> +39 3485384563</span>
            </div> */}
                  </div>
                </div>
              </div>
            </section>
            <section className='contacts-social-section py-4 py-lg-5 position-background'>
              <div className='section-center'>
                <h4>Seguici sui nostri canali</h4>
                <div className='d-flex align-items-center'>
                  <div className='contacts-social-container d-flex flex-column flex-xl-row justify-content-around align-items-center w-100'>
                    <article className='contacts-social-icon pb-4'>
                      <a
                        target='_blank'
                        href='https://www.instagram.com/tipiantoperamore?igsh=MWY5cTFhZWJ2NXM2eQ=='
                      >
                        {" "}
                        <FaInstagram />
                      </a>
                    </article>
                    <article className='contacts-social-icon pb-4'>
                      <a
                        target='_blank'
                        href='https://www.facebook.com/ti.pianto.per.amore/'
                      >
                        {" "}
                        <FaFacebookF />
                      </a>
                    </article>
                    <article className='contacts-social-icon pb-4'>
                      <a target='_blank' href='  https://x.com/Amici_ErnestV'>
                        {" "}
                        <FaXTwitter />
                      </a>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
