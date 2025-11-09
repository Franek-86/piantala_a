import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { MdBackspace } from "react-icons/md";
import { PlantsContext } from "../../context/PlantsContext";
import Loading from "../../pages/Loading";
import RejectionModal from "./RejectionModal";
import UserInfo from "./UserInfo";
import InfoCard from "./InfoCard";
import { deleteAndGo } from "../../utils/utils";
import { AuthContext } from "../../context/AuthContext";

const PlantPending = () => {
  const [modalShow, setModalShow] = useState(false);
  const { plantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { plant, getReporterInfo, reporterInfo, ownerInfo, request } =
    useContext(PlantsContext);
  const fromPage = location.state?.from || "/map";
  const { userRole } = useContext(AuthContext);
  const {
    getSinglePlant,
    singlePlantError,
    handleStatusChange,
    deletePlant,
    plateUrl,
    modalUserShow,
    setModalUserShow,
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

  // const deleteAndGo = async (deletePlant, plantId, navigate) => {
  //   // setSinglePlantLoading(true);

  //   try {
  //     await deletePlant(plantId);
  //   } catch (err) {
  //     console.log(err);
  //     // setSinglePlantLoading(false);
  //   } finally {
  //     navigate("/map");
  //     // setSinglePlantLoading(false);
  //   }
  // };
  return (
    <section className='section-background plant-section section-large'>
      <RejectionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onReject={() => openRejectionModal()}
        handleStatusChange={() => handleStatusChange("rejected", plantId)}
        plantId={plantId}
      />
      <div className='section-center pb-5'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
              setPlant(null);
            }}
          />
        </div>
        <h2 className='section-title'>Segnalazione</h2>

        <p>
          Per richiedere informazioni inerenti questa segnalazione, ulteriori
          rispetto a quelle riportate qui in basso, puoi utilizzare uno dei
          nostri <Link to='/contacts'>contatti</Link> o in alternativa scrivere
          nella <Link to='/chat'> chat aperta</Link>.
        </p>
        <h5 className='mb-3 mt-5'>Informazioni segnalazione</h5>
        <InfoCard />
        <span className='small fst-italic'>
          Il tempo medio di approvazione è di una settimana lavorativa dalla
          ricezione della segnalazione. Per alcune segnalazioni potrebbe essere
          necessario più tempo
        </span>
        {/* </div> */}

        {userRole === "admin" && (
          <div className='admin-controls pt-5 pb-3'>
            <UserInfo
              role={request === "reporter" ? reporterInfo.role : ownerInfo.role}
              user={request === "reporter" ? reporterInfo : ownerInfo}
              show={modalUserShow}
              onHide={() => setModalUserShow(false)}
            />
            <hr />
            <h5 className='mb-3'>Operazioni di amministrazione</h5>
            <div className='d-grid gap-2'>
              <button
                className='btn btn-success'
                onClick={() => handleStatusChange("approved", plantId)}
              >
                Approva segnalazione
              </button>
              <button
                className='btn btn-danger'
                onClick={() => openRejectionModal()}
              >
                Rigetta segnalazione
              </button>
              <button
                className='btn btn-dark '
                onClick={() => deleteAndGo(deletePlant, plantId, navigate)}
              >
                Elimina segnalazione
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantPending;
