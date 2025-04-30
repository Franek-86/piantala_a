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
const Contacts = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  const { register, handleSubmit, reset } = useForm();
  const { sendEmail, loading } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data.messageBody);
    const response = await sendEmail(data.messageBody);

    if (response?.status === 200) {
      reset();
    }
  };
  return (
    <section className='section-background section-full-page'>
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
      <div className='section-center'>
        <section className='section-page section-background'>
          <article className='mb-3'>
            <div className='section-center menu-section-center'>
              <h2 className='section-title'>I nostri contatti</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* <h5 className='mb-3'>Scrivici una mail (non attivo)</h5> */}
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  {/* <Form.Label>La tua mail</Form.Label> */}
                  {/* <Form.Control type='email' placeholder='la tua mail' /> */}
                </Form.Group>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlTextarea1'
                >
                  <Form.Control
                    placeholder='Come possiamo aiutarti?'
                    as='textarea'
                    {...register("messageBody", { minLength: 2 })}
                    rows={4}
                  />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                  <Button
                    className='w-100 text-align-center'
                    variant='primary'
                    type='submit'
                  >
                    Invia mail
                  </Button>
                </div>
              </Form>
            </div>
          </article>
          <hr />
          <article className='my-3'>
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
              <span> amicidiernestverner@gmail.com </span>
            </div>
            <div className='contacts-phone mb-3 d-flex align-items-center'>
              <span className='contacts-location-icon pe-3'>
                <MdLocalPhone />
              </span>
              <span> +39 3485384563</span>
            </div>
          </article>
          <hr />
          <article className='d-flex align-items-center mt-3'>
            <span className='text-center'>Seguici</span>
            <div className='contacts-socials-container'>
              <div className='social-icons-center d-flex justify-content-around align-items-center w-75'>
                <div className='contacts-social-icon ps-3'>
                  <a target='_blank' href='  https://x.com/Amici_ErnestV'>
                    {" "}
                    <FaXTwitter />
                  </a>
                </div>
                <div className='contacts-social-icon ps-3'>
                  <a target='_blank' href='https://www.ernestverner.it/'>
                    {" "}
                    <GiLion />
                  </a>
                </div>
                <div className='contacts-social-icon ps-3'>
                  <a
                    target='_blank'
                    href='https://www.instagram.com/_amici_di_ernest_verner_/'
                  >
                    {" "}
                    <FaInstagram />
                  </a>
                </div>
                <div className='contacts-social-icon ps-3'>
                  <a
                    target='_blank'
                    href='https://www.facebook.com/amicidiernestverner?locale=it_IT'
                  >
                    {" "}
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
};

export default Contacts;
