import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import L, { latLng } from "leaflet";
import iconGreen from "./assets/images/ti pianto per amore-APP-verde.png";
import iconYellow from "./assets/images/ti pianto per amore-APP-giallo.png";
import iconRed from "./assets/images/ti pianto per amore-APP-rosso.png";
import iconBlue from "./assets/images/ti pianto per amore-APP-azzurro.png";
import iconLocation from "leaflet/dist/images/marker-icon.png";

// import iconLocation from "./assets/images//marker-icon.png";
import copy from "copy-to-clipboard";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import BottomBar from "./components/map/BottomBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Loading from "./pages/Loading";
import { PlantsContext } from "./context/PlantsContext";
import { OrdersContext } from "./context/OrdersContext";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import { FilterContext } from "./context/FilterContext";
import useIsLargeScreen from "./utils/useIsLargeScreen";
import { ensurePermission } from "./utils/utils";
import PermissionModal from "./components/map/PermissionModal";
import { AuthContext } from "./context/AuthContext";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import { SocketContext } from "./context/SocketContext";
import Buttons from "./components/map/Buttons";
import SideBar from "./components/menu/SideBar";
import { RiH1 } from "react-icons/ri";
import LoginReg from "./components/registration/LoginReg";

const DefaultIcon = L.icon({
  iconUrl: iconLocation, // This can be your default icon
  iconSize: [25, 41], // Adjust size here
});
L.Marker.prototype.options.icon = DefaultIcon;

