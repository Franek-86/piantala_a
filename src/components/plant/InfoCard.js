import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { FaRegCopy, FaRegUser, FaUser } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import { copyToClipboard } from "../../utils/utils";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import PlantForm from "./PlantForm";
import RejectionModal from "./RejectionModal";
import UserInfo from "./UserInfo";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import PlantFormSelect from "./PlantFormSelect";
import logo from "../../assets/images/ti pianto per amore-APP-verde.png";
import markerBlue from "../../assets/images/ti pianto per amore-APP-azzurro.png";
import markerGreen from "../../assets/images/ti pianto per amore-APP-verde.png";
import markerOrange from "../../assets/images/ti pianto per amore-APP-giallo.png";
import markerRed from "../../assets/images/ti pianto per amore-APP-rosso.png";
import L from "leaflet";
const InfoCard = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  const {
    plant,
    userInfo,
    getReporterInfo,
    getOwnerInfo,
    reporterInfo,
    ownerInfo,
    request,
  } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const fileInputRef = useRef(null);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    deletePlant,
    singlePlantLoading,
    handlePlateUpload,
    plateUrl,
    plateLoading,
    handlePlateRemoval,
    modalUserShow,
    setModalUserShow,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  // if (singlePlantLoading) return <Loading />;
  // if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  // if (!plant) return <div>No plant found.</div>;
  const {
    lat,
    lang,
    image_url,
    status_piantina,
    rejection_comment,
    user_comment,
    plant_type,
    city,
    suburb,
    road,
    residential,
    shop,
    house_number,
    plate,
    plate_hash,
    delete_hash,
    user_id,
  } = plant;

  const iconBlue = L.icon({ iconUrl: markerBlue, iconSize: [25, 42] });
  const iconGreen = L.icon({ iconUrl: markerGreen, iconSize: [25, 42] });
  const iconOrange = L.icon({ iconUrl: markerOrange, iconSize: [25, 42] });
  const iconRed = L.icon({ iconUrl: markerRed, iconSize: [25, 42] });
  const booked = status_piantina === "booked";
  const approved = status_piantina === "approved";
  const pending = status_piantina === "pending";
  const rejected = status_piantina === "rejected";
  const markerIcon = booked
    ? iconBlue
    : approved
      ? iconGreen
      : pending
        ? iconOrange
        : iconRed;
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const openRejectionModal = () => {
    setModalShow(true);
  };

  const deleteAndGo = async (plantId) => {
    // setSinglePlantLoading(true);

    try {
      await deletePlant(plantId);
    } catch (err) {
      console.log(err);
      // setSinglePlantLoading(false);
    } finally {
      navigate("/map");
      // setSinglePlantLoading(false);
    }
  };
  return (
    <Card className='flex-md-row card-plant-info1'>
      <ListGroup className='list-group-flush'>
        {(status_piantina === "rejected" || status_piantina === "pending") && (
          <ListGroup.Item>
            <span className='fw-medium'>Segnalatore:</span>{" "}
            <span>{userInfo ? userInfo : "utente rimosso"}</span>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          {" "}
          <span className='fw-medium'>Città:</span> <span>{city}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <span className='fw-medium'>Quartiere:</span> <span>{suburb}</span>
        </ListGroup.Item>
        {road !== "undefined" && (
          <ListGroup.Item>
            {" "}
            <span className='fw-medium'>Indirizzo:</span> <span>{road}</span>
          </ListGroup.Item>
        )}
        {shop != "undefined" && (
          <ListGroup.Item>
            {" "}
            <span>Negozio:</span> <span>{shop}</span>
          </ListGroup.Item>
        )}
        {residential !== "undefined" && (
          <ListGroup.Item>
            {" "}
            <span className='fw-medium'>Residenza:</span>{" "}
            <span>{residential}</span>
          </ListGroup.Item>
        )}
        {house_number !== "undefined" && (
          <ListGroup.Item>
            {" "}
            <span className='fw-medium'>Numero:</span>{" "}
            <span>{house_number}</span>
          </ListGroup.Item>
        )}
        {status_piantina === "pending" ||
          (status_piantina === "rejected" && (
            <ListGroup.Item>
              {" "}
              <span className='fw-medium'>Stato:</span>{" "}
              <span
                className={
                  status_piantina === "approved"
                    ? "approvedPlant"
                    : status_piantina === "rejected"
                      ? "rejectedPlant"
                      : status_piantina === "booked"
                        ? "bookedPlant"
                        : "pendingPlant"
                }
              >
                {status_piantina === "pending"
                  ? "in attesa di approvazione"
                  : status_piantina === "approved"
                    ? "approvata"
                    : status_piantina === "rejected"
                      ? "non approvata"
                      : status_piantina === "booked"
                        ? "acquistata"
                        : status_piantina}
              </span>
            </ListGroup.Item>
          ))}
        {plant_type && status_piantina === "pending" && (
          <ListGroup.Item>
            <span className='fw-medium'>Tipo di pianta:</span>{" "}
            <span>{plant_type}</span>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          {" "}
          <span className='fw-medium'>Coordinate:</span>{" "}
          <span
            className='copy'
            onClick={() => copyToClipboard([`${lat},${lang}`])}
          >
            {lat} / {lang} <FaRegCopy className='copy-icon' />
          </span>
        </ListGroup.Item>
        {status_piantina === "rejected" && (
          <ListGroup.Item>
            {" "}
            <span className='fw-medium'>Motivazione:</span>{" "}
            <span>{rejection_comment}</span>
          </ListGroup.Item>
        )}
      </ListGroup>
      <article className='booked-position-map'>
        <MapContainer
          center={[41.118778112249046, 16.881917818963464]}
          zoom={23}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />

          <Marker
            icon={markerIcon}
            position={[41.118778112249046, 16.881917818963464]}
            scrollWheelZoom={false}
            zoomControl={false}
          ></Marker>
        </MapContainer>
      </article>
    </Card>
  );
};

export default InfoCard;
