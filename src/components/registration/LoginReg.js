import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Google from "./Google";

const LoginReg = ({ val, id: plantId }) => {
  const page = val;

  let text = "ciao0";
  switch (page) {
    case "map":
      text =
        "Per poter segnalare una zona di piantagione è necessario prima effettuare il login.";
      break;
    case "plant":
      text =
        "Per poter acquistare una pianta è necessario prima effettuare il login.";
      break;
    case "chat":
      text =
        "Per poter scrivere nella chat è necessario prima effettuare il login.";
      break;
    case "contacts":
      text =
        "Per poterci inviare una mail è necessario prima effettuare il login.";
      break;
  }
  console.log("111", page, text);
  return (
    <Card>
      <Card.Header>Ti Pianto Per Amore</Card.Header>
      <Card.Body>
        <Card.Title>Accedi o Registrati</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Link
          to='/login'
          className='btn btn-primary d-block w-100 mb-2'
          variant='primary'
        >
          Login/Registrati
        </Link>
        {/* <Button className='d-block w-100' variant='primary'>
          Accedi con Google
        </Button> */}
        <Google id={plantId} />
      </Card.Body>
    </Card>
  );
};

export default LoginReg;
