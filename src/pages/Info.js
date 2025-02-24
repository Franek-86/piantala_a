import React from "react";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";

const Info = () => {
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <>
      <section className='section-page section-background'>
        <div className='section-center'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
          <h2 className='section-title'>Chi siamo</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
            tenetur eius, aperiam dolorem eaque nostrum illo hic. Eum voluptate
            quam in rem sit quia eveniet? Quam, voluptas. Nostrum soluta tenetur
            dolor, quibusdam dolorem veniam magni minus optio quis neque officia
            quo laborum rerum tempore illo obcaecati ipsa cumque error. Nobis?
          </p>
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default Info;
