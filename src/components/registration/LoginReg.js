import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Google from "./Google";

const LoginReg = ({ val, id: plantId }) => {
  const page = val;
  console.log("test test", val, plantId);
  let text;
  switch (page) {
    case `map`:
      text =
        "Per poter segnalare una zona di piantagione è necessario prima effettuare il login.";
      break;
    case `/map/${plantId}/payment`:
      text =
        "Per poter acquistare una pianta è necessario prima effettuare il login o accedere da Google.";
      break;
    case `/map/${plantId}/plate`:
      text =
        "Per poter condividere il testo della targa e acquistare una pianta è necessario prima effettuare il login o accedere con Google.";
      break;
  }
  return (
    <Card className='logreg my-3'>
      {/* <Card.Header>Ti Pianto Per Amore</Card.Header> */}
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
        <Google id={plantId} page={page} />
      </Card.Body>
    </Card>
  );
};

export default LoginReg;
