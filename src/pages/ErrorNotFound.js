import React from "react";
import BottomBar from "../components/map/BottomBar";
import { Link, useNavigate } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import SideBar from "../components/menu/SideBar";
import Tabs from "react-bootstrap/Tabs";
import BackBtn from "../components/menu/BackBtn";

const ErrorNotFound = () => {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const backToMap = () => {
    navigate("/map");
  };
  return (
    <div className=''>
      {isLargeScreen && <SideBar />}
      <section className='section-page min-100 section-background section-large page-large-container'>
        <BackBtn />
        <div className='info-article section-center menu-section-center pt-5 section-info h-100'>
          <h2 className='section-title'>Pagina non trovata</h2>
          <p>Questa pagina non esiste.</p>
          <div className='d-flex justify-content-center align-items-center h-50'>
            <span className='not-found'>404</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorNotFound;
