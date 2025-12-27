import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import RejectionModal from "./RejectionModal";
import InfoCard from "./InfoCard";
import { deleteAndGo } from "../../utils/utils";

const PlantRejected = () => {
  const [modalShow, setModalShow] = useState(false);
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  const { plant } = useContext(PlantsContext);

  const fromPage = location.state?.from || "/map";
  const fileInputRef = useRef(null);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    plateUrl,
    deletePlant,
    setPlant,
  } = useContext(PlantsContext);
  const backToMap = () => {
    navigate(fromPage);
  };
  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <div>No plant found.</div>;

  const openRejectionModal = () => {
    setModalShow(true);
  };

  return (
    <section className='plant-section'>
      <div className='section-large'>
        <RejectionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onReject={() => openRejectionModal()}
          handleStatusChange={() => handleStatusChange("rejected", plantId)}
          plantId={plantId}
        />
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
              setPlant(null);
            }}
          />
        </div>
        <div className='section-center single-plant pb-5'>
          <h2 className='section-title'>Segnalazione</h2>
          <p>
            Questa segnalazione non è stata approvata, qui in basso sono
            riportate le informazioni della segnalazione che includono le
            motivazioni per cui non è stata approvata.
          </p>
          <p>
            Manterremo questa segnalazione per un po' in modo da poter
            informarvi delle cause della mancata approvazione e verrà in seguito
            eliminata.{" "}
          </p>
          <h5 className='mb-3'>Informazioni segnalazione</h5>
          <InfoCard />
        </div>
        {userRole === "admin" && (
          <div className='section-center single-plant pb-5'>
            <hr />
            <h5 className='mb-3'>Operazioni di amministrazione</h5>
            <button
              className='btn btn-dark '
              onClick={() => deleteAndGo(deletePlant, plantId, navigate)}
            >
              Elimina segnalazione
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantRejected;
