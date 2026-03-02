import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../context/AuthContext";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaLess } from "react-icons/fa";
import { useEffect } from "react";

const Terms = ({ id, page }) => {
  const navigate = useNavigate();
  const {
    showTerms,
    setShowTerms,
    handleCloseTerms,
    googleAfterTerms,
    payload,
    setPayload,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const terms = watch("terms");
  useEffect(() => {
    setPayload({ ...payload, terms });
  }, [terms]);

  const onSubmit = (e) => {
    const terms = e.terms;
    if (terms === true) {
      setShowTerms(false);
      googleAfterTerms(navigate, id, page);
    }
    // if (!test) {
    //   setError("ciao");
    // }
  };
  return (
    <Modal show={showTerms}>
      <Modal.Header>
        <Modal.Title>
          Termini di Servizio & Informativa sulla Privacy
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          Per poter accedere è necessario prima accettare in basso i{" "}
          <Link target='_blank' to='/terms'>
            Termini di Servizio e l'Informativa sulla Privacy.
          </Link>
          <div className='my-3'>
            <Form.Check
              id='terms'
              name='terms'
              label={
                <span>
                  Accetto i Termini di Servizio e l'Informativa sulla Privacy.
                </span>
              }
              {...register("terms", { required: true })}
            />
            {errors.terms && (
              <span className='text-danger small fst-italic'>
                Accettare per registrarsi
              </span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseTerms}>
            Chiudi
          </Button>
          <Button
            type='submit'
            variant='primary'
            onClick={(e) => handleSubmit(e)}
          >
            Registrati
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Terms;
