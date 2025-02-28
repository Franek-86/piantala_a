import React from "react";
import { useContext } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";
import Avatar from "react-avatar";
import { Col, Row } from "react-bootstrap";

const Users = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  const { allUsers } = useContext(AuthContext);
  console.log("aaa", allUsers);
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
        <section className='section-page section-background'>
          <div className='section-center'>
            <h2 className='section-title'>Lista Utenti</h2>
            <Row>
              <Col md={6}>
                <ListGroup>
                  {allUsers.map((i) => {
                    const {
                      id,
                      first_name,
                      last_name,
                      birthday,
                      city,
                      user_name,
                      role,
                      created_at,
                    } = i;
                    console.log("qui", i);
                    return (
                      <ListGroup.Item className='mt-2 p-0'>
                        <div className='d-flex'>
                          <Avatar facebookId='100008343750912' size='100' />
                          <div className='d-flex flex-column justify-content-center ps-4'>
                            <span> Nome: {user_name}</span>
                            <span> Ruolo: {role}</span>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Users;
