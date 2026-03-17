import { useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PlantsContext } from "../context/PlantsContext";
import Loading from "./Loading";
import PlantApproved from "../components/plant/PlantApproved";
import PlantPending from "../components/plant/PlantPending";
import PlantBooked from "../components/plant/PlantBooked";
import PlantRejected from "../components/plant/PlantRejected";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import { VersionContext } from "../context/VersionContext";

const Plant = () => {
  const { plantId } = useParams();
  const { version } = useContext(VersionContext);
  const {
    getSinglePlant,
    singlePlantError,
    plateUrl,
    plant,
    singlePlantLoading,
    getOwnerPublicInfo,
  } = useContext(PlantsContext);
  const isLarge = useIsLargeScreen();
  useEffect(() => {
    version();
    getSinglePlant(plantId);
  }, [plateUrl]);

  if (singlePlantError) return <div className='error'>{singlePlantError}</div>;
  if (singlePlantLoading) return <Loading />;
  // const { status_piantina } = plant;
  const statusPiantina = plant?.status_piantina;
  if (statusPiantina) {
    return (
      <div className={isLarge ? "plants-container" : "plants-container-small"}>
        {statusPiantina === "approved" && <PlantApproved />}
        {statusPiantina === "pending" && <PlantPending />}
        {statusPiantina === "booked" && <PlantBooked />}
        {statusPiantina === "rejected" && <PlantRejected />}
      </div>
    );
  }
};

export default Plant;
