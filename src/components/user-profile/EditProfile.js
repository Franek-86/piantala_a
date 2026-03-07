import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { UsersContext } from "../../context/UsersContext";
import { useForm, SubmitHandler } from "react-hook-form";
const EditProfile = () => {
  const {
    getUserInfo,
    showEdit,
    handleCloseEdit,
    loggedUserInfo: { id },
    formField,
    updateUserProfile,
    setLoggedUserInfo,
    loggedUserInfo,
  } = useContext(UsersContext);
  const [editUserInfo, setEditUserInfo] = useState({ ...loggedUserInfo });
  console.log("test", editUserInfo);
  const { userName, phone } = editUserInfo;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("sta????", data);
    updateUserProfile(data);
    getUserInfo(id);
    handleCloseEdit();
  };

  const handleChange = (e) => {
    console.log("ciao", e);
  };
  console.log("watch name", watch("name"));

  let name = watch("name");
  useEffect(() => {
    setEditUserInfo({ ...editUserInfo, userName: name?.name });
  }, [name]);
  let number = watch("phone");
  useEffect(() => {
    setEditUserInfo({ ...editUserInfo, phone: number?.number });
  }, [number]);

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>
              {formField === "phone" ? "Numero di telefono" : "Nome utente"}
            </Form.Label>
            <Form.Control
              type='text'
              // placeholder='name@example.com'
              value={formField === "phone" ? phone : userName}
              onChange={(e) => handleChange(e)}
              {...register(formField, {
                required: true,
                maxLength: 15,
                minLength: 2,
              })}
              autoFocus
            />
            {errors[formField] && (
              <span className='small text-danger fst-italic'>
                {formField === "phone"
                  ? "Inserire un numero di telefono valido"
                  : "Il nome utente può essere tra i 2 e i 15 caratteri"}{" "}
              </span>
            )}
          </Form.Group>
          {/* <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group> */}
          <input type='submit'></input>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant='secondary' onClick={handleCloseEdit}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
