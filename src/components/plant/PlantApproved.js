import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaRegCopy } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import { copyToClipboard } from "../../utils/utils";
import PlantForm from "./PlantForm";
import InfoCard from "./InfoCard";

const PlantApproved = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { plant, userInfo } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const { getSinglePlant, singlePlantError, plateUrl } =
    useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <div>No plant found.</div>;

  return (
    <div>
      {" "}
      <section className='section-background plant-section section-large'>
        <div className='section-center mb-5'>
          <div className='back-btn'>
            <MdBackspace
              onClick={() => {
                backToMap();
              }}
            />
          </div>
          <h2 className='section-title'>Piantami per amore &#127793;</h2>
          <h5 className='mb-3'>Zona di piantagione</h5>
          <InfoCard />
          <h5 className='mt-5 mb-3'>Targa</h5>
          <p>
            Definisci il testo che verrà successivamente da noi riportato sulla
            targa da apporre sulla tua piantina. Il testo può essere di non più
            di 500 caratteri.
          </p>
          Tutte le targe sono esposte nella pagina{" "}
          <Link to={"/plates"}> "le vostre targhe"</Link>.
          <PlantForm />
        </div>
      </section>
    </div>
  );
};

export default PlantApproved;