const iconMap = {
  approved: L.icon({
    iconUrl: iconGreen,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  pending: L.icon({
    iconUrl: iconYellow,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  rejected: L.icon({
    iconUrl: iconRed,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  booked: L.icon({
    iconUrl: iconBlue,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
};

function Map() {
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [locationMarkerTag, setLocationMarkerTag] = useState(null);
  const { plants, setPlants, getAllPlants, loading, sendValuesToAddPlant } =
    useContext(PlantsContext);
  const { socket } = useContext(SocketContext);

  const { test } = useContext(OrdersContext);
  console.log("test from orders", test);
  const { filters, setFilters } = useContext(FilterContext);
  const { setShowPermissionModal, logReg } = useContext(AuthContext);

  const [copyText, setCopyText] = useState("");
  const isLargeScreen = useIsLargeScreen();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkPermissionsAndShowModal = async () => {
      const platform = Capacitor.getPlatform();
      console.log("Platform:", platform);
      if (Capacitor.getPlatform() === "web") return;
      let testAndroid1 = localStorage.getItem("justLoggedIn");
      console.log("test android 1 for hust logged in", testAndroid1);
      const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";

      if (!justLoggedIn) return;

      localStorage.setItem("justLoggedIn", "false");

      const perm = await Geolocation.checkPermissions();
      if (perm)
        console.log(
          "test android 3 permission from geolocation.permission is (should be either 'granted' or something else):",
          perm.location
        );
      if (perm.location === "granted") {
        console.log("location is already granted");
        return;
      } else {
        console.log("location is not granted opening modal");
        setShowPermissionModal(true);
      }
    };

    checkPermissionsAndShowModal();
  }, []);

  // 0001

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("socket from app.js", socket);
      });

      const getAllPlants = (arg1) => {
        setPlants(arg1);
      };

      socket.on("all-plants", getAllPlants);
      return () => {
        socket.off("all-plants", getAllPlants);
      };
    }
  }, []);

  // 0002
  console.log("statusPlants t", filters.status);
  let filteredPlants = plants.filter((plant) => {
    return (
      (filters.status === "" || plant.status_piantina === filters.status) &&
      (filters.suburb === "" || plant.suburb === filters.suburb)
    );
  });

  console.log("statusPlants t2", filteredPlants);
  const checkFilteredPlants = () => {
    const filteredPlantsLength = filteredPlants.length;
    if (filteredPlantsLength === 0) {
      // filteredPlants = [...plants];
      setFilters({
        status: "approved",
        suburb: "",
      });
      filteredPlants = plants.filter((plant) => {
        return (
          (filters.status === "" || plant.status_piantina === filters.status) &&
          (filters.suburb === "" || plant.suburb === filters.suburb)
        );
      });
    }
  };
  useContext(() => {
    checkFilteredPlants();
  }, [filteredPlants]);

  // end filters

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = (copyText) => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log("last", plants.length);

  useEffect(() => {
    console.log("a1");
    getAllPlants();
  }, []);

  useEffect(() => {
    if (position) {
      let locationMarker = markerRef.current;
      console.log("location marker", locationMarker);
      setLocationMarkerTag(locationMarker);
      // test.openPopup();
    }
  }, [position]);

  useEffect(() => {
    console.log("staqui");
    if (locationMarkerTag) {
      locationMarkerTag.openPopup();
    }
  }, [locationMarkerTag]);
  if (locationMarkerTag) {
    locationMarkerTag.openPopup();
  }

  const isChildRoute = location.pathname.includes("/map/");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='d-flex flex-row w-100'>
      {isLargeScreen && <SideBar />}
      <div className='section section-page map-h map-section section-large'>
        <article className='map'>
          <MapContainer
            center={[41.118778112249046, 16.871917818963464]}
            zoom={13}
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />
            {/* <MyTest /> */}
            <Buttons
              setPosition={setPosition}
              position={position}
              markerRef={markerRef}
            />
            {filteredPlants.length > 0 &&
              filteredPlants.map((e) => {
                const iconType = e.status_piantina;
                const markerIcon = iconMap[iconType];
                return (
                  <Marker
                    icon={markerIcon}
                    position={[e.lat, e.lang]}
                    key={e.id}
                    eventHandlers={{
                      click: () => {
                        navigate(`/map/${e.id}`);
                      },
                    }}
                  ></Marker>
                );
              })}
            {position && (
              <Marker ref={markerRef} position={position}>
                <Popup>
                  {logReg && <LoginReg val='map' />}

                  <div className={logReg ? "d-none" : "d-block"}>
                    <h6>Ti trovi qui!</h6>
                    <p>
                      Segnalaci la zona di piantagione aggiungendo una piantina
                      alla mappa oppure copia le coordinate per poterle
                      condividere con altri utenti.
                    </p>
                    <div className='d-flex flex-column pb-3'>
                      <Button
                        className='mb-2'
                        onClick={() =>
                          copyToClipboard([`${position.lat},${position.lng}`])
                        }
                      >
                        copia coordinate
                      </Button>

                      <Button
                        onClick={
                          () =>
                            sendValuesToAddPlant(
                              `${position.lat},${position.lng}`,
                              navigate
                            )
                          // ,
                          // navigate("/map/addPlant")
                        }
                      >
                        aggiungi alla mappa
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </article>
        {/* <article className='bottom-bar'>
        <BottomBar />
      </article> */}
        <Outlet />
      </div>
      {!isChildRoute && <BottomBar />}

      <PermissionModal />
    </div>

    //   {!isChildRoute && (
    //     <>
    //       <div className='section map-h map-section'>
    //         <article className='map'>
    //           <MapContainer
    //             center={[41.118778112249046, 16.871917818963464]}
    //             zoom={13}
    //             scrollWheelZoom={false}
    //             zoomControl={false}
    //           >
    //             <TileLayer
    //               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //               url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    //             />
    //             {/* <MyTest /> */}
    //             <Buttons
    //               setPosition={setPosition}
    //               position={position}
    //               markerRef={markerRef}
    //             />
    //             {filteredPlants.length > 0 &&
    //               filteredPlants.map((e) => {
    //                 const iconType = e.status_piantina;
    //                 const markerIcon = iconMap[iconType];
    //                 return (
    //                   <Marker
    //                     icon={markerIcon}
    //                     position={[e.lat, e.lang]}
    //                     key={e.id}
    //                     eventHandlers={{
    //                       click: () => {
    //                         navigate(`/map/${e.id}`);
    //                       },
    //                     }}
    //                   ></Marker>
    //                 );
    //               })}
    //             {position && (
    //               <Marker ref={markerRef} position={position}>
    //                 <Popup>
    //                   {logReg && <LoginReg val='map' />}

    //                   <div className={logReg ? "d-none" : "d-block"}>
    //                     <h6>Ti trovi qui!</h6>
    //                     <p>
    //                       Segnalaci la zona di piantagione aggiungendo una
    //                       piantina alla mappa oppure copia le coordinate per
    //                       poterle condividere con altri utenti.
    //                     </p>
    //                     <div className='d-flex flex-column pb-3'>
    //                       <Button
    //                         className='mb-2'
    //                         onClick={() =>
    //                           copyToClipboard([
    //                             `${position.lat},${position.lng}`,
    //                           ])
    //                         }
    //                       >
    //                         copia coordinate
    //                       </Button>

    //                       <Button
    //                         onClick={
    //                           () =>
    //                             sendValuesToAddPlant(
    //                               `${position.lat},${position.lng}`,
    //                               navigate
    //                             )
    //                           // ,
    //                           // navigate("/map/addPlant")
    //                         }
    //                       >
    //                         aggiungi alla mappa
    //                       </Button>
    //                     </div>
    //                   </div>
    //                 </Popup>
    //               </Marker>
    //             )}
    //           </MapContainer>
    //         </article>
    //         {/* <article className='bottom-bar'>
    //     <BottomBar />
    //   </article> */}
    //       </div>
    //       <BottomBar />
    //     </>
    //   )}
    //   <Outlet />
    //   {isLargeScreen && <SideBar />}
    //   <PermissionModal />
    // </>
  );
}

export default Map;
