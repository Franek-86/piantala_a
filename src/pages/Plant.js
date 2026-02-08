import { useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PlantsContext } from "../context/PlantsContext";
import Loading from "./Loading";
import PlantApproved from "../components/plant/PlantApproved";
import PlantPending from "../components/plant/PlantPending";
import PlantBooked from "../components/plant/PlantBooked";
import PlantRejected from "../components/plant/PlantRejected";

const Plant = () => {
  const { plantId } = useParams();

  const {
    getSinglePlant,
    singlePlantError,
    plateUrl,
    plant,
    getOwnerPublicInfo,
  } = useContext(PlantsContext);

  useEffect(() => {
    getSinglePlant(plantId);
  }, [plantId, plateUrl]);

  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (!plant) return <Loading />;
  const { status_piantina } = plant;

  return (
    <div className='plants-container'>
      {status_piantina === "approved" && <PlantApproved />}
      {status_piantina === "pending" && <PlantPending />}
      {status_piantina === "booked" && <PlantBooked />}
      {status_piantina === "rejected" && <PlantRejected />}
    </div>
  );
};

export default Plant;
