import React from "react";
import { useContext } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  const { getAllUsers } = useContext(AuthContext);

  useEffect(() => {
    console.log("qui", getAllUsers);
    getAllUsers();
  });
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
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
              tenetur eius, aperiam dolorem eaque nostrum illo hic. Eum
              voluptate quam in rem sit quia eveniet? Quam, voluptas. Nostrum
              soluta tenetur dolor, quibusdam dolorem veniam magni minus optio
              quis neque officia quo laborum rerum tempore illo obcaecati ipsa
              cumque error. Nobis?
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Users;
