import React from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GiLion } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "react-bootstrap";

const Contacts = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <section className='section-background section-full-page'>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <section className='section-page section-background d-flex flex-column justify-content-between'>
          <article className='mb-5'>
            <div className='section-center'>
              <h2 className='section-title'>I nostri contatti</h2>
              <Form>
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
                    placeholder='Come possiamo aiutarti? Servizio momentaneamente non attivo.'
                    as='textarea'
                    rows={4}
                  />
                </Form.Group>
                <div className='d-flex justify-content-center mb-5'>
                  <Button className='w-100 text-align-center' variant='primary'>
                    Invia mail
                  </Button>
                </div>
              </Form>
            </div>
          </article>
          <article className=''>
            <h5 className='my-5 text-center'>Seguici</h5>
            <div className='contacts-socials-container d-flex justify-content-center'>
              <div className='social-icons-center d-flex justify-content-around align-items-center w-75'>
                <div className='contacts-social-icon'>
                  <a target='_blank' href='  https://x.com/Amici_ErnestV'>
                    {" "}
                    <FaXTwitter />
                  </a>
                </div>
                <div className='contacts-social-icon'>
                  <a target='_blank' href='https://www.ernestverner.it/'>
                    {" "}
                    <GiLion />
                  </a>
                </div>
                <div className='contacts-social-icon'>
                  <a
                    target='_blank'
                    href='https://www.instagram.com/_amici_di_ernest_verner_/'
                  >
                    {" "}
                    <FaInstagram />
                  </a>
                </div>
                <div className='contacts-social-icon'>
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
